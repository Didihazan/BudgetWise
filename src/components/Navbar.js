import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../CSS/Navbar.css'

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
                    <li><Link to="/"> Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
