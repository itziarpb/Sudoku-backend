import { DataSource } from "typeorm";
import "reflect-metadata";
import * as dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false, 
    logging: false,
    name: "default",
    entities: ["src/entities/**/*.entity{.ts,.js}"], 
    subscribers: [],
    migrations: ['src/database/migrations/*.ts']
});
