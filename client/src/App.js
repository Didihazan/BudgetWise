import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from "./pages/Page404";
import ScrollToTop from './components/ScrollToTop';
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import TransactionModal from "./pages/TransactionModal";

// Loading component
export const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen font-heebo">
        <div className="w-8 h-8 border-4 border-[#937c5d] border-r-transparent rounded-full animate-spin"></div>
    </div>
)
function App() {

    return (
        <>

            <div className="min-h-screen bg-gray-50">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/add-transaction" element={<TransactionModal />} />
                </Routes>
            </div>
            <ScrollToTop />
        </>
    );
}

export default App;