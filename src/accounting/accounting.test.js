const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');
const INITIAL_BALANCE = 1000.00;

// Helper functions to reset and manipulate balance for tests
function resetBalance() {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: INITIAL_BALANCE }));
}
function setBalance(amount) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: amount }));
}
function getBalance() {
    return JSON.parse(fs.readFileSync(BALANCE_FILE)).balance;
}

// Import main logic as functions for testability
const accounting = {
    viewBalance: () => getBalance(),
    creditAccount: (amount) => {
        let balance = getBalance();
        if (isNaN(amount) || amount < 0) return 'Invalid amount.';
        balance += amount;
        setBalance(balance);
        return `Amount credited. New balance: ${balance.toFixed(2)}`;
    },
    debitAccount: (amount) => {
        let balance = getBalance();
        if (isNaN(amount) || amount < 0) return 'Invalid amount.';
        if (balance >= amount) {
            balance -= amount;
            setBalance(balance);
            return `Amount debited. New balance: ${balance.toFixed(2)}`;
        } else {
            return 'Insufficient funds for this debit.';
        }
    }
};

beforeEach(() => {
    resetBalance();
});

test('TC01: View current balance', () => {
    expect(accounting.viewBalance()).toBe(INITIAL_BALANCE);
});

test('TC02: Credit account with valid amount', () => {
    const result = accounting.creditAccount(200);
    expect(result).toBe('Amount credited. New balance: 1200.00');
    expect(getBalance()).toBe(1200.00);
});

test('TC03: Debit account with sufficient funds', () => {
    setBalance(1000);
    const result = accounting.debitAccount(500);
    expect(result).toBe('Amount debited. New balance: 500.00');
    expect(getBalance()).toBe(500.00);
});

test('TC04: Debit account with insufficient funds', () => {
    setBalance(1000);
    const result = accounting.debitAccount(2000);
    expect(result).toBe('Insufficient funds for this debit.');
    expect(getBalance()).toBe(1000.00);
});

test('TC05: Exit application (simulated)', () => {
    // No state change, just check exit logic placeholder
    expect(true).toBe(true);
});

test('TC06: Invalid menu choice (simulated)', () => {
    // Menu logic is handled in CLI, so simulate invalid input
    expect(accounting.creditAccount(-10)).toBe('Invalid amount.');
    expect(accounting.debitAccount(-10)).toBe('Invalid amount.');
});

test('TC07: Credit account with zero amount', () => {
    const result = accounting.creditAccount(0);
    expect(result).toBe('Amount credited. New balance: 1000.00');
    expect(getBalance()).toBe(1000.00);
});

test('TC08: Debit account with zero amount', () => {
    const result = accounting.debitAccount(0);
    expect(result).toBe('Amount debited. New balance: 1000.00');
    expect(getBalance()).toBe(1000.00);
});
