export default class Payment {
    constructor (
        readonly idPayment: String,
        readonly date: Date,
        readonly amount: number,
        ) {}
}