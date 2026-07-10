import { useEffect, useState } from "react";
import api from "../services/api";
import {
    getLocalAccounts,
    getLocalCustomers,
    getLocalTransactions
} from "../services/localStore";

export default function useDashboardData() {

    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = () => {

        setLoading(true);
        setError("");

        Promise.allSettled([
            api.get("/customers"),
            api.get("/accounts"),
            api.get("/transactions")
        ])
            .then(([customersResult, accountsResult, transactionsResult]) => {
                if (customersResult.status === "fulfilled") {
                    setCustomers(Array.isArray(customersResult.value.data) ? customersResult.value.data : []);
                } else {
                    setCustomers(getLocalCustomers());
                }

                if (accountsResult.status === "fulfilled") {
                    setAccounts(Array.isArray(accountsResult.value.data) ? accountsResult.value.data : []);
                } else {
                    setAccounts(getLocalAccounts());
                }

                if (transactionsResult.status === "fulfilled") {
                    const apiTransactions = Array.isArray(transactionsResult.value.data) ? transactionsResult.value.data : [];
                    const localTransactions = getLocalTransactions();
                    const apiIds = new Set(apiTransactions.map(transaction => String(transaction.id)));
                    const unsyncedLocalTransactions = localTransactions.filter(transaction => !apiIds.has(String(transaction.id)));

                    setTransactions([...unsyncedLocalTransactions, ...apiTransactions]);
                } else {
                    setTransactions(getLocalTransactions());
                }
            })
            .finally(() => {
                setLoading(false);
            });

    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        customers,
        accounts,
        transactions,
        loading,
        error,
        fetchData
    };

}
