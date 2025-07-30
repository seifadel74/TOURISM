import React, { useState } from 'react';
import './log&sign.css';

interface Props {
  goToSignUp: () => void;
  goHome: () => void;
}

const Login: React.FC<Props> = ({ goToSignUp, goHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم تسجيل الدخول (تجريبي)');
    goHome();
  };

  return (
    <div className="auth-container">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">دخول</button>
      </form>
      <p>
        ليس لديك حساب؟{' '}
        <button style={{ background: 'none', color: '#00796b', border: 'none', cursor: 'pointer' }} onClick={goToSignUp}>
          إنشاء حساب
        </button>
      </p>
    </div>
  );
};

export default Login;