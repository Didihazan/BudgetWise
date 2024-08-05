import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// Register the service worker for PWA capabilities
serviceWorkerRegistration.register();

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
            alert('Notification permission is required for reminders to work!');
        }
    });
}
