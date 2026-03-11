// Node.js implementation of COBOL Student Account Management System
// Preserves original business logic, data integrity, and menu options

const readline = require('readline');
const fs = require('fs');
const BALANCE_FILE = 'balance.json';
const INITIAL_BALANCE = 1000.00;

function loadBalance() {
    if (!fs.existsSync(BALANCE_FILE)) {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: INITIAL_BALANCE }));
    }
    const data = fs.readFileSync(BALANCE_FILE);
    return JSON.parse(data).balance;
}

function saveBalance(balance) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }));
}

function showMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let continueFlag = true;

    function promptMenu() {
        showMenu();
        rl.question('Enter your choice (1-4): ', (choice) => {
            switch (choice.trim()) {
                case '1':
                    const balance = loadBalance();
                    console.log(`Current balance: ${balance.toFixed(2)}`);
                    promptMenu();
                    break;
                case '2':
                    rl.question('Enter credit amount: ', (amountStr) => {
                        const amount = parseFloat(amountStr);
                        if (isNaN(amount) || amount < 0) {
                            console.log('Invalid amount.');
                        } else {
                            let balance = loadBalance();
                            balance += amount;
                            saveBalance(balance);
                            console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
                        }
                        promptMenu();
                    });
                    break;
                case '3':
                    rl.question('Enter debit amount: ', (amountStr) => {
                        const amount = parseFloat(amountStr);
                        let balance = loadBalance();
                        if (isNaN(amount) || amount < 0) {
                            console.log('Invalid amount.');
                        } else if (balance >= amount) {
                            balance -= amount;
                            saveBalance(balance);
                            console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
                        } else {
                            console.log('Insufficient funds for this debit.');
                        }
                        promptMenu();
                    });
                    break;
                case '4':
                    continueFlag = false;
                    console.log('Exiting the program. Goodbye!');
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice, please select 1-4.');
                    promptMenu();
            }
        });
    }

    promptMenu();
}

main();
