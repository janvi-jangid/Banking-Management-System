# JustBank Frontend

This is the React admin dashboard for JustBank. It provides a polished interface for customer management, account management, money movement, notifications, and application settings.

## Features

- Secure-looking admin login flow with demo login support
- Dashboard with key metrics, charts, quick actions, and recent activity
- Customer and account CRUD screens
- Deposit, withdraw, and transfer workflows
- Transaction history with filters and status chips
- Notifications for low-balance accounts and failed transactions
- Settings screen for API URL and local preferences
- LocalStorage fallback for demo usage when the API is offline

## Tech Stack

- React
- Material UI
- React Router
- Axios
- Recharts
- Chart.js

## Setup

```bash
npm install
npm start
```

The app runs at:

```text
http://localhost:3000
```

By default, the frontend connects to:

```text
http://localhost:8080
```

You can change the backend URL from the in-app Settings page.

## Scripts

```bash
npm start
```

Runs the development server.

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

```bash
npm test
```

Runs the React test runner.

## Demo Login

```text
Username: admin
Password: admin123
```

If the backend is unavailable, the frontend accepts the demo credentials for local preview.
