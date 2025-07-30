import React, { useState } from 'react';
import './HotelBooking.css'; // استخدم نفس ملف CSS للفورم والكروت

const yachts = [
  {
    id: 1,
    name: 'يخت الأحلام',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 2,
    name: 'يخت البحر',
    images: [
      'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 3,
    name: 'يخت النخبة',
    images: [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const YachtBooking: React.FC = () => {
  const [selectedYacht, setSelectedYacht] = useState<typeof yachts[0] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم إرسال طلب الحجز لـ${selectedYacht?.name} بنجاح!`);
    // هنا يمكنك إرسال البيانات للباك اند لاحقًا
  };

  if (!selectedYacht) {
    return (
      <div className="home-container">
        <h1>اختر اليخت</h1>
        <div className="hotel-cards-list">
          {yachts.map(yacht => (
            <div key={yacht.id} className="hotel-card">
              <img src={yacht.images[0]} alt={yacht.name} />
              <h3 style={{ margin: '16px 0 8px 0', color: '#00796b' }}>{yacht.name}</h3>
              <button className="home-buttons-btn" onClick={() => setSelectedYacht(yacht)}>
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
      <h1>حجز {selectedYacht.name}</h1>
      {/* معرض صور اليخت */}
      <div className="hotel-gallery">
        {selectedYacht.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={selectedYacht.name + ' صورة ' + (idx + 1)}
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
        <label>تاريخ الرحلة:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <label>عدد الساعات:</label>
        <input
          type="number"
          min={1}
          value={hours}
          onChange={e => setHours(Number(e.target.value))}
          required
        />
        <button className="home-buttons-btn" type="submit">
          تأكيد الحجز
        </button>
        <button
          type="button"
          className="back-btn"
          onClick={() => setSelectedYacht(null)}
        >
          العودة لاختيار يخت آخر
        </button>
      </form>
    </div>
  );
};

export default YachtBooking;