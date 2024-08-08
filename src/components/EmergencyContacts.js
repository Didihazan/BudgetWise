import React, { useState, useEffect } from 'react';
import '../CSS/EmergencyContacts.css';
import translations from './translations';

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([{ name: '', phone: '' }]);
    const [selectedLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'hebrew';
    });
    const t = translations[selectedLanguage];

    useEffect(() => {
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
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        alert(t.saveSuccessMessage);
    };

    const addContact = () => {
        if (contacts.length < 2) {
            setContacts([...contacts, { name: '', phone: '' }]);
        }
    };

    return (
        <div className="emergency-contacts">
            {contacts.map((contact, index) => (
                <div key={index} className="contact-row">
                    <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        placeholder={t.contactNamePlaceholder}
                        className="contact-input"
                    />
                    <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        placeholder={t.contactPhonePlaceholder}
                        className="contact-input"
                    />
                </div>
            ))}
            {contacts.length < 2 && (
                <button onClick={addContact} className="add-contact-button">
                    {t.addContactButton}
                </button>
            )}
            <button onClick={handleSaveContacts} className="save-contacts-button">
                {t.saveContactsButton}
            </button>
            <div className="contact-buttons">
                {contacts.map((contact, index) => (
                    contact.name && contact.phone && (
                        <button key={index} onClick={() => window.location.href = `tel:${contact.phone}`} className="call-button">
                            {`${t.callButton} ${contact.name}`}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default EmergencyContacts;
