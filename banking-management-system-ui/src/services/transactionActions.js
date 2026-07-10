import api, { getApiErrorMessage } from "./api";
import {
    getLocalAccounts,
    saveLocalTransaction,
    updateLocalAccountBalance
} from "./localStore";

function isOfflineError(error) {
    return !error?.response;
}

function accountLabel(account) {
    return account
        ? {
            id: account.id,
            accountNumber: account.accountNumber,
            customer: account.customer
        }
        : null;
}

function recordFailedTransaction({ account, amount, transactionType, message }) {
    return saveLocalTransaction({
        account: accountLabel(account),
        amount,
        transactionType,
        status: "FAILED",
        failureReason: message
    });
}

function findLocalAccount(accountId) {
    return getLocalAccounts().find(account => Number(account.id) === Number(accountId));
}

export async function depositAmount({ accountId, amount, accounts }) {
    const account = accounts.find(item => Number(item.id) === Number(accountId));

    try {
        await api.post("/transactions/deposit", null, {
            params: { accountId, amount }
        });
        return { mode: "api" };
    } catch (error) {
        if (isOfflineError(error)) {
            const localAccount = findLocalAccount(accountId);
            if (!localAccount) {
                throw new Error(getApiErrorMessage(error));
            }

            const nextBalance = Number(localAccount.balance || 0) + Number(amount);
            updateLocalAccountBalance(accountId, nextBalance);
            saveLocalTransaction({
                account: accountLabel(localAccount),
                amount,
                transactionType: "DEPOSIT",
                status: "COMPLETED"
            });
            return { mode: "local" };
        }

        const message = getApiErrorMessage(error, "Deposit failed.");
        recordFailedTransaction({ account, amount, transactionType: "DEPOSIT", message });
        throw new Error(message);
    }
}

export async function withdrawAmount({ accountId, amount, accounts }) {
    const account = accounts.find(item => Number(item.id) === Number(accountId));

    try {
        await api.post("/transactions/withdraw", null, {
            params: { accountId, amount }
        });
        return { mode: "api" };
    } catch (error) {
        if (isOfflineError(error)) {
            const localAccount = findLocalAccount(accountId);
            if (!localAccount) {
                throw new Error(getApiErrorMessage(error));
            }

            const currentBalance = Number(localAccount.balance || 0);
            if (currentBalance < Number(amount)) {
                const message = "Insufficient Balance";
                recordFailedTransaction({ account: localAccount, amount, transactionType: "WITHDRAW", message });
                throw new Error(message);
            }

            updateLocalAccountBalance(accountId, currentBalance - Number(amount));
            saveLocalTransaction({
                account: accountLabel(localAccount),
                amount,
                transactionType: "WITHDRAW",
                status: "COMPLETED"
            });
            return { mode: "local" };
        }

        const message = getApiErrorMessage(error, "Withdraw failed.");
        recordFailedTransaction({ account, amount, transactionType: "WITHDRAW", message });
        throw new Error(message);
    }
}

export async function transferAmount({ fromAccountId, toAccountId, amount, accounts }) {
    const fromAccount = accounts.find(item => Number(item.id) === Number(fromAccountId));

    try {
        await api.post("/transactions/transfer", null, {
            params: { fromAccountId, toAccountId, amount }
        });
        return { mode: "api" };
    } catch (error) {
        if (isOfflineError(error)) {
            const localFromAccount = findLocalAccount(fromAccountId);
            const localToAccount = findLocalAccount(toAccountId);
            if (!localFromAccount || !localToAccount) {
                throw new Error(getApiErrorMessage(error));
            }

            const currentBalance = Number(localFromAccount.balance || 0);
            if (currentBalance < Number(amount)) {
                const message = "Insufficient Balance";
                recordFailedTransaction({ account: localFromAccount, amount, transactionType: "TRANSFER_OUT", message });
                throw new Error(message);
            }

            updateLocalAccountBalance(fromAccountId, currentBalance - Number(amount));
            updateLocalAccountBalance(toAccountId, Number(localToAccount.balance || 0) + Number(amount));
            saveLocalTransaction({
                account: accountLabel(localFromAccount),
                amount,
                transactionType: "TRANSFER_OUT",
                status: "COMPLETED"
            });
            saveLocalTransaction({
                account: accountLabel(localToAccount),
                amount,
                transactionType: "TRANSFER_IN",
                status: "COMPLETED"
            });
            return { mode: "local" };
        }

        const message = getApiErrorMessage(error, "Transfer failed.");
        recordFailedTransaction({ account: fromAccount, amount, transactionType: "TRANSFER_OUT", message });
        throw new Error(message);
    }
}
