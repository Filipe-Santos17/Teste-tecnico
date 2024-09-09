import nodemailer, { SendMailOptions }  from "nodemailer"
import { env } from "../env"

const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: true,
    auth:{
        user: env.EMAIL_AUTH_USER,
        pass: env.EMAIL_AUTH_PASS,
    }
})

interface iSendEmailObj extends SendMailOptions {}

export async function sendEmail(dataEmail: iSendEmailObj){
    try{
        if(env.NODE_ENV!=="test"){
            await transporter.sendMail({
                from: `Todo Project <${env.EMAIL_HOST}>`,
                ...dataEmail
            })
        }
    } catch(e){
        console.error(e)
        throw new Error("Email not send")
    }
}