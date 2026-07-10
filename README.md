# JustBank - Banking Management System

JustBank is a full-stack banking management platform built for managing customers, bank accounts, and everyday banking transactions through a professional admin dashboard. The project includes a React frontend, a Spring Boot REST API, and a MySQL-backed data model, with local fallback behavior in the UI for smoother demos.

## Project Overview

JustBank helps an administrator manage core banking operations from one place:

- Register and maintain customer records
- Create and update savings, current, and fixed deposit accounts
- Deposit, withdraw, and transfer funds between accounts
- Review transaction history and recent activity
- Monitor low-balance accounts and failed transactions
- Configure frontend preferences such as backend API URL and alert limits

The repository contains three related applications:

| Folder | Purpose |
| --- | --- |
| `banking-management-system-ui` | React admin dashboard |
| `Banking-Management-System-API` | Spring Boot REST API |
| `banking-management-system` | Java console banking application |

## Tech Stack

**Frontend**

- React
- Material UI
- React Router
- Axios
- Recharts and Chart.js
- LocalStorage fallback for demo/offline flows

**Backend API**

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- MySQL
- Maven

**Console App**

- Java
- JDBC
- MySQL

## Key Features

- Professional admin dashboard with summary cards, charts, quick actions, and recent transactions
- Customer CRUD: add, edit, search, and delete customers
- Account CRUD: create, edit, search, paginate, and delete accounts
- Transaction operations: deposit, withdraw, transfer, and transaction history
- Notifications screen for low balance and failed transaction alerts
- Settings screen for local app preferences
- Demo login support for easy review
- Environment-based database credentials to avoid committing secrets

## Demo Login

Use these credentials for a local demo:

```text
Username: admin
Password: admin123
```

When the backend is not running, the frontend also supports demo login with the same credentials.

## Getting Started

### Prerequisites

Install the following:

- Node.js and npm
- Java 21
- MySQL
- Maven, or an IDE with Maven support such as IntelliJ IDEA

### 1. Clone the Repository

```bash
git clone https://github.com/janvi-jangid/Banking-Management-System.git
cd Banking-Management-System
```

### 2. Set Up MySQL

Create the database:

```sql
CREATE DATABASE banking_system;
```

The API reads database credentials from environment variables:

```bash
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

If no environment variables are provided, the API defaults to username `root` and a blank password.

### 3. Run the Backend API

```bash
cd Banking-Management-System-API
mvn spring-boot:run
```

The API starts on:

```text
http://localhost:8080
```

### 4. Run the Frontend

Open a second terminal:

```bash
cd banking-management-system-ui
npm install
npm start
```

The dashboard starts on:

```text
http://localhost:3000
```

## Main API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users/login` | Login with username and password |
| `GET` | `/customers` | Get all customers |
| `POST` | `/customers` | Add a customer |
| `PUT` | `/customers/{id}` | Update a customer |
| `DELETE` | `/customers/{id}` | Delete a customer |
| `GET` | `/accounts` | Get all accounts |
| `POST` | `/accounts` | Create an account |
| `PUT` | `/accounts/{id}` | Update an account |
| `DELETE` | `/accounts/{id}` | Delete an account |
| `GET` | `/transactions` | Get all transactions |
| `POST` | `/transactions/deposit` | Deposit money |
| `POST` | `/transactions/withdraw` | Withdraw money |
| `POST` | `/transactions/transfer` | Transfer money |
| `DELETE` | `/transactions/{id}` | Delete a transaction |

## Repository Structure

```text
.
├── Banking-Management-System-API/
│   ├── src/main/java/com/binarybrains/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   └── service/
│   └── src/main/resources/application.properties
├── banking-management-system-ui/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── styles/
└── banking-management-system/
    └── src/main/java/com/binarybrains/
```

## Build and Verification

Frontend production build:

```bash
cd banking-management-system-ui
npm run build
```

Backend build:

```bash
cd Banking-Management-System-API
mvn test
```

## Security Notes

- Do not commit real database passwords.
- Use `DB_USERNAME` and `DB_PASSWORD` for local database credentials.
- The included `admin/admin123` account is intended for local development and demonstrations.
- For production usage, replace demo credentials with secure authentication and hashed passwords.

## Future Improvements

- Add JWT-based authentication and role-based authorization
- Add automated backend and frontend test coverage
- Add Docker Compose for MySQL, API, and frontend
- Add deployment configuration for cloud hosting
- Add exportable reports for accounts and transactions

## Author

Built by [janvi-jangid](https://github.com/janvi-jangid).
