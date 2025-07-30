import React from 'react';
import './Header.css';

interface Props {
  goHome: () => void;
  goToLogin: () => void;
  goToSignUp: () => void;
  // يمكنك إضافة دوال أخرى لاحقًا مثل حجز فندق أو يخت
}

const Header: React.FC<Props> = ({ goHome, goToLogin, goToSignUp }) => (
  <header className="main-header">
    <h2 style={{ cursor: 'pointer' }} onClick={goHome}>موقع السياحة</h2>
    <nav>
      <button className="header-link" onClick={goHome}>الرئيسية</button>
      <button className="header-link" onClick={goToLogin}>تسجيل الدخول</button>
      <button className="header-link" onClick={goToSignUp}>إنشاء حساب</button>
      {/* يمكنك إضافة زر تواصل معنا لاحقًا */}
    </nav>
  </header>
);

export default Header;