import React, { useState } from 'react';

const LocationReminder = () => {
    const [reminderLocation, setReminderLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN&limit=5&country=IL`);
        const data = await response.json();
        setSuggestions(data.features);
    };

    const handleLocationChange = (e) => {
        setReminderLocation(e.target.value);
        fetchSuggestions(e.target.value);
    };

    return (
        <div className="location-reminder">
            <h2>הגדר תזכורת מבוססת מיקום</h2>
            <div>
                <label>
                    חפש מיקום:
                    <input
                        type="text"
                        value={reminderLocation}
                        onChange={handleLocationChange}
                        placeholder="הקלד שם מיקום"
                    />
                </label>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LocationReminder;
