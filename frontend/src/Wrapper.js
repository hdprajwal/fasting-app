import React from 'react';
import App from './App';

import { AuthProvider } from './provider/Auth.provider';
import { ThemeProvider } from './provider/Theme.provider';

function Wrapper() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default Wrapper;
