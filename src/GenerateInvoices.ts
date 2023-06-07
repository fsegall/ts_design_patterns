import pgp from 'pg-promise';
import moment from 'moment';
import ContractDatabaseRepository from './ContractDatabaseRepository';
import ContractRepository from './ContractRepository';

export default class GenerateInvoices {

    constructor (readonly contractRepository: ContractRepository) {

    }


    async execute (input: Input): Promise<Output[]> {

        const output: Output[] = [];
        const contractRepository = new ContractDatabaseRepository();
        const contracts = await this.contractRepository.list();
        console.log(contracts)

        for(const contract of contracts) {

            if (input.type === 'cash') {
                for(const payment of contract.payments) {

                    if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                    output.push({date: moment(payment.date).format('YYYY-MM-DD'), amount: parseFloat(payment.amount)});
                    console.log('cash output', output)
                    }
            }
            if (input.type === 'accrual') {
                let period = 0;
                while(period <= contract.period) {
                    
                    const date = moment(contract.date).add(period++, "months").toDate();
                    console.log('accrual date', date)
                    if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
                    const amount = parseFloat(contract.amount)/contract.period;
                    console.log('accrual output', output)
                    output.push({date: moment(date).format('YYYY-MM-DD'), amount})

                }

            }
            
        }
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