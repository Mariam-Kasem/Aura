import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Admin from './Components/Admin/Admin';
import Contact from './Components/Contact/Contact';
import Auth from './Components/Auth/Auth'; // <-- تم إضافة الاستيراد الناقص هنا

function MainLayout({ user, onLogout }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const current = prev.find((item) => item.id === product.id);
      if (current) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column" style={{ backgroundColor: '#fcf8f8' }}>
      <Nav
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onOpenCart={() => alert(`إجمالي المنتجات في السلة: ${cart.length} منتج`)}
        onLogout={onLogout}
      />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home user={user} onAddToCart={handleAddToCart} />} />
          <Route path="/home" element={<Home user={user} onAddToCart={handleAddToCart} />} />
          <Route path="/pajamas" element={<Home user={user} initialCategory="pajamas" onAddToCart={handleAddToCart} />} />
          <Route path="/bags" element={<Home user={user} initialCategory="bags" onAddToCart={handleAddToCart} />} />
          <Route path="/accessories" element={<Home user={user} initialCategory="accessories" onAddToCart={handleAddToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={
              user?.role === 'admin' ? (
                <Admin onExit={() => navigate('/home')} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Auth onAuthSuccess={(userData) => setUser(userData)} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        <Route
          path="/*"
          element={
            user ? (
              <MainLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
}