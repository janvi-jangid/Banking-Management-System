# JustBank Console Application

This folder contains the Java console version of the JustBank banking management system. It uses JDBC and MySQL to provide menu-driven banking operations from the terminal.

## Features

- Admin and customer menu flows
- Customer, account, user, dashboard, and transaction modules
- JDBC-based database connectivity
- Password utility and role guard helpers
- Service and DAO layers for clearer separation of concerns

## Tech Stack

- Java
- JDBC
- MySQL

## Configuration

Database connection settings are defined in:

```text
src/main/java/com/binarybrains/config/DBConnection.java
```

The app reads credentials from environment variables:

```bash
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

## Run

Compile and run the main class from your IDE:

```text
com.binarybrains.main.Main
```

Make sure the MySQL database is available before starting the console app.
