import React, { useState } from 'react';

function ReminderForm() {
    const [name, setName] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reminder = { name, reminderTime, message };
        localStorage.setItem('reminder', JSON.stringify(reminder));
        alert('Reminder set!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Reminder Time: </label>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
            </div>
            <div>
                <label>Message: </label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button type="submit">Set Reminder</button>
        </form>
    );
}

export default ReminderForm;
