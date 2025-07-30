import React, { useState } from 'react';
import './HotelBooking.css';

const hotels = [
  {
    id: 1,
    name: 'فندق النيل',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 2,
    name: 'فندق البحر',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 3,
    name: 'فندق الجبل',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const HotelBooking: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم إرسال طلب الحجز لفندق ${selectedHotel?.name} بنجاح!`);
    // هنا يمكنك إرسال البيانات للباك اند لاحقًا
  };

  if (!selectedHotel) {
    return (
      <div className="home-container">
        <h1>اختر فندقك</h1>
        <div className="hotel-cards-list">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.images[0]} alt={hotel.name} />
              <h3 style={{ margin: '16px 0 8px 0', color: '#00796b' }}>{hotel.name}</h3>
              <button className="home-buttons-btn" onClick={() => setSelectedHotel(hotel)}>
                احجز الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>حجز {selectedHotel.name}</h1>
      {/* معرض صور الفندق */}
      <div className="hotel-gallery">
        {selectedHotel.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={selectedHotel.name + ' صورة ' + (idx + 1)}
            className="hotel-gallery-img"
          />
        ))}
      </div>
      <form className="hotel-booking-form" onSubmit={handleSubmit}>
        <label>الاسم:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label>البريد الإلكتروني:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>تاريخ الوصول:</label>
        <input
          type="date"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          required
        />
        <label>تاريخ المغادرة:</label>
        <input
          type="date"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
          required
        />
        <label>عدد الغرف:</label>
        <input
          type="number"
          min={1}
          value={rooms}
          onChange={e => setRooms(Number(e.target.value))}
          required
        />
        <button className="home-buttons-btn" type="submit">
          تأكيد الحجز
        </button>
        <button
          type="button"
          className="back-btn"
          onClick={() => setSelectedHotel(null)}
        >
          العودة لاختيار فندق آخر
        </button>
      </form>
    </div>
  );
};

export default HotelBooking;