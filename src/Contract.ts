import Payment from "./Payment";
import Invoice from "./Invoice";
import moment from "moment";

export default class Contract {

    private payments: Payment[];

    constructor(
        readonly idContract: string,
        readonly description: string,
        readonly amount: number,
        readonly period: number,
        readonly date: Date
        ) {
            this.payments = [];
    }

    addPayment (payment: Payment) {
        this.payments.push(payment);
    }

    getPayments () {
        return this.payments;
    }

    generateInvoices (month: number, year: number, type: string) {

        const invoices: Invoice[] = [];

        if (type === 'cash') {
            for(const payment of this.getPayments()) {

                if(payment.date.getMonth() + 1 !== month || payment.date.getFullYear() !== year) continue;
                    invoices.push(new Invoice(payment.date, payment.amount));
                    console.log('cashinvoices',invoices);
                }
        }
        if (type === 'accrual') {
            let period = 0;
            while(period <= this.period) {
                
                const date = moment(this.date).add(period++, "months").toDate();
                if(date.getMonth() + 1 !== month || date.getFullYear() !== year) continue;
                const amount = this.amount/this.period;
                invoices.push(new Invoice(date, amount));

            }

        }
            
        return invoices;
    }
    
}