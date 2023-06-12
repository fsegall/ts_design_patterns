import DatabaseConnection from "./DatabaseConnection";
import pgp from 'pg-promise';

export default class PgPromiseAdapter implements DatabaseConnection {
    connection:any;

    constructor () {
        this.connection = pgp()('postgres://postgres:admin123@localhost:5432/postgres'); 
    }

    async query(statement: string, params: any): Promise<any> {
        return await this.connection.query(statement, params)
    }

    async close(): Promise<void> {
        return await this.connection.$pool.end();
    }
}