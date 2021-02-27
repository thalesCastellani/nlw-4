import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
    // estamos dizendo que esse campo é uma chave primaria 
    @PrimaryColumn()
    // ninguem pode alterar o valor desse id, somente ler
    readonly id: string;

    // como o nome da coluna é o mesmo nome do atributo apenas colocamos @Column()
    // caso quisessemos que o atributo fosse nameUser por exemplo, colocariamos @Column("name")
    @Column()
    name: string;

    @Column()
    email: string;

    // informando que é uma data
    @CreateDateColumn()
    created_at: Date

    constructor() {
        // se esse id não existir, entao queremos que esse id tenha o valor de uuid
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User }