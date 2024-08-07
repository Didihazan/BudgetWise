import React from 'react';
import Navbar from '../components/Navbar';
import RandomStars from "../components/RandomStars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import '../CSS/Star.css';
import '../CSS/DesktopContent.css';

const DesktopContent = () => {
    return (
        <div className="home-container">
            <div id="home" className="main">
                <Navbar/>
                <RandomStars numStars={6}/>
                <FontAwesomeIcon icon={faStar} size="1x" style={{color: "#ffffff"}}/>
                <div className="curved-background">
                    <div className="logo-container">
                        <img src={logo} alt="KidiSafe-logo" className="main-img"/>
                    </div>
                    <h1>KidiSafe</h1>
                    <div className="content"/>
                </div>
            </div>

            <div id="about" className="about">
                <h2>הסיפור שלנו</h2>
                <p className="round-font-text">ברוכים הבאים ל-KidiSafe, חברה טכנולוגית חדשנית שמטרתה לשמור על היקר לנו
                    מכל – הילדים שלנו. אנחנו פועלים במרץ לפיתוח פתרונות חכמים שמטרתם למנוע את הטרגדיה הנוראה של שכחת
                    ילדים ברכב. כחברה המובילה בתחומה, אנו מחויבים ליצירת מערכות מתקדמות שמספקות שקט נפשי להורים בכל מקום
                    ובכל זמן.</p>
                <p className="round-font-text">KidiSafe הוקמה מתוך מטרה אחת ברורה: להציל חיים. אנחנו מאמינים שבעידן
                    הטכנולוגי של היום, לא צריכים לקרות מקרים כאלו שניתן למנוע בקלות באמצעות שימוש נכון בטכנולוגיה. אנחנו
                    כאן כדי להבטיח שכל הורה יוכל לחזור הביתה בראש שקט, בידיעה שהמערכת שלנו דואגת להתריע על כל סכנה
                    אפשרית.</p>
                <h3>הפתרון שלנו</h3>
                <p className="round-font-text">המערכת של KidiSafe היא פשוטה לשימוש אך בעלת יכולות מרשימות. באמצעות שילוב
                    בין אפליקציה סלולרית למערכת התרעות חכמה, אנו מציעים להורים כלי יעיל וזמין שמתריע במידה והילד נשאר
                    ברכב. הפתרון שלנו כולל התאמה אישית של זמני התראה והגדרות, כדי להבטיח שהשירות יתאים בדיוק לצרכים
                    האישיים של כל משפחה.</p>
                <p className="round-font-text">ב-KidiSafe, אנחנו כאן בשבילכם – ההורים – כדי להעניק לכם את הכלים הנכונים
                    לשמור על בטיחות הילדים שלכם. יחד, נוכל למנוע את הטרגדיה הבאה ולהבטיח את שלומם של ילדינו.</p>
                <p className="round-font-text"></p>
            </div>

            <div id="contact" className="contact-us">
                <h2>Contact Us</h2>
                <p>Here goes the contact section content...</p>
            </div>
        </div>
    );
};

export default DesktopContent;
