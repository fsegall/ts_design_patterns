import pgp from "pg-promise";

export default class GenerateInvoices {
    async execute (input: Input): Promise<Output> {
        const connection = pgp()('postgres://postgres:admin123@localhost:5432/postgres');
        const contracts = await connection.query('SELECT * FROM techcompany.contract', []);
        console.log(contracts)
        for(const contract of contracts) {
            
        }
        return [];
    }
}

type Input = {
    month: number,
    year: number
}

type Output = {
    date: string,
    amount: number
}