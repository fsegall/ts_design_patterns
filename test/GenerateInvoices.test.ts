import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import DatabaseConnection from "../src/DatabaseConnection";
import GenerateInvoices from "../src/GenerateInvoices";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
// Integration tests
let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;

beforeEach(() => {
    // const contractRepository = {
    //     async list (): Promise<any> {
    //         return [
    //             {
    //                 idContract: '',
    //                 description: '',
    //                 period: 12,
    //                 amount: '6000',
    //                 date: new Date('2023-01-01T10:00:00'),
    //                 payments: [
    //                     {
    //                         idPayment: '',
    //                         idContract: '',
    //                         amount: 6000,
    //                         date: new Date('2023-01-05T10:00:00')
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // }


    connection = new PgPromiseAdapter();
    const contractRepository = new ContractDatabaseRepository(connection);
    generateInvoices = new GenerateInvoices(contractRepository);

});

test("It should generate invoices - cash", async function () {
    // const contractRepository = new ContractDatabaseRepository();
    // const contractRepository = {
    //     async list (): Promise<any> {
    //         return [
    //             {
    //                 idContract: '',
    //                 description: '',
    //                 period: 12,
    //                 amount: '6000',
    //                 date: new Date('2023-0101T10:00:00'),
    //                 payments: [
    //                     {
    //                         idPayment: '',
    //                         idContract: '',
    //                         amount: 6000,
    //                         date: new Date('2023-01-05T10:00:00')
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // }
    // const generateInvoices = new GenerateInvoices(contractRepository);
    const input = {
        month: 1,
        year: 2023,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-01-01");
    expect(output.at(0)?.amount).toBe(6000);
});

test("It should generate invoices - acrrual", async function () {
    // const contractRepository = new ContractDatabaseRepository()
    // const generateInvoices = new GenerateInvoices(contractRepository);

    const input = {
        month: 1,
        year: 2023,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-01-01");
    expect(output.at(0)?.amount).toBe(500);
});

test("It should generate invoices - acrrual", async function () {
    const input = {
        month: 2,
        year: 2023,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-02-01");
    expect(output.at(0)?.amount).toBe(500);
});

afterEach(async () => {
    connection.close();
});