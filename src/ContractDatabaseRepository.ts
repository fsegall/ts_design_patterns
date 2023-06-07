import ContractRepository from "./ContractRepository";
import pgp from 'pg-promise';
// import moment from 'moment';


export default class ContractDatabaseRepository implements ContractRepository {

    async list(): Promise<any> {
        const connection = pgp()('postgres://postgres:admin123@localhost:5432/postgres'); 
        const contracts = await connection.query('SELECT * FROM techcompany.contract', []);
        for(const contract of contracts) {

            contract.payments =  await connection.query('SELECT * FROM techcompany.contract WHERE id_contract = $1', [contract.id_contract]);

        }
        await connection.$pool.end();
        return contracts;
    }

}