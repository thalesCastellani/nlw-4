// criando nossa classe de erro customizada para melhorar as respostas que damos pelos nossos controller
export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

