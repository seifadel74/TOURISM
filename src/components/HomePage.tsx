import React from 'react';
import './HomePage.css';

interface Props {
  goToHotel: () => void;
  goToYacht: () => void;
}

const HomePage: React.FC<Props> = ({ goToHotel, goToYacht }) => {
  return (
    <div className="home-container">
      <h1>مرحبًا بك في موقع السياحة</h1>
      <p>احجز فندقك أو يختك بسهولة واستمتع برحلتك!</p>
      <div className="home-buttons">
        <button className="home-buttons-btn" onClick={goToHotel}>احجز فندق</button>
        <button className="home-buttons-btn" onClick={goToYacht}>احجز يخت</button>
      </div>
    </div>
  );
};

export default HomePage;