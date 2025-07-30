import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import HotelBooking from './components/HotelBooking';
import YachtBooking from './components/YachtBooking';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound404 from './components/NotFound404';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import ProfilePage from './components/ProfilePage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: '',
                duration: 4000,
                style: {
                  background: isDarkMode ? '#363636' : '#fff',
                  color: isDarkMode ? '#fff' : '#363636',
                  border: isDarkMode ? '1px solid #555' : '1px solid #e0e0e0',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />

            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-spinner-large"></div>
                <p>جاري التحميل...</p>
              </div>
            )}

            <Header
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <main className={`main-content ${isLoading ? 'loading' : ''}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hotels" element={<HotelBooking />} />
                <Route path="/yachts" element={<YachtBooking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/404" element={<NotFound404 />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
