import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCar,
    faClock,
    faCog,
    faInfoCircle,
    faPaperPlane,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import '../CSS/MobileContent.css';
// import logo from "../images/logo.png";
import RandomStars from "../components/RandomStars";
import ExplainMessage from "../components/ExplainMessage";
import translations from '../components/translations';
import AlertSystem from "../components/AlertSystem";

const MobileContent = () => {
    const [isVisualReminderEnabled, setIsVisualReminderEnabled] = useState(() => {
        const savedSetting = localStorage.getItem('visualReminder');
        return savedSetting ? JSON.parse(savedSetting) : false;
    });
    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'hebrew';
    });
    const [openSetting, setOpenSetting] = useState(null);

    useEffect(() => {
        localStorage.setItem('visualReminder', JSON.stringify(isVisualReminderEnabled));
    }, [isVisualReminderEnabled]);

    useEffect(() => {
        localStorage.setItem('language', selectedLanguage);
    }, [selectedLanguage]);

    const handleVisualReminderToggle = () => setIsVisualReminderEnabled(!isVisualReminderEnabled);
    const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false);

    const toggleInfoPopup = () => {
        setIsInfoPopupOpen(!isInfoPopupOpen);
    };

    const toggleSettingsPopup = () => {
        setIsSettingsPopupOpen(!isSettingsPopupOpen);
    };

    const closePopupOnOutsideClick = (e) => {
        if (e.target.className === 'popup') {
            setIsInfoPopupOpen(false);
            setIsSettingsPopupOpen(false);
        }
    };

    const handleDarkModeToggle = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const toggleSetting = (setting) => {
        setOpenSetting(openSetting === setting ? null : setting);
    };

    const t = translations[selectedLanguage];
    const formattedExplanation = t.usageExplanation.replace(/\n/g, '<br>');
    return (
        <div className={`mobile-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="mobile-home">
                <div className="mobile-icons-container">
                    <FontAwesomeIcon icon={faCar} flip="horizontal" size="3x" style={{color: "#ffffff"}}
                                     className="mobile-icon"/>
                    <FontAwesomeIcon icon={faCar} flip="horizontal" size="6x" style={{color: "#ffffff"}}
                                     className="mobile-icon"/>
                    <FontAwesomeIcon icon={faPaperPlane} size="3x" style={{color: "#ffffff"}} className="mobile-icon"/>
                </div>
                <RandomStars numStars={6}/>
                <FontAwesomeIcon icon={faStar} size="1x" style={{color: "#ffffff"}}/>
                <div className={`mobile-curved-background ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className="mobile-logo-container">
                      <AlertSystem/>
                        <ExplainMessage/>
                    </div>
                    <h1>{t.appName}</h1>
                    <div className="button-container">
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faClock} size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">{t.travelTimes}</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button" onClick={toggleInfoPopup}>
                                <FontAwesomeIcon icon={faInfoCircle} size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">{t.instructions}</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button" onClick={toggleSettingsPopup}>
                                <FontAwesomeIcon icon={faCog} flip="horizontal" size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">{t.customization}</span>
                        </div>
                    </div>
                </div>
            </div>
            {isInfoPopupOpen && (
                <div className="popup" onClick={closePopupOnOutsideClick}>
                    <div className="popup-content">
                        <span className="close-button" onClick={toggleInfoPopup}>&times;</span>
                        <h2>{t.usageInstructions}</h2>
                        <p dangerouslySetInnerHTML={{__html: formattedExplanation}}/>
                    </div>
                </div>
            )}
            {isSettingsPopupOpen && (
                <div className="popup" onClick={closePopupOnOutsideClick}>
                    <div className="popup-content">
                        <span className="close-button" onClick={toggleSettingsPopup}>&times;</span>
                        <p>{t.settings}</p>
                        <div className="accordion">
                            <div className="accordion-item">
                                <div className="accordion-title" onClick={() => toggleSetting('darkMode')}>
                                    <span>{t.darkMode} </span>
                                    <FontAwesomeIcon
                                        icon={openSetting === 'darkMode' ? 'faChevronUp' : 'faChevronDown'}/>
                                    <div className="accordion-content">
                                        <label className="switch">
                                            <input type="checkbox" checked={isDarkMode}
                                                   onChange={handleDarkModeToggle}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="accordion-item">
                                <div className="accordion-title" onClick={() => toggleSetting('visualReminder')}>
                                    <span>{t.visualReminder} </span>
                                    <FontAwesomeIcon
                                        icon={openSetting === 'visualReminder' ? 'faChevronUp' : 'faChevronDown'}/>
                                    <div className="accordion-content">
                                        <label className="switch">
                                            <input type="checkbox" checked={isVisualReminderEnabled}
                                                   onChange={handleVisualReminderToggle}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <div className="accordion-title" onClick={() => toggleSetting('languageSelection')}>
                                    <span>{t.languageSelection}</span>

                                    <FontAwesomeIcon
                                        icon={openSetting === 'languageSelection' ? 'faChevronUp' : 'faChevronDown'}/>
                                    <div className="accordion-content">
                                        <select value={selectedLanguage} onChange={handleLanguageChange}>
                                            <option value="hebrew">{t.hebrew}</option>
                                            <option value="english">{t.english}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileContent;
