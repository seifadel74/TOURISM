import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, User, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/hotels', label: t('nav.hotels') },
    { path: '/yachts', label: t('nav.yachts') },
    { path: '/about', label: t('nav.about') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      className="main-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <Link to="/" className="logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏖️ {t('footer.tourismWebsite')}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {/* Language Toggle */}
          <motion.button
            className="header-btn language-btn"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe size={20} />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button
            className="header-btn theme-btn"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isDarkMode ? 'Switch to Light Mode' : 'التبديل للوضع الليلي'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="user-menu">
              <motion.button
                className="header-btn user-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
                <span>{user?.name}</span>
              </motion.button>
              
              <motion.div
                className="user-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
              >
                <Link to="/profile" className="dropdown-item">
                  {t('nav.profile')}
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  {t('nav.logout')}
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <motion.button
                  className="header-btn login-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('nav.login')}
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  className="header-btn signup-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('nav.signup')}
                </motion.button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="nav-mobile"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        
        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/signup"
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.signup')}
            </Link>
          </>
        )}
        
        {isAuthenticated && (
          <>
            <Link
              to="/profile"
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.profile')}
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-nav-link logout-btn"
            >
              {t('nav.logout')}
            </button>
          </>
        )}
      </motion.nav>
    </motion.header>
  );
};

export default Header;