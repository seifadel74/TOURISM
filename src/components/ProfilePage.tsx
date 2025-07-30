import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: user?.avatar || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      updateProfile(formData);
      setIsEditing(false);
      toast.success('تم تحديث البيانات بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث البيانات');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <h1>الملف الشخصي</h1>
          <div className="profile-actions">
            {!isEditing ? (
              <motion.button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={20} />
                تعديل
              </motion.button>
            ) : (
              <div className="edit-actions">
                <motion.button
                  className="save-btn"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={20} />
                  حفظ
                </motion.button>
                <motion.button
                  className="cancel-btn"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                  إلغاء
                </motion.button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-container">
              <img 
                src={formData.avatar || 'https://via.placeholder.com/150'} 
                alt="صورة المستخدم" 
                className="avatar"
              />
              {isEditing && (
                <label className="avatar-upload">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <label className="info-label">
                <User size={20} />
                الاسم الكامل
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="info-input"
                  placeholder="أدخل اسمك الكامل"
                />
              ) : (
                <div className="info-value">{formData.name}</div>
              )}
            </div>

            <div className="info-group">
              <label className="info-label">
                <Mail size={20} />
                البريد الإلكتروني
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="info-input"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              ) : (
                <div className="info-value">{formData.email}</div>
              )}
            </div>

            <div className="info-group">
              <label className="info-label">
                <Phone size={20} />
                رقم الهاتف
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="info-input"
                  placeholder="أدخل رقم هاتفك"
                />
              ) : (
                <div className="info-value">{formData.phone || 'غير محدد'}</div>
              )}
            </div>

            <div className="info-group">
              <label className="info-label">
                <MapPin size={20} />
                العنوان
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="info-input"
                  placeholder="أدخل عنوانك"
                />
              ) : (
                <div className="info-value">{formData.address || 'غير محدد'}</div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">الحجوزات السابقة</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">الحجوزات الحالية</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8</div>
            <div className="stat-label">التقييم العام</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage; 