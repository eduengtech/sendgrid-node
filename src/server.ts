import fastify from "fastify";
import sgMail = require("@sendgrid/mail");
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SEND_API_KEY!);

type sendgridMail ={
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
}

const app = fastify();

app.post("/send-email", async (request, response) =>{

    try{
        const {from, to, subject, text, html} =request.body as sendgridMail;
        const mailOptions = {
            from,
            to,
            subject,
            text,
            html
        };
    
        sgMail
            .send(mailOptions)
            .then((res) => {
                return response.status(200).send("Mensagem enviada com sucesso!!");
            })
      .catch((error) => {
        console.error(error);
        return response.status(500).send("Erro ao enviar essa mensagem");
      })

    } catch(error){
        console.error(error);
        return response.status(500).send("Erro ao enviar essa mensagem");
    }

})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT? Number(process.env.PORT): 5000
}).then(() =>{
    console.log("Servidor Funcionando");
});