import React from 'react';
import '../CSS/MobileContent.css';
import logo from "../images/logo.png";
import RandomStars from "../components/RandomStars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faPaperPlane, faStar} from "@fortawesome/free-solid-svg-icons";

const MobileContent = () => {
    return (
        <div className="mobile-container">
            <div className="mobile-home">
                <div className="mobile-icons-container">
                    <FontAwesomeIcon icon={faCar} flip="horizontal" size="3x"
                                     style={{color: "#ffffff"}} className="mobile-icon"/>
                    <FontAwesomeIcon icon={faCar} flip="horizontal" size="6x"
                                     style={{color: "#ffffff"}} className="mobile-icon"/>
                    <FontAwesomeIcon icon={faPaperPlane }
                                     size="3x" style={{color: "#ffffff",}} className="mobile-icon"/>

                </div>
                <RandomStars numStars={6}/>
                <FontAwesomeIcon icon={faStar} size="1x" style={{color: "#ffffff"}}/>
                <div className="mobile-curved-background">
                    <div className="mobile-logo-container">
                        <img src={logo} alt="KidiSafe-logo" className="mobile-main-img"/>
                    </div>
                    <h1>KidiSafe</h1>

                    <div className="button-container">
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faCar} flip="horizontal" size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">רכב 1</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faCar} flip="horizontal" size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">רכב 2</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faCar} flip="horizontal" size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">רכב 3</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MobileContent;
