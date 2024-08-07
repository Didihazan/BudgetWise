import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MessageBubble = styled.div`
    position: fixed;
    background-color: rgba(27, 26, 26, 0.75);
    color: white;
    padding: 15px 25px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    opacity: ${props => props.show ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
    ${props => props.position}

    &:before {
        content: '';
        position: absolute;
        border-width: 10px;
        border-style: solid;
        ${props => props.arrowPosition}
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
`;

const UnderstandButton = styled.button`
    padding: 5px 10px;
    background-color: rgba(27, 26, 26, 0.92);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const messages = [
    { text: "לחיצה עליי מפעילה מצב 'תינוק באוטו'!", position: "top: 50%; left: 50%;", arrowPosition: "top: -20px; left: 20px; border-color: transparent transparent rgba(27, 26, 26, 0.75) transparent;" },
    { text: "התאם אישית את זמני ההפעלה האוטומטית", position: "top: 80%; right: 15%;", arrowPosition: "top: -20px; right: 20px; border-color: transparent transparent rgba(27, 26, 26, 0.75) transparent;" },
    { text: "קצת מבולבל? לחץ עליי להסברים נוספים", position: "top: 80%; right: 46%;", arrowPosition: "top: -20px; right: 20px; border-color: transparent transparent rgba(27, 26, 26, 0.75) transparent;" },
    { text: "כאן תוכל להתאים את ההגדרות האישיות שלך", position: "top: 80%; right: 35%;", arrowPosition: "top: -20px; left: 50px; border-color: transparent transparent rgba(27, 26, 26, 0.75) transparent;" },
];

const ExplainMessage = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const lastShown = localStorage.getItem('lastMessageShown');
        const currentTime = new Date().getTime();
        const dayInMilliseconds = 24 * 60 * 60 * 1000;
        const daysToWait = 3;

        if (!lastShown || (currentTime - parseInt(lastShown)) > (daysToWait * dayInMilliseconds)) {
            setShowMessage(true);
            localStorage.setItem('lastMessageShown', currentTime.toString());
        }
    }, []);

    const handleNext = () => {
        if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(currentMessageIndex + 1);
        } else {
            setShowMessage(false);
        }
    };

    const handleClose = () => {
        setShowMessage(false);
    };

    if (!showMessage) return null;

    const currentMessage = messages[currentMessageIndex];

    return (
        <MessageBubble show={showMessage} position={currentMessage.position} arrowPosition={currentMessage.arrowPosition}>
            <CloseButton onClick={handleClose}>✕</CloseButton>
            <p className="message-alert">{currentMessage.text}</p>
            <UnderstandButton onClick={handleNext}>
                {currentMessageIndex === messages.length - 1 ? "סגור" : "הבא"}
            </UnderstandButton>
        </MessageBubble>
    );
};

export default ExplainMessage;