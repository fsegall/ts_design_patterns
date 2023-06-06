import pgp from 'pg-promise';
import moment from 'moment';

export default class GenerateInvoices {
    async execute (input: Input): Promise<Output[]> {
        const connection = pgp()('postgres://postgres:admin123@localhost:5432/postgres');
        const contracts = await connection.query('SELECT * FROM techcompany.contract', []);
        const output: Output[] = [];
        console.log(contracts)

        for(const contract of contracts) {

            if (input.type === 'cash') {
                const payments =  await connection.query('SELECT * FROM techcompany.contract WHERE id_contract = $1', [contract.id_contract]);
                for(const payment of payments) {

                    if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                    output.push({date: moment(payment.date).format('YYYY-MM-DD'), amount: parseFloat(payment.amount)});
                    console.log('output', output)
                    }
            }
            if (input.type === 'accrual') {
                let period = 0;
                while(period <= contract.period) {
                    
                    const date = moment(contract.date).add(period++, "months").toDate();
                    console.log('accrual date', date)
                    if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
                    const amount = parseFloat(contract.amount)/contract.period;

                    output.push({date: moment(date).format('YYYY-MM-DD'), amount})
                }

            }
            
        }
        await connection.$pool.end();
        console.log('here', output)
        return output;
    }
}

export type Input = {
    month: number,
    year: number,
    type: string
}

type Output = {
    date: string,
    amount: number
}