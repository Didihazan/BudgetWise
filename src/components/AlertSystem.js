import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/AlertSystem.css';
import logo from "../images/logo.png";
import '../CSS/MobileContent.css';

const AlertSystem = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let alertInterval;
        if (isActive) {
            alertInterval = setInterval(() => {
                // Send a notification every few minutes
                sendNotification();
            }, 5 * 60 * 1000); // Every 5 minutes

            // Example: trigger the first notification immediately
            sendNotification();
        }

        return () => {
            clearInterval(alertInterval);
        };
    }, [isActive]);

    const sendNotification = () => {
        toast.warning("הילד שלך ברכב, אל תשכח/י אותו!", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClick: () => window.focus(),
        });
    };

    const toggleAlertSystem = () => {
        setIsActive(prevState => !prevState);
    };

    return (
        <div className="alert-system-container">
            <div className={`mobile-logo-container ${isActive ? 'active' : ''}`} onClick={toggleAlertSystem}>
                <img src={logo} alt="KidiSafe-logo" className="mobile-main-img" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default AlertSystem;
