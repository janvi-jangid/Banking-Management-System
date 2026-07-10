const CUSTOMERS_KEY = "novabankLocalCustomers";
const ACCOUNTS_KEY = "novabankLocalAccounts";
const TRANSACTIONS_KEY = "novabankLocalTransactions";

function readList(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function writeList(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function nextId(items) {
    const maxId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    return maxId + 1;
}

export function getLocalCustomers() {
    return readList(CUSTOMERS_KEY);
}

export function saveLocalCustomer(customer) {
    const customers = getLocalCustomers();
    const id = customer.id || nextId(customers);
    const savedCustomer = {
        ...customer,
        id
    };

    const nextCustomers = customer.id
        ? customers.map(item => Number(item.id) === Number(customer.id) ? savedCustomer : item)
        : [...customers, savedCustomer];

    writeList(CUSTOMERS_KEY, nextCustomers);
    return savedCustomer;
}

export function deleteLocalCustomer(id) {
    writeList(
        CUSTOMERS_KEY,
        getLocalCustomers().filter(customer => Number(customer.id) !== Number(id))
    );
}

export function getLocalAccounts() {
    return readList(ACCOUNTS_KEY);
}

export function saveLocalAccount(account) {
    const accounts = getLocalAccounts();
    const id = account.id || nextId(accounts);
    const savedAccount = {
        ...account,
        id,
        balance: Number(account.balance || 0)
    };

    const nextAccounts = account.id
        ? accounts.map(item => Number(item.id) === Number(account.id) ? savedAccount : item)
        : [...accounts, savedAccount];

    writeList(ACCOUNTS_KEY, nextAccounts);
    return savedAccount;
}

export function deleteLocalAccount(id) {
    writeList(
        ACCOUNTS_KEY,
        getLocalAccounts().filter(account => Number(account.id) !== Number(id))
    );
}

export function getLocalTransactions() {
    return readList(TRANSACTIONS_KEY);
}

export function deleteLocalTransaction(id) {
    writeList(
        TRANSACTIONS_KEY,
        getLocalTransactions().filter(transaction => String(transaction.id) !== String(id))
    );
}

export function saveLocalTransaction(transaction) {
    const transactions = getLocalTransactions();
    const id = transaction.id || `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const savedTransaction = {
        status: "COMPLETED",
        transactionDate: new Date().toISOString(),
        ...transaction,
        id,
        amount: Number(transaction.amount || 0)
    };

    writeList(TRANSACTIONS_KEY, [savedTransaction, ...transactions]);
    return savedTransaction;
}

export function updateLocalAccountBalance(accountId, nextBalance) {
    const accounts = getLocalAccounts();
    writeList(
        ACCOUNTS_KEY,
        accounts.map(account =>
            Number(account.id) === Number(accountId)
                ? {
                    ...account,
                    balance: Number(nextBalance || 0)
                }
                : account
        )
    );
}
