import React from 'react';
import '../CSS/MobileContent.css';
import logo from "../images/logo.png";
import RandomStars from "../components/RandomStars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faClock, faCog, faInfoCircle, faPaperPlane, faStar} from "@fortawesome/free-solid-svg-icons";
import ExplainMessage from "../components/ExplainMessage";


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
                        <ExplainMessage/>
                    </div>
                    <h1>KidiSafe</h1>

                    <div className="button-container">
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faClock} size="2x" style={{color: "#59cfd3"}} className="round-icon"/>
                            </button>
                            <span className="button-label">התאם זמני נסיעה</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faInfoCircle} size="2x" style={{color: "#59cfd3",}} className="round-icon"/>
                            </button>
                            <span className="button-label">הוראות שימוש</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="round-button">
                                <FontAwesomeIcon icon={faCog} flip="horizontal" size="2x" style={{color: "#59cfd3"}}
                                                 className="round-icon"/>
                            </button>
                            <span className="button-label">התאמה אישית</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MobileContent;
