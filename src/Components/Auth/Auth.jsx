import React, { useState } from 'react';

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // تسجيل دخول وهمي للتجربة
    const userData = { name: email.split('@')[0], role: 'admin' };
    localStorage.setItem('user', JSON.stringify(userData));
    onAuthSuccess(userData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">تسجيل الدخول - Aura</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">دخول</button>
        </form>
      </div>
    </div>
  );
}