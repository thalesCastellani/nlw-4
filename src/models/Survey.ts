import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys")
class Survey {
    // estamos dizendo que esse campo é uma chave primaria 
    @PrimaryColumn()
    // ninguem pode alterar o valor desse id, somente ler
    readonly id: string;

    // como o nome da coluna é o mesmo nome do atributo apenas colocamos @Column()
    @Column()
    title: string;

    @Column()
    description: string;

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

export { Survey }