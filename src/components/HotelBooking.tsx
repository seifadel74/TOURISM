import React, { useState } from 'react';
import './HotelBooking.css';

interface Props {
  goHome?: () => void;
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const hotels = [
  {
    id: 1,
    name: 'فندق النيل الفاخر',
    location: 'وسط البلد، القاهرة',
    rating: 4.8,
    price: 1200,
    description: 'فندق فاخر يطل على نهر النيل مع إطلالات رائعة وخدمة متميزة',
    amenities: ['واي فاي مجاني', 'مسبح', 'جيم', 'مطعم', 'بار'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 2,
    name: 'فندق البحر الأحمر',
    location: 'شرم الشيخ، البحر الأحمر',
    rating: 4.6,
    price: 1800,
    description: 'فندق سياحي مميز على شاطئ البحر الأحمر مع شاطئ خاص',
    amenities: ['شاطئ خاص', 'واي فاي مجاني', 'مسبح', 'جيم', 'مطعم', 'بار', 'سبا'],
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 3,
    name: 'فندق الجبل الأخضر',
    location: 'دهب، جنوب سيناء',
    rating: 4.4,
    price: 900,
    description: 'فندق هادئ في قلب الطبيعة مع إطلالات على الجبال والبحر',
    amenities: ['واي فاي مجاني', 'مطعم', 'بار', 'حديقة', 'موقف سيارات'],
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const HotelBooking: React.FC<Props> = ({ goHome, showNotification }) => {
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بحث وفلاتر
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  // فرز
  const [sortBy, setSortBy] = useState('');

  // استخراج المدن المتاحة
  const cities = Array.from(new Set(hotels.map(h => h.location.split('،')[0].trim())));

  // تصفية الفنادق
  let filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.includes(search) || hotel.location.includes(search);
    const matchesCity = filterCity ? hotel.location.startsWith(filterCity) : true;
    const matchesRating = filterRating ? hotel.rating >= Number(filterRating) : true;
    const matchesPrice = filterPrice ? hotel.price <= Number(filterPrice) : true;
    return matchesSearch && matchesCity && matchesRating && matchesPrice;
  });

  // فرز النتائج
  if (sortBy === 'price-asc') filteredHotels = [...filteredHotels].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filteredHotels = [...filteredHotels].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating-desc') filteredHotels = [...filteredHotels].sort((a, b) => b.rating - a.rating);
  if (sortBy === 'rating-asc') filteredHotels = [...filteredHotels].sort((a, b) => a.rating - b.rating);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (showNotification) {
      showNotification(`تم إرسال طلب الحجز لفندق ${selectedHotel?.name} بنجاح! سنتواصل معك قريباً.`, 'success');
    }
    setIsSubmitting(false);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const handleHotelSelect = (hotel: typeof hotels[0]) => {
    setSelectedHotel(hotel);
    if (showNotification) {
      showNotification(`تم اختيار ${hotel.name}`, 'info');
    }
  };

  if (!selectedHotel) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <h1>🏨 احجز فندقك المفضل</h1>
          <p className="hero-subtitle">اختر من بين أفضل الفنادق الفاخرة والاقتصادية</p>
        </div>

        {/* شريط البحث والفلاتر */}
        <div className="hotel-filters">
          <input
            type="text"
            className="hotel-search-input"
            placeholder="ابحث بالاسم أو المدينة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="hotel-filter-select"
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
          >
            <option value="">كل المدن</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select
            className="hotel-filter-select"
            value={filterRating}
            onChange={e => setFilterRating(e.target.value)}
          >
            <option value="">كل التقييمات</option>
            <option value="4.5">4.5+ نجوم</option>
            <option value="4">4+ نجوم</option>
            <option value="3">3+ نجوم</option>
          </select>
          <select
            className="hotel-filter-select"
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
          >
            <option value="">كل الأسعار</option>
            <option value="1000">حتى 1000 جنيه</option>
            <option value="1500">حتى 1500 جنيه</option>
            <option value="2000">حتى 2000 جنيه</option>
          </select>
          <select
            className="hotel-filter-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="">ترتيب النتائج</option>
            <option value="price-asc">السعر: الأقل للأعلى</option>
            <option value="price-desc">السعر: الأعلى للأقل</option>
            <option value="rating-desc">التقييم: الأعلى للأقل</option>
            <option value="rating-asc">التقييم: الأقل للأعلى</option>
          </select>
        </div>

        <div className="hotels-grid">
          {filteredHotels.length === 0 && (
            <div style={{textAlign: 'center', color: '#888', fontSize: '1.2rem', margin: '40px 0'}}>
              لا توجد فنادق مطابقة لبحثك أو الفلاتر المختارة.
            </div>
          )}
          {filteredHotels.map((hotel, idx) => (
            <div
              key={hotel.id}
              className="hotel-card fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => handleHotelSelect(hotel)}
            >
              <div className="hotel-image-container">
                <img src={hotel.images[0]} alt={hotel.name} className="hotel-card-image" />
                <div className="hotel-price">${hotel.price}/ليلة</div>
              </div>
              <div className="hotel-card-content">
                <h3>{hotel.name}</h3>
                <p className="hotel-location">📍 {hotel.location}</p>
                <div className="hotel-rating">
                  {renderStars(hotel.rating)} ({hotel.rating})
                </div>
                <p className="hotel-description">{hotel.description}</p>
                <div className="hotel-amenities">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
                <button 
                  className="home-buttons-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotelSelect(hotel);
                  }}
                  title="احجز هذا الفندق"
                >
                  احجز الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🏨 حجز {selectedHotel.name}</h1>
        <p className="hero-subtitle">{selectedHotel.location}</p>
      </div>

      <div className="hotel-details">
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

        <div className="hotel-info">
          <div className="hotel-header">
            <h2>{selectedHotel.name}</h2>
            <div className="hotel-rating-large">
              {renderStars(selectedHotel.rating)} ({selectedHotel.rating})
            </div>
            <p className="hotel-location-large">📍 {selectedHotel.location}</p>
            <p className="hotel-description-large">{selectedHotel.description}</p>
          </div>

          <div className="hotel-amenities-large">
            <h3>المرافق المتاحة:</h3>
            <div className="amenities-grid">
              {selectedHotel.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag-large">✓ {amenity}</span>
              ))}
            </div>
          </div>

          <div className="hotel-price-large">
            <span className="price-amount">${selectedHotel.price}</span>
            <span className="price-period">/ليلة</span>
          </div>
        </div>
      </div>

      <form className="hotel-booking-form" onSubmit={handleSubmit}>
        <h3>معلومات الحجز</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>الاسم الكامل:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="أدخل اسمك الكامل"
            />
          </div>
          
          <div className="form-group">
            <label>البريد الإلكتروني:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>رقم الهاتف:</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              placeholder="أدخل رقم هاتفك"
            />
          </div>
          
          <div className="form-group">
            <label>عدد الغرف:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={rooms}
              onChange={e => setRooms(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>عدد الضيوف:</label>
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              required
            />
          </div>
          
          <div className="form-group">
            <label>تاريخ الوصول:</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>تاريخ المغادرة:</label>
          <input
            type="date"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            required
          />
        </div>

        <div className="booking-summary">
          <h4>ملخص الحجز:</h4>
          <div className="summary-item">
            <span>عدد الليالي:</span>
            <span>{checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0}</span>
          </div>
          <div className="summary-item">
            <span>السعر الإجمالي:</span>
            <span>${checkIn && checkOut ? selectedHotel.price * Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) * rooms : 0}</span>
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="home-buttons-btn" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الحجز'}
          </button>
          
          <button
            type="button"
            className="back-btn"
            onClick={() => {
              setSelectedHotel(null);
              if (showNotification) {
                showNotification('تم العودة لاختيار فندق آخر', 'info');
              }
            }}
          >
            العودة لاختيار فندق آخر
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelBooking;