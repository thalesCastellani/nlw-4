import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {

    // usando o typescript para tipar o request e response
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        // criando nosso repository
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ error: "User already exists" });
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
