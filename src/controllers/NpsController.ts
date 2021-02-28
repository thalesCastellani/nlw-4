import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

// notas: 0 1 2 3 4 5 6 7 8 9 10
// Detratores = 0 - 6
// Passivos = 7 - 8 (estes não importam para o calculo, somente os detratores e promotores)
// Promotores = 9 - 10 

// cálculo do NPS: (numero de promotores - numero de detratores) / (numero de respondentes) x 100

class NpsController {
    async execute(req: Request, res: Response) {

        // recebemos o id da pesquisa que o usuario quer ver o nps
        const { survey_id } = req.params;

        // buscamos todas as respostas referentes a essa pesquisa e que o valor nao seja nulo (usuario que nao tenha respondido)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // metodo retorna para nos um array com todas as respostas p esta pesquisa
        const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) })

        // filtramos as notas usando o filter
        const detractor = surveysUsers.filter(survey => (survey.value >= 0 && survey.value <= 6)).length;
        const promoters = surveysUsers.filter(survey => (survey.value >= 9 && survey.value <= 10)).length;
        const passives = surveysUsers.filter(survey => (survey.value >= 7 && survey.value <= 8)).length;

        const totalAnswers = surveysUsers.length;

        // realizamos o calculo do nps 
        const calculo = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

        return res.json({ detractor, promoters, passives, totalAnswers, nps: calculo });
    }
}

export { NpsController }