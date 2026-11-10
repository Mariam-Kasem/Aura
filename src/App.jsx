import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Admin from './Components/Admin/Admin';
import Contact from './Components/Contact/Contact';

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
              <Admin onExit={() => navigate('/home')} />
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
  const user = { name: 'زائر', role: 'admin' }; // مستخدم افتراضي بدون لوجين

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<MainLayout user={user} onLogout={() => {}} />} />
      </Routes>
    </HashRouter>
  );
}