import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    entities: ['./**/*.entity.ts'],
    migrations: ['./migrations/**.ts'],
    logging: true,
});

export default AppDataSource