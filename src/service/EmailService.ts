import { createTransport } from "nodemailer"

export default class EmailService {

    private static transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    public static sendEmail(url:string , user:{name:string,email:string}) {

        const {name, email} = user

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Confirmação de registro bandeirax`,
            text: `Olá ${name}, para finalizar seu cadastro no site bandeirax é necessario acessar esse link para ativar sua conta. ${url}`
        };

        this.transporter.sendMail(mailOptions)

    }

}