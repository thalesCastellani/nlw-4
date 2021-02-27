import "reflect-metadata";
import express from 'express';
import createConnection from "./database"; // aqui temos como padrão o index dentro da pasta database portanto não precisamos especificar o mesmo no import, ele ja sabe que é o index
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app }