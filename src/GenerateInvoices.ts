import ContractRepository from './ContractRepository';
import moment from 'moment';

export default class GenerateInvoices {

    constructor (readonly contractRepository: ContractRepository) {

    }


    async execute (input: Input): Promise<Output[]> {

        const output: Output[] = [];
        // const contractRepository = new ContractDatabaseRepository();
        const contracts = await this.contractRepository.list();
        console.log(contracts)

        for(const contract of contracts) {

            const invoices = contract.generateInvoices(input.month, input.year, input.type);

            for (const invoice of invoices) {
                output.push({date: moment(invoice.date).format('YYYY-MM-DD'), amount: invoice.amount})
            }
            
        }

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