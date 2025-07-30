import React, { useState } from 'react';
import './HotelBooking.css';

interface Props {
  goHome?: () => void;
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const yachts = [
  {
    id: 1,
    name: 'يخت النخيل الذهبي',
    location: 'شرم الشيخ، البحر الأحمر',
    rating: 4.9,
    price: 2500,
    capacity: 12,
    description: 'يخت فاخر مع طاقم محترف وإطلالات رائعة على البحر الأحمر',
    amenities: ['طاقم محترف', 'معدات غوص', 'معدات صيد', 'مطعم', 'بار', 'غرف نوم فاخرة'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 2,
    name: 'يخت المرجان الأزرق',
    location: 'دهب، جنوب سيناء',
    rating: 4.7,
    price: 1800,
    capacity: 8,
    description: 'يخت متوسط الحجم مثالي للرحلات العائلية والجولات السياحية',
    amenities: ['طاقم محترف', 'معدات غوص', 'مطعم', 'بار', 'غرف نوم مريحة'],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 3,
    name: 'يخت اللؤلؤ الأبيض',
    location: 'الغردقة، البحر الأحمر',
    rating: 4.5,
    price: 1200,
    capacity: 6,
    description: 'يخت صغير ومريح للرحلات القصيرة والجولات النهارية',
    amenities: ['طاقم محترف', 'معدات غوص', 'مطعم', 'بار'],
    images: [
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const YachtBooking: React.FC<Props> = ({ goHome, showNotification }) => {
  const [selectedYacht, setSelectedYacht] = useState<typeof yachts[0] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState(4);
  const [guests, setGuests] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بحث وفلاتر
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  // فرز
  const [sortBy, setSortBy] = useState('');

  // استخراج المدن المتاحة
  const cities = Array.from(new Set(yachts.map(y => y.location.split('،')[0].trim())));
  // استخراج السعات المتاحة
  const capacities = Array.from(new Set(yachts.map(y => y.capacity))).sort((a, b) => a - b);

  // تصفية اليخوت
  let filteredYachts = yachts.filter(yacht => {
    const matchesSearch = yacht.name.includes(search) || yacht.location.includes(search);
    const matchesCity = filterCity ? yacht.location.startsWith(filterCity) : true;
    const matchesRating = filterRating ? yacht.rating >= Number(filterRating) : true;
    const matchesPrice = filterPrice ? yacht.price <= Number(filterPrice) : true;
    const matchesCapacity = filterCapacity ? yacht.capacity >= Number(filterCapacity) : true;
    return matchesSearch && matchesCity && matchesRating && matchesPrice && matchesCapacity;
  });

  // فرز النتائج
  if (sortBy === 'price-asc') filteredYachts = [...filteredYachts].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filteredYachts = [...filteredYachts].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating-desc') filteredYachts = [...filteredYachts].sort((a, b) => b.rating - a.rating);
  if (sortBy === 'rating-asc') filteredYachts = [...filteredYachts].sort((a, b) => a.rating - b.rating);
  if (sortBy === 'capacity-desc') filteredYachts = [...filteredYachts].sort((a, b) => b.capacity - a.capacity);
  if (sortBy === 'capacity-asc') filteredYachts = [...filteredYachts].sort((a, b) => a.capacity - b.capacity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (showNotification) {
      showNotification(`تم إرسال طلب الحجز ليخت ${selectedYacht?.name} بنجاح! سنتواصل معك قريباً.`, 'success');
    }
    setIsSubmitting(false);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const handleYachtSelect = (yacht: typeof yachts[0]) => {
    setSelectedYacht(yacht);
    if (showNotification) {
      showNotification(`تم اختيار ${yacht.name}`, 'info');
    }
  };

  if (!selectedYacht) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <h1>⛵ احجز يختك المفضل</h1>
          <p className="hero-subtitle">استمتع برحلات بحرية فاخرة على أجمل اليخوت</p>
        </div>

        {/* شريط البحث والفلاتر */}
        <div className="hotel-filters">
          <input
            type="text"
            className="hotel-search-input"
            placeholder="ابحث بالاسم أو الموقع..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="hotel-filter-select"
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
          >
            <option value="">كل المواقع</option>
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
            <option value="1500">حتى 1500 جنيه</option>
            <option value="2000">حتى 2000 جنيه</option>
            <option value="2500">حتى 2500 جنيه</option>
          </select>
          <select
            className="hotel-filter-select"
            value={filterCapacity}
            onChange={e => setFilterCapacity(e.target.value)}
          >
            <option value="">كل السعات</option>
            {capacities.map(cap => (
              <option key={cap} value={cap}>سعة {cap}+</option>
            ))}
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
            <option value="capacity-desc">السعة: الأعلى للأقل</option>
            <option value="capacity-asc">السعة: الأقل للأعلى</option>
          </select>
        </div>

        <div className="hotels-grid">
          {filteredYachts.length === 0 && (
            <div style={{textAlign: 'center', color: '#888', fontSize: '1.2rem', margin: '40px 0'}}>
              لا توجد يخوت مطابقة لبحثك أو الفلاتر المختارة.
            </div>
          )}
          {filteredYachts.map((yacht, idx) => (
            <div
              key={yacht.id}
              className="hotel-card fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => handleYachtSelect(yacht)}
            >
              <div className="hotel-image-container">
                <img src={yacht.images[0]} alt={yacht.name} className="hotel-card-image" />
                <div className="hotel-price">${yacht.price}/ساعة</div>
              </div>
              <div className="hotel-card-content">
                <h3>{yacht.name}</h3>
                <p className="hotel-location">📍 {yacht.location}</p>
                <div className="hotel-rating">
                  {renderStars(yacht.rating)} ({yacht.rating})
                </div>
                <p className="hotel-description">{yacht.description}</p>
                <div className="yacht-capacity">
                  <span className="capacity-tag">👥 السعة: {yacht.capacity} أشخاص</span>
                </div>
                <div className="hotel-amenities">
                  {yacht.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
                <button 
                  className="home-buttons-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYachtSelect(yacht);
                  }}
                  title="احجز هذا اليخت"
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
        <h1>⛵ حجز {selectedYacht.name}</h1>
        <p className="hero-subtitle">{selectedYacht.location}</p>
      </div>

      <div className="hotel-details">
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

        <div className="hotel-info">
          <div className="hotel-header">
            <h2>{selectedYacht.name}</h2>
            <div className="hotel-rating-large">
              {renderStars(selectedYacht.rating)} ({selectedYacht.rating})
            </div>
            <p className="hotel-location-large">📍 {selectedYacht.location}</p>
            <p className="hotel-description-large">{selectedYacht.description}</p>
            
            <div className="yacht-capacity-large">
              <span className="capacity-tag-large">👥 السعة: {selectedYacht.capacity} أشخاص</span>
            </div>
          </div>

          <div className="hotel-amenities-large">
            <h3>المرافق المتاحة:</h3>
            <div className="amenities-grid">
              {selectedYacht.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag-large">✓ {amenity}</span>
              ))}
            </div>
          </div>

          <div className="hotel-price-large">
            <span className="price-amount">${selectedYacht.price}</span>
            <span className="price-period">/ساعة</span>
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
            <label>عدد الضيوف:</label>
            <input
              type="number"
              min={1}
              max={selectedYacht.capacity}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
        <label>تاريخ الرحلة:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
          </div>
          
          <div className="form-group">
        <label>عدد الساعات:</label>
        <input
          type="number"
              min={2}
              max={12}
          value={hours}
          onChange={e => setHours(Number(e.target.value))}
          required
        />
          </div>
        </div>

        <div className="booking-summary">
          <h4>ملخص الحجز:</h4>
          <div className="summary-item">
            <span>عدد الساعات:</span>
            <span>{hours} ساعات</span>
          </div>
          <div className="summary-item">
            <span>عدد الضيوف:</span>
            <span>{guests} أشخاص</span>
          </div>
          <div className="summary-item">
            <span>السعر الإجمالي:</span>
            <span>${selectedYacht.price * hours}</span>
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
              setSelectedYacht(null);
              if (showNotification) {
                showNotification('تم العودة لاختيار يخت آخر', 'info');
              }
            }}
        >
          العودة لاختيار يخت آخر
        </button>
        </div>
      </form>
    </div>
  );
};

export default YachtBooking;