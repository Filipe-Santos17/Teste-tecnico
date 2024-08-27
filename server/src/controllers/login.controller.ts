import { Request, Response } from "express"
import { db } from "@/database/connect";
import bcrypt from "bcrypt"
import {z} from "zod"
import jwt from "jsonwebtoken"
import { env } from "@/env";
import { sendEmail } from "@/utils/sendEmails";
import { randomUUID } from "crypto";
import { generateAleatoryHash } from "@/utils/generateAleatoryHash";
import calculateDiffDate from "@/utils/calculateDiffDate";
import { validDataLogin } from "@/middlewares/pipes/loginPipe";

interface iSafesCodes {
    id: string,
    time: string,
    email: string,
    hash: number,
}

const safesCode: iSafesCodes[] = []

export default {
    async loginUser(req: Request, res:Response) {
        const { email, password } = req.body as validDataLogin

        try{
            const getUser = await db('users').where({ email }).first()

            if (!getUser) {
                return res.status(400).json({ msg: "Incorrect email or password" });
            }

            const comparePassword = await bcrypt.compare(password, getUser.senha);

            if(!comparePassword){
                return res.status(400).json({ msg:"Incorrect email or password" })
            }

            const hash = generateAleatoryHash()

            await db('hashs').insert({ 
                id: randomUUID(),
                email,
                hash,
            })

            sendEmail({
                from: `NTI Secult <${email}>`,
                to: "filipe.msantos@salvador.ba.gov.br",
                subject: "2º Etapa de Validação",
                html: `Este é o seu codigo de segurança <b>${hash}</b>`
            })
            
            const msgReturn = {
                email,
                validateNextStep: "ok"
            }

            return res.status(200).json(msgReturn)
        }catch(error){
            console.error(error)
            return res.status(500).json({msg: `Server error`})
        }
    },

    //Após o login user
    async segundaEtapaValidacao(req: Request, res:Response){
        const validateUserLoginSecondStep = z.object({
            email: z.string().email(),
            hash: z.number().min(6),
        })

        const hashData = validateUserLoginSecondStep.safeParse(req.body)
        
        if (!hashData.success) {
            return res.status(403).json({ msg: "Dados Incompletos" });
        }   

        const { email, hash } = hashData.data
        
        try{
            const isValidHashAndEmail = await db('hashs').where({ 
                email: email.toLowerCase(),
                hash 
            }).first()

            if(!isValidHashAndEmail){
                return res.status(400).json({ msg: "Dados Incorretos" });
            }

            //Valida a diferença das datas
            const timeStart: Date = isValidHashAndEmail.time_created
            const timeNow = new Date()
            const timeDiference = calculateDiffDate(timeStart, timeNow)
            const maxTimeDiferenceAllowed = 15

            if(timeDiference && timeDiference >= maxTimeDiferenceAllowed){
                await db('hashs').where({ 
                    email: email.toLowerCase(),
                    hash 
                }).delete()

                return res.status(400).json({ msg: "Diferença de tempo ultrapasada" });
            }

            const usuario = await db('usuarios').where({ email_usuario: email }).first()

            const tokenJWT = jwt.sign(
                { id: usuario.user_id }, //Payload
                env.JWT_SECRET, // chave secreta do JWT -- ???
                { expiresIn: '8h' }
            )

            const retornoDataUser = {
                usuario: {
                    id: usuario.user_id,
                    nome: usuario.nome_usuario,
                    email: usuario.email_usuario
                },
                token: tokenJWT
            }

            return res.status(200).json(retornoDataUser);
        } catch(e){
            return res.status(500).json({ msg: "Error no servidor" });
        }
    }
}