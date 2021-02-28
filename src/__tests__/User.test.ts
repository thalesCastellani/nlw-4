import req from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Users", async() => {

    // antes de tudo queremos rodar as migrations
    beforeAll(async() => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async() => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new user", async() => {
        const res = await req(app).post("/users").send({
            email:"user@example.com",
            name: "User Example"
        });

        expect(res.status).toBe(201);
    });

    it("Should not be able to create a user with already existing email", async() => {
        const res = await req(app).post("/users").send({
            email:"user@example.com",
            name: "User Example"
        });

        expect(res.status).toBe(400);
    })
});