import React from 'react';
import { Home, BarChart2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-[60]" dir="rtl">
            <div className="max-w-md mx-auto flex justify-around">
                <Link to="/" className="flex flex-col items-center p-2">
                    <Home className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">בית</span>
                </Link>
                <Link to="/analytics" className="flex flex-col items-center p-2">
                    <BarChart2 className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">ניתוח</span>
                </Link>
                <Link to="/settings" className="flex flex-col items-center p-2">
                    <Settings className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">הגדרות</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;