import { Connection, createConnection, getConnectionOptions } from "typeorm";

// configurações para rodar nosso banco de dados
// aqui vamos verificar se o comando que estamos rodando é de testes, produção, dev
export default async (): Promise<Connection> => {
    // queremos que nossa aplicação saiba que todas as informações do database sejam iguais e que tenha acesso as mesmas de dentro do nosso ormconfig
    const defaultOptions = await getConnectionOptions();

    // vai pegar todas as informações do nosso ormconfig e sobrescrever o database
    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test" ? "./src/database/database.test.sqlite" : defaultOptions.database
        })
    );
};

// if ternario:
// process.env.NODE_ENV === "test" ? "" : ""

// if (process.env.NODE_ENV === "test") {
//       "" depois do ponto de interrogacao
// } else {
//       "" depois dos 2 pontos 
// }