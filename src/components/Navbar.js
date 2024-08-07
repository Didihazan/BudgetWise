import React, { useEffect, useState } from 'react';
import '../CSS/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <ul className="nav-links">
                    <li><button  onClick={() => scrollToSection('home')}>בית</button></li>
                    <li><button onClick={() => scrollToSection('about')}>אודותינו</button></li>
                    <li><button onClick={() => scrollToSection('contact')}>צור קשר</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
