import React, { useState, useEffect } from 'react';
import './HotelBooking.css';
import { fetchYachts } from '../api/yacht';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  goHome?: () => void;
  showNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

// بيانات تجريبية لليخوت
const mockYachts = [
  {
    id: 1,
    name: 'يخت النيل الفاخر',
    description: 'يخت فاخر على نهر النيل مع إطلالات رائعة وخدمة متميزة.',
    location: 'القاهرة، مصر',
    price: 500,
    rating: 4.8,
    capacity: 8,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
    amenities: ['واي فاي', 'مطبخ', 'غرف نوم', 'حمام', 'مظلة', 'معدات صيد']
  },
  {
    id: 2,
    name: 'يخت البحر الأحمر',
    description: 'يخت فاخر في البحر الأحمر مع إمكانية الغوص والسباحة.',
    location: 'الغردقة، مصر',
    price: 800,
    rating: 4.9,
    capacity: 12,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    ],
    amenities: ['واي فاي', 'مطبخ', 'غرف نوم', 'حمام', 'معدات غوص', 'معدات صيد']
  },
  {
    id: 3,
    name: 'يخت الإسكندرية',
    description: 'يخت أنيق في ميناء الإسكندرية مع إطلالات على البحر المتوسط.',
    location: 'الإسكندرية، مصر',
    price: 600,
    rating: 4.5,
    capacity: 10,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    ],
    amenities: ['واي فاي', 'مطبخ', 'غرف نوم', 'حمام', 'مظلة', 'معدات صيد']
  },
  {
    id: 4,
    name: 'يخت شرم الشيخ',
    description: 'يخت فاخر في شرم الشيخ مع إمكانية الغوص في الشعاب المرجانية.',
    location: 'شرم الشيخ، مصر',
    price: 750,
    rating: 4.7,
    capacity: 15,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
    amenities: ['واي فاي', 'مطبخ', 'غرف نوم', 'حمام', 'معدات غوص', 'معدات صيد', 'معدات رياضات مائية']
  },
  {
    id: 5,
    name: 'يخت مرسى علم',
    description: 'يخت فاخر في مرسى علم مع إطلالات على الجبال والبحر الأحمر.',
    location: 'مرسى علم، مصر',
    price: 900,
    rating: 4.9,
    capacity: 20,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    ],
    amenities: ['واي فاي', 'مطبخ', 'غرف نوم', 'حمام', 'معدات غوص', 'معدات صيد', 'معدات رياضات مائية', 'جاكوزي']
  }
];

const YachtBooking: React.FC<Props> = ({ goHome, showNotification }) => {
  const { t } = useLanguage();
  const [selectedYacht, setSelectedYacht] = useState<typeof yachts[0] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState(4);
  const [guests, setGuests] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [yachts, setYachts] = useState<any[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  // بحث وفلاتر
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  // فرز
  const [sortBy, setSortBy] = useState('');

  // استخراج المدن المتاحة
  const cities = Array.from(new Set(yachts.map(y => y.location?.split(',')[0]?.trim() || '').filter(city => city)));
  // استخراج السعات المتاحة
  const capacities = Array.from(new Set(yachts.map(y => y.capacity || 0))).sort((a, b) => a - b);

  useEffect(() => {
    const getYachts = async () => {
      try {
        const yachtsData = await fetchYachts();
        console.log('Yachts data received:', yachtsData);
        
        // التأكد من أن البيانات صحيحة
        if (yachtsData && Array.isArray(yachtsData) && yachtsData.length > 0) {
          setYachts(yachtsData);
        } else {
          console.log('Using mock data - no valid API response');
          setYachts(mockYachts);
        }
      } catch (error: any) {
        console.error('Error fetching yachts:', error);
        console.log('Using mock data due to API error');
        setYachts(mockYachts);
      }
    };
    getYachts();
  }, []);

  // تصفية اليخوت
  let filteredYachts = yachts.filter(yacht => {
    const matchesSearch = (yacht.name?.includes(search) || yacht.location?.includes(search)) || false;
    const matchesCity = filterCity ? yacht.location?.startsWith(filterCity) : true;
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
    
    try {
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إنشاء رقم حجز فريد
      const newBookingId = `YK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setBookingId(newBookingId);
      
      // محاكاة نجاح الحجز
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookingConfirmed(true);
      
      if (showNotification) {
        showNotification(`✅ تم تأكيد حجز اليخت بنجاح! رقم الحجز: ${newBookingId}`, 'success');
      }
      
      // إرسال إشعار إضافي
      toast.success(`🎉 تم تأكيد حجز يخت ${selectedYacht?.name}! سنتواصل معك قريباً.`);
      
    } catch (error) {
      if (showNotification) {
        showNotification('❌ حدث خطأ في الحجز. يرجى المحاولة مرة أخرى.', 'error');
      }
      toast.error('حدث خطأ في الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
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

  if (bookingConfirmed) {
    return (
      <div className="home-container">
        <div className="booking-confirmation">
          <div className="confirmation-icon">✅</div>
          <h1 className="confirmation-title">تم تأكيد حجز اليخت بنجاح!</h1>
          <div className="confirmation-details">
            <div className="confirmation-item">
              <span className="label">رقم الحجز:</span>
              <span className="value booking-id">{bookingId}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">اسم اليخت:</span>
              <span className="value">{selectedYacht?.name}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">الموقع:</span>
              <span className="value">{selectedYacht?.location}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">تاريخ الرحلة:</span>
              <span className="value">{date}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">مدة الرحلة:</span>
              <span className="value">{hours} ساعات</span>
            </div>
            <div className="confirmation-item">
              <span className="label">عدد الضيوف:</span>
              <span className="value">{guests}</span>
            </div>
            <div className="confirmation-item">
              <span className="label">سعة اليخت:</span>
              <span className="value">{selectedYacht?.capacity} أشخاص</span>
            </div>
            <div className="confirmation-item total-price">
              <span className="label">السعر الإجمالي:</span>
              <span className="value">${selectedYacht?.price * hours}</span>
            </div>
          </div>
          
          <div className="confirmation-message">
            <p>🎉 تم تأكيد حجز اليخت بنجاح!</p>
            <p>سنقوم بإرسال تفاصيل الحجز إلى بريدك الإلكتروني قريباً.</p>
            <p>يمكنك التواصل معنا على الرقم: <strong>+20 123 456 7890</strong></p>
          </div>
          
          <div className="confirmation-actions">
            <button 
              className="home-buttons-btn"
              onClick={() => {
                setBookingConfirmed(false);
                setSelectedYacht(null);
                setBookingId('');
                setName('');
                setEmail('');
                setPhone('');
                setDate('');
                setHours(4);
                setGuests(4);
                if (showNotification) {
                  showNotification('تم العودة لصفحة الحجز الرئيسية', 'info');
                }
              }}
            >
              حجز جديد
            </button>
            
            {goHome && (
              <button 
                className="back-btn"
                onClick={goHome}
              >
                العودة للصفحة الرئيسية
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
                  {yacht.amenities.slice(0, 3).map((amenity: string, index: number) => (
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
        {selectedYacht.images.map((img: string, idx: number) => (
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
              {selectedYacht.amenities.map((amenity: string, index: number) => (
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
            className={`home-buttons-btn booking-confirm-btn ${isSubmitting ? 'submitting' : ''}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner">⏳</span>
                جاري تأكيد الحجز...
              </>
            ) : (
              <>
                <span className="confirm-icon">✅</span>
                تأكيد الحجز
              </>
            )}
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