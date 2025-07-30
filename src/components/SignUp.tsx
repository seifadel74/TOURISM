import React, { useState } from 'react';
import './log&sign.css';

interface Props {
  goToLogin: () => void;
  goHome: () => void;
}

const SignUp: React.FC<Props> = ({ goToLogin, goHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
      return;
    }
    if (!gender) {
      setError('يرجى اختيار النوع');
      return;
    }
    setError('');
    alert('تم إنشاء الحساب (تجريبي)');
    goHome();
  };

  return (
    <div className="auth-container">
      <h2>إنشاء حساب</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="ذكر"
              checked={gender === 'ذكر'}
              onChange={e => setGender(e.target.value)}
              required
            />{' '}
            ذكر
          </label>
          {'  '}
          <label style={{ marginRight: 16 }}>
            <input
              type="radio"
              name="gender"
              value="أنثى"
              checked={gender === 'أنثى'}
              onChange={e => setGender(e.target.value)}
              required
            />{' '}
            أنثى
          </label>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit">تسجيل</button>
      </form>
      <p>
        لديك حساب بالفعل؟{' '}
        <button style={{ background: 'none', color: '#00796b', border: 'none', cursor: 'pointer' }} onClick={goToLogin}>
          تسجيل الدخول
        </button>
      </p>
    </div>
  );
};

export default SignUp;