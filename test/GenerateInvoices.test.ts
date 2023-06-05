import GenerateInvoices from "../src/generateInvoices";

test("It should generate invoices", async function () {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-01-05");
    expect(output.at(0)?.amount).toBe(6000);
})