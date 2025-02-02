import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollHeight = window.pageYOffset;
        if (scrollHeight > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 w-10 h-10 bg-[#333333] text-white 
                rounded-full flex items-center justify-center cursor-pointer z-50
                hover:opacity-100 transition-all duration-300 shadow-lg
                ${isVisible ? 'opacity-80' : 'opacity-0 pointer-events-none'}`}
            aria-label="גלול למעלה"
        >
            <ArrowUp size={40} />
        </button>
    );
};

export default ScrollToTop;