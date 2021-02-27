import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {
    // estamos dizendo que esse campo é uma chave primaria 
    @PrimaryColumn()
    // ninguem pode alterar o valor desse id, somente ler
    readonly id: string;

    // como o nome da coluna é o mesmo nome do atributo apenas colocamos @Column()
    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;

    @Column()
    value: number;

    // informando que é uma data
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        // se esse id não existir, entao queremos que esse id tenha o valor de uuid
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveyUser };
