import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
// com o path, conseguimos mapear utilizando as pastas que temos dentro da nossa aplicação
import { resolve } from "path";
import { AppError } from "../errors/AppError";

class SendMailController {

    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const existingUser = await usersRepository.findOne({ email });

        if (!existingUser) {
            throw new AppError("User does not exist");
            // return res.status(400).json({ error: "User does not exist" });
        }

        const existingSurvey = await surveysRepository.findOne({ id: survey_id });

        if (!existingSurvey) {
            throw new AppError("Survey does not exist");
            // return res.status(400).json({ error: "Survey does not exist" });
        }

        // Enviar email para o Usuario

        // dirname vai pegar o caminho exato de onde esta nossa aplicação
        // (estamos em services) precisamos voltar um diretorio para poder acessar a pasta views
        // ".." aqui estamos dazendo como se fosse um cd../ para acessarmos a nossa pasta src
        // passamos a pasta views, depois a pasta emails e por fim o arquivo que queremos
        // assim teremos o nosso path completo desse npsMail.hbs
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const existingSurveyUsers = await surveysUsersRepository.findOne({
            // 2º parametro, quero todos os values que forem nulos
            // se tiver alguma pesquisa para este usuario que tenha valor nulo
            // queremos que a aplicação retorna para nos
            where: { user_id: existingUser.id, value: null },
            relations: ["user", "survey"]
        })

        const variables = {
            name: existingUser.name,
            title: existingSurvey.title,
            description: existingSurvey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if (existingSurveyUsers) {
            variables.id = existingSurveyUsers.id;
            await SendMailService.execute(email, existingSurvey.title, variables, npsPath);
            return res.json(existingSurveyUsers);
        }

        // salvar as informações na tabela surveyUser 
        const surveyUser = surveysUsersRepository.create({
            user_id: existingUser.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        await SendMailService.execute(email, existingSurvey.title, variables, npsPath);

        return res.status(201).json(surveyUser);
    }
}

export { SendMailController };

