import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    typography: {
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        h1: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 800, letterSpacing: 0 },
        h2: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 800, letterSpacing: 0 },
        h3: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 800, letterSpacing: 0 },
        h4: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 800, letterSpacing: 0 },
        h5: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 700, letterSpacing: 0 },
        h6: { fontFamily: "'Manrope', 'Inter', 'Segoe UI', Arial, sans-serif", fontWeight: 700, letterSpacing: 0 },
        button: {
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: 'none'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
                }
            }
        }
    }
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
