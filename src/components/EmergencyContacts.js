import React, { useState, useEffect } from 'react';
import '../CSS/EmergencyContacts.css';

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([{ name: '', phone: '' }, { name: '', phone: '' }]);

    useEffect(() => {
        // טעינת אנשי קשר מה-localStorage אם קיימים
        const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts'));
        if (savedContacts) {
            setContacts(savedContacts);
        }
    }, []);

    const handleContactChange = (index, field, value) => {
        const newContacts = [...contacts];
        newContacts[index][field] = value;
        setContacts(newContacts);
    };

    const handleSaveContacts = () => {
        // שמירת אנשי קשר ב-localStorage
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        alert('אנשי הקשר נשמרו בהצלחה!');
    };

    return (
        <div className="emergency-contacts">
            <h2>אנשי קשר לשעת חירום</h2>
            {contacts.map((contact, index) => (
                <div key={index} className="contact-input">
                    <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        placeholder="שם איש קשר"
                    />
                    <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        placeholder="מספר טלפון"
                    />
                </div>
            ))}
            <button onClick={handleSaveContacts}>שמור</button>
            <div className="contact-buttons">
                {contacts.map((contact, index) => (
                    contact.name && contact.phone && (
                        <button key={index} onClick={() => window.location.href = `tel:${contact.phone}`}>
                            חייג ל{contact.name}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default EmergencyContacts;
