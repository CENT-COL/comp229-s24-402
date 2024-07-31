import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './firebase';
import { AuthProvider } from './contexts/auth-context';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);