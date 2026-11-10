import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Nav({ user, cartCount = 0, onOpenCart, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3 px-3 px-md-5 sticky-top" dir="rtl">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* بيانات المستخدم والسلة على اليمين */}
        <div className="d-flex align-items-center gap-3">
          {user?.role !== 'admin' && (
            <button
              onClick={onOpenCart}
              className="btn position-relative rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: '42px', height: '42px', backgroundColor: '#fdf2f4', border: '1px solid #e8c5c8' }}
              title="سلة التسوق"
            >
              <i className="bi bi-bag-heart fs-5" style={{ color: '#8b7380' }}></i>
              {cartCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ backgroundColor: '#b87380', fontSize: '10px' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <div className="d-flex align-items-center gap-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  fontSize: '14px',
                  backgroundColor: '#b87380'
                }}
              >
                {user?.role === 'admin' ? 'AU' : (user?.name ? user.name.slice(0, 2).toUpperCase() : 'AU')}
              </div>
            </div>
          )}

          {user ? (
            <button 
              type="button"
              onClick={onLogout} 
              className="btn btn-sm px-3 py-1 text-secondary border-0"
              style={{ fontSize: '13px' }}
            >
              تسجيل الخروج
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => navigate('/login')} 
              className="btn btn-sm px-3 py-1 rounded-pill text-white fw-bold"
              style={{ backgroundColor: '#b87380' }}
            >
              تسجيل الدخول
            </button>
          )}
        </div>

        {/* اللوجو في المنتصف (AURA) */}
        <div 
          className="d-flex flex-column align-items-center mx-auto" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle shadow-sm mb-1"
            style={{ width: '45px', height: '45px', backgroundColor: '#b87380', color: '#ffffff' }}
          >
            <span className="fw-bold fs-4" style={{ fontFamily: 'serif', letterSpacing: '1px' }}>AU</span>
          </div>
          <h4 className="mb-0 fw-bold" style={{ color: '#4a3b44', letterSpacing: '3px', fontFamily: 'serif' }}>AURA</h4>
        </div>

        {/* روابط التنقل الرئيسية على اليسار */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'fw-bold' : ''}`}
            style={({ isActive }) => ({ color: isActive ? '#b87380' : '#6c757d', fontSize: '15px' })}
          >
            الرئيسية
          </NavLink>

          <NavLink 
            to="/pajamas" 
            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'fw-bold' : ''}`}
            style={({ isActive }) => ({ color: isActive ? '#b87380' : '#6c757d', fontSize: '15px' })}
          >
            البيجامات
          </NavLink>

          <NavLink 
            to="/bags" 
            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'fw-bold' : ''}`}
            style={({ isActive }) => ({ color: isActive ? '#b87380' : '#6c757d', fontSize: '15px' })}
          >
            الشنط
          </NavLink>

          <NavLink 
            to="/accessories" 
            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'fw-bold' : ''}`}
            style={({ isActive }) => ({ color: isActive ? '#b87380' : '#6c757d', fontSize: '15px' })}
          >
            الاكسسوارات
          </NavLink>


          <NavLink 
            to="/contact" 
            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'fw-bold' : ''}`}
            style={({ isActive }) => ({ color: isActive ? '#b87380' : '#6c757d', fontSize: '15px' })}
          >
            تواصل معنا
          </NavLink>
        </div>

      </div>
    </nav>
  );
}