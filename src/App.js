import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import DesktopContent from './pages/DesktopContent';
import MobileContent from './pages/MobileContent';

function App() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <Router>
            <div className="App">
                {isMobile ? (
                    <Routes>
                        <Route path="/*" element={<MobileContent />} />
                    </Routes>
                ) : (
                    <>
                        <Routes>
                            <Route path="/*" element={<DesktopContent />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
