// 1 - Definir as configurações que nosso banco de dados vai utilizar. Porta, nome de usuário pra conectar com o banco, senha, database ......

import { DataSource } from "typeorm";
import { Users1686675616097 } from "./migrations/1686675616097-Users";
import { Products1686683544123 } from "./migrations/1686683544123-Products";
import { Users } from "../modules/accounts/entities/Users";

export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "listmarket",
  database: "listmarket",
  entities: [Users],
  migrations: [Users1686675616097, Products1686683544123],
});

// 2 - Criar um método que pega essas configurações que já fizemos e de fato conecta com o banco.

export function createConnection(host = "localhost") {
  dataSource
    .setOptions({
      host,
    })
    .initialize()
    .then(() => {
      console.log("Database was initialized");
    })
    .catch((error) => {
      console.log(`Connection error : ${error}`);
    });
}
