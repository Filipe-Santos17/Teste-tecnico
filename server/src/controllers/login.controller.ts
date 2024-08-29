import { Request, Response } from "express"
import { db } from "@/database/connect";
import bcrypt from "bcrypt"
import { sendEmail } from "@/utils/sendEmails";
import { randomUUID } from "crypto";
import { generateAleatoryHash } from "@/utils/generateAleatoryHash";
import calculateDiffDate from "@/utils/calculateDiffDate";
import { validDataLogin, validDataLoginSecondStep } from "@/middlewares/pipes/loginPipe";
import { generateToken } from "@/utils/generateToken";

export default {
    async loginUser(req: Request, res:Response) {
        const { email, password } = req.body as validDataLogin

        try{
            const getUser = await db('users').where({ email }).first()

            if (!getUser) {
                return res.status(400).json({ msg: "Incorrect email or password" });
            }

            const comparePassword = await bcrypt.compare(password, getUser.password);

            if(!comparePassword){
                return res.status(400).json({ msg:"Incorrect email or password" })
            }

            if(getUser.two_factory){
                const hash = generateAleatoryHash()

                await db('hashs').insert({ 
                    id: randomUUID(),
                    email,
                    hash,
                })
    
                await sendEmail({
                    to: email,
                    subject: "2º Etapa de Validação",
                    html: `Este é o seu codigo de segurança: <b>${hash}</b>`
                })

                const msgReturn = {
                    email,
                    validateNextStep: "ok"
                }
    
                return res.status(200).json(msgReturn)
            }   

            const { id, name } = getUser

            const token = generateToken(id)

            const userData = {
                user: {
                    id,
                    name,
                    email,
                },
                token
            }

            return res.json(userData).status(200)
        }catch(error){
            console.error(error)
            return res.status(500).json({msg: `Server error`})
        }
    },

    async secondValidationStep(req: Request, res:Response){
        const { email, hash } = req.body as validDataLoginSecondStep
        
        try{
            const isValidHashAndEmail = await db('hashs').where({ 
                email,
                hash 
            }).first()

            if(!isValidHashAndEmail){
                return res.status(400).json({ msg: "Incorrect Data" });
            }

            //Valida a diferença das datas
            const timeStart: Date = isValidHashAndEmail.time_created
            const timeNow = new Date()
            const timeDiference = calculateDiffDate(timeStart, timeNow)
            const maxTimeDiferenceAllowed = 15

            await db('hashs').where({ email, hash }).delete()

            if(timeDiference && timeDiference >= maxTimeDiferenceAllowed){
                return res.status(400).json({ msg: "Time difference exceeded" });
            }

            const user = await db('users').where({ email }).first()

            if (!user) {
                return res.status(400).json({ msg: "Incorrect email" });
            }

            const token = generateToken(user.id)

            const dataUser = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }

            return res.status(200).json(dataUser);
        } catch(e){
            return res.status(500).json({ msg: "Server error" });
        }
    },

    async changePassword(req: Request, res:Response){

    }
}