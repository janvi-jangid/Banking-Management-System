# JustBank API

This Spring Boot service powers the JustBank banking management dashboard. It exposes REST endpoints for authentication, customer records, account records, and transaction operations.

## Tech Stack

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- MySQL
- Maven

## Setup

Create a MySQL database:

```sql
CREATE DATABASE banking_system;
```

Configure database credentials using environment variables:

```bash
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

Run the API:

```bash
mvn spring-boot:run
```

The service runs at:

```text
http://localhost:8080
```

## Configuration

The main configuration file is:

```text
src/main/resources/application.properties
```

Important defaults:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banking_system
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
server.port=8080
```

## Demo User

The API creates or updates a demo admin user on startup:

```text
Username: admin
Password: admin123
Role: ADMIN
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users/login` | Login with username and password |
| `GET` | `/customers` | Get all customers |
| `POST` | `/customers` | Add a customer |
| `GET` | `/customers/{id}` | Get a customer by ID |
| `PUT` | `/customers/{id}` | Update a customer |
| `DELETE` | `/customers/{id}` | Delete a customer |
| `GET` | `/accounts` | Get all accounts |
| `POST` | `/accounts` | Create an account |
| `GET` | `/accounts/{id}` | Get an account by ID |
| `PUT` | `/accounts/{id}` | Update an account |
| `DELETE` | `/accounts/{id}` | Delete an account |
| `GET` | `/transactions` | Get all transactions |
| `POST` | `/transactions/deposit` | Deposit money |
| `POST` | `/transactions/withdraw` | Withdraw money |
| `POST` | `/transactions/transfer` | Transfer money |
| `DELETE` | `/transactions/{id}` | Delete a transaction |

## Notes

- The current demo authentication is simple and intended for local development.
- For production, add password hashing, JWT/session security, validation, and role-based access control.
- Keep database passwords outside source control.
