import React, { useState, useEffect } from 'react';
import '../CSS/Home.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faPaperPlane, faStar} from "@fortawesome/free-solid-svg-icons";
import RandomStars from "./RandomStars";


function Home() {

    return (
        <div className="home-container">
            <RandomStars numStars={6} />
            <FontAwesomeIcon icon={faStar }
                             size="1x" style={{color: "#ffffff",}} />
            {/*<div className="icons-container">*/}
            {/*    <FontAwesomeIcon icon={faCar} flip="horizontal" size="2x"*/}
            {/*                     style={{color: "#ffffff"}} className="icon"/>*/}
            {/*    <FontAwesomeIcon icon={faCar} flip="horizontal" size="4x"*/}
            {/*                     style={{color: "#ffffff"}} className="icon"/>*/}
            {/*    <FontAwesomeIcon icon={faPaperPlane }*/}
            {/*                     size="2x" style={{color: "#ffffff",}} className="icon"/>*/}

            {/*</div>*/}

            <div className="curved-background">
                <div className="logo-container">
                    <img src={logo} alt="KidiSafe-logo" className="main-img"/>
                </div>
                <h1>KidiSafe</h1>
                <div className="content"/>
            </div>
        </div>
    );
}

export default Home;
