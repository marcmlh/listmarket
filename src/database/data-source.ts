// 1 - Definir as configurações que nosso banco de dados vai utilizar. Porta, nome de usuário pra conectar com o banco, senha, database ......

import { DataSource } from "typeorm"
import { User1686675616097 } from "./migrations/1686675616097-User"
import { Products1686683544123 } from "./migrations/1686683544123-Products"


export const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "docker",
    password: "listmarket",
    database: "listmarket",
    entities: [],
    migrations: [User1686675616097, Products1686683544123]
})

// 2 - Criar um método que pega essas configurações que já fizemos e de fato conecta com o banco.

export function createConnection (host = "database_listmarket"){
    dataSource.setOptions({
        host
    }).initialize().then(()=>{
        console.log("Database was initialized")
    }).catch((error)=>{
        console.log(`Connection error : ${error}` )
    })
}