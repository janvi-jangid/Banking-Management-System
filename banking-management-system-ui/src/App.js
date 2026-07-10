import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

const protectedPage = (page) => (
    <ProtectedRoute>
        {page}
    </ProtectedRoute>
);

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={protectedPage(<Dashboard />)} />

                <Route path="/customers" element={protectedPage(<Customers />)} />

                <Route path="/accounts" element={protectedPage(<Accounts />)} />

                <Route path="/deposit" element={protectedPage(<Deposit />)} />

                <Route path="/withdraw" element={protectedPage(<Withdraw />)} />

                <Route path="/transfer" element={protectedPage(<Transfer />)} />

                <Route path="/transactions" element={protectedPage(<Transactions />)} />

                <Route path="/notifications" element={protectedPage(<Notifications />)} />

                <Route path="/settings" element={protectedPage(<Settings />)} />

                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
