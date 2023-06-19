import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"

@Entity("Users")
class Users {
    constructor(){
        if (!this.user_id){
            this.user_id = uuidV4()
        }
    }

    @PrimaryColumn()
    user_id: string;

    @Column()
    name: string;
    
    @Column()
    password: string;

    @Column()
    email: string
}

export {Users}