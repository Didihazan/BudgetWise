import React, { useEffect } from 'react';
import ReminderForm from './components/ReminderForm';
import './App.css';

function App() {
    useEffect(() => {
        const checkReminder = () => {
            const reminder = JSON.parse(localStorage.getItem('reminder'));
            if (reminder) {
                const now = new Date();
                const reminderTime = new Date();
                const [hours, minutes] = reminder.reminderTime.split(':');
                reminderTime.setHours(hours, minutes, 0, 0);

                if (now >= reminderTime) {
                    new Notification(reminder.message || 'Reminder!');
                    localStorage.removeItem('reminder');
                }
            }
        };

        const intervalId = setInterval(checkReminder, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <h1>Set a Reminder</h1>
            <ReminderForm />
        </div>
    );
}

export default App;
