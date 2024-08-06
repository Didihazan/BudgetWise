import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import OrderPages from "./pages/Order-pages";


function App() {
    // const [reminderTime, setReminderTime] = useState('');
    //
    // useEffect(() => {
    //     // בקשת הרשאה להתראות בטעינת האפליקציה
    //     requestNotificationPermission();
    //     // טעינת תזכורת שמורה (אם קיימת)
    //     const savedTime = loadReminder();
    //     if (savedTime) {
    //         setReminderTime(savedTime);
    //     }
    // }, []);
    //
    // const setReminder = () => {
    //     console.log(`Reminder set for ${reminderTime}`);
    //     saveReminder(reminderTime);
    //     // כאן תוכל להוסיף לוגיקה נוספת, כמו הגדרת התראה בפועל
    // };
    //
    // // פונקציה לבקשת הרשאת התראות (סעיף 5)
    // const requestNotificationPermission = () => {
    //     if ('Notification' in window) {
    //         Notification.requestPermission().then(function(result) {
    //             if (result === 'granted') {
    //                 console.log('Notification permission granted!');
    //             }
    //         });
    //     }
    // };
    //
    // // פונקציות לשמירה וטעינה של תזכורות (סעיף 6)
    // const saveReminder = (time) => {
    //     localStorage.setItem('reminderTime', time);
    // };
    //
    // const loadReminder = () => {
    //     return localStorage.getItem('reminderTime');
    // };

    return (
        <Router>
        <div className="App">
            <OrderPages/>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route path="/contact" element={<Contact />} />*/}
            </Routes>
        </div>

        </Router>
    );
}

export default App;