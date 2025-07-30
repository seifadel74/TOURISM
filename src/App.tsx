import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HotelBooking from './components/HotelBooking';
import YachtBooking from './components/YachtBooking';

type Page = 'home' | 'login' | 'signup' | 'hotel' | 'yacht';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="App">
      <Header
        goHome={() => setPage('home')}
        goToLogin={() => setPage('login')}
        goToSignUp={() => setPage('signup')}
      />
      {page === 'home' && (
        <HomePage
          goToHotel={() => setPage('hotel')}
          goToYacht={() => setPage('yacht')}
        />
      )}
      {page === 'hotel' && <HotelBooking />}
      {page === 'yacht' && <YachtBooking />}
      {page === 'login' && (
        <Login goToSignUp={() => setPage('signup')} goHome={() => setPage('home')} />
      )}
      {page === 'signup' && (
        <SignUp goToLogin={() => setPage('login')} goHome={() => setPage('home')} />
      )}
      <Footer />
    </div>
  );
}

export default App;
