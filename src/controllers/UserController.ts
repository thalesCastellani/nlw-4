import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {

    // usando o typescript para tipar o request e response
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        // fazendo as validações
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err });
        }

        // criando nosso repository
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new AppError("User already exists");
            // return res.status(400).json({ error: "User already exists" });
        }

        // precisamos de fato usar  metodo create antes de poder salvar no bd
        const user = usersRepository.create({ name, email });

        await usersRepository.save(user);

        return res.status(201).json(user);
    }

    async show(req: Request, res: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        // retorna uma lista de acordo com a entidade que passamos
        const all = await usersRepository.find();

        return res.json(all);
    }
}

export { UserController };
