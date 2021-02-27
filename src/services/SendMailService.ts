import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class SendMailService {

    private client: Transporter;

    // construtor nao permite a utilização de async and await
    constructor() {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            // fazendo isso para poder usar o transporter fora do construtor
            this.client = transporter;
        })
    }

    // quando enviamos um email qual o conteudo? para quem, o assunto e o corpo
    async execute(to: string, subject: string, variables: object, path: string) {

        const templateFileContent = fs.readFileSync(path).toString("utf8");

        const mailTemplateParse = handlebars.compile(templateFileContent);

        // recebe as variaveis que nossa aplicacao vai receber
        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            // recebendo o html aqui de cima todo parseado com as variaveis
            html,
            from: "NPS <noreply@nps.com.br>"
        })
        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    };
};

export default new SendMailService();