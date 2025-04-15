import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TaxCalculator from './TaxCalculator';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot';
import FAQs from './components/FAQs';
import './App.css';

function AppContent() {
    const location = useLocation();
    // Show chatbot only on /calculator route
    const showChatbot = location.pathname === '/calculator';

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calculator" element={<TaxCalculator />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path ="/faqs" element={<FAQs/>} />
                </Routes>
            </main>
            <Chatbot visible={showChatbot} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;