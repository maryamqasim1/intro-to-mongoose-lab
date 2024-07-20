/*-------------------------------- Starter Code --------------------------------*/

const mongoose = require("mongoose");
require("dotenv").config();
const prompt = require("prompt-sync")();
const Customer = require('./models/customer');

const main = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    console.log("Welcome to the CRM")
    await menu();
}
main()

const menu = async () => {
    let action = '';
    while (action !== '5') {
        console.log(
`What would you like to do?
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5- Quit`);

        action = prompt();
        console.log(`Number of action to run: ${action}`);

        switch (action) {
            case '1':
                await CreateCustomer();
                break;
            case '2':
                await ViewCustomers();
                break;
            case '3':
                await UpdateCustomer();
                break;
            case '4':
                await DeleteCustomer();
                break;
            case '5':
                await Quit();
                action = '5';
                break;
            default:
                console.log('Invalid option. Please choose a number from 1 to 5.');
        }
    }
}

/*-------------------------------- Query Functions --------------------------------*/

const CreateCustomer = async () => {
    const name = prompt('What is the name of the customer? ');
    const age = prompt('What is the age of the customer? ');

    const customerData = {
        name: name,
        age: age
    }

    const customer = await Customer.create(customerData);
    console.log("New Customer: ", customer);
}

const ViewCustomers = async () => {
    const customers = await Customer.find({});
    console.log("Below is a list of customers:", customers);
}

const UpdateCustomer = async () => {
    await ViewCustomers();

    const ID = prompt('Copy and paste the id of the customer you would like to update here: ');
    const name = prompt('What is the customers new name? ');
    const age = prompt('What is the customers new age? ');

    const UpdatedCustomer = await Customer.findByIdAndUpdate(ID, { name: name, age: age }, { new: true });
    console.log("Updated Customer:", UpdatedCustomer);
}

const DeleteCustomer = async () => {
    await ViewCustomers();

    const ID = prompt('Copy and paste the id of the customer you would like to delete here: ');

    const DeletedCustomer = await Customer.findByIdAndDelete(ID);
    console.log("Deleted Customer:", DeletedCustomer);
}

const Quit = async () => {
    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit();
}