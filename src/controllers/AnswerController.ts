import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    // http://localhost:3000/answers/10?u=6d0bcb0f-261d-4eed-bd40-b2b071ceef28

    // Route params: parametros obrigatorios que compõem a rota (ele faz parte da rota ex: answers/10
    // como identifica-los: apos a barra e os 2 pontos, routes.get("/answers/:value/:nota/:outroValor")

    // Query params: Busca, Paginação, não obrigatórios
    // sempre vem depois do ponto de interrogação (chave=valor)

    async execute(req: Request, res: Response) {
        // recebendo os parametros que estao vindo da nossa rota 
        const { value } = req.params;
        const { u } = req.query;

        // buscando dentro do noso repositorio se existe 
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUser = await surveysUsersRepository.findOne({ id: String(u) })

        // caso nao exista damos o erro 
        if (!surveyUser) {
            throw new AppError("Survey User does not exist!");
            // return res.status(400).json({error: "Survey User does not exist!"});
        }

        // se existir sobreescrevemos o valor significando que nosso usuario ja respondeu a pesquisa
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return res.json(surveyUser);
    }

}

export { AnswerController };
