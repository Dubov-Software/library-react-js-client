import { createRoot } from 'react-dom/client';
import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import App from './App';
import React from 'react';

const root = createRoot(document.getElementById('root'));
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        }
    }
});


root.render((
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
));