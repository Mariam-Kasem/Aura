import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const defaultProducts = [
  {
    id: 'prod-1',
    title: 'بيجامة قطن ناعمة - وردي هادئ',
    category: 'pajamas',
    desc: 'بيجامة صيفية مصممة من أجود أقمشة القطن الخالص المريحة للنوم والاسترخاء في البيت.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: 'prod-2',
    title: 'شنطة يد نسائية جلد فاخر',
    category: 'bags',
    desc: 'شنطة يد أنيقة ومساحة واسعة تناسب الخروج اليومي، العمل، والجامعة.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: 'prod-3',
    title: 'طقم إكسسوارات رومانسي روز جولد',
    category: 'accessories',
    desc: 'سلسلة رقيقة مع إسوارة مرصعة بالفصوص اللامعة بتصميم يبرز نعومتك.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: 'prod-4',
    title: 'بيجامة شتوية مخملية دافئة',
    category: 'pajamas',
    desc: 'بيجامة قطيفة فائقة النعومة بتصميم كيوت ومريح للأيام الباردة.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: 'prod-5',
    title: 'حقيبة ظهر كاجوال للبنات',
    category: 'bags',
    desc: 'حقيبة ظهر عصرية وعملية للمشاوير الطويلة والدراسة بألوان باستيل جذابة.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
  {
    id: 'prod-6',
    title: 'مجموعة خواتم وأسوارة عصرية',
    category: 'accessories',
    desc: 'تشكيلة خواتم وأساور مطلية مقاومة للصدأ لإطلالة متكاملة.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
  },
];

const normalizeProduct = (product) => ({
  id: product.id ?? product._id ?? `${product.title}-${product.category}`,
  title: product.title ?? product.name ?? 'منتج Aura',
  category: (product.category ?? 'pajamas').toLowerCase(),
  desc: product.desc ?? product.description ?? 'منتج فاخر من متجر Aura.',
  price: Number(product.price ?? 0),
  image: product.image ?? product.img ?? defaultProducts[0].image,
  isAvailable: product.isAvailable ?? true,
});

export default function Home({ user, initialCategory = 'all', onAddToCart }) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState(defaultProducts);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const routeCategory = location.pathname.replace('/', '');
    if (routeCategory === 'home' || routeCategory === '') {
      setSelectedCategory('all');
      return;
    }

    setSelectedCategory(routeCategory === 'pajamas' || routeCategory === 'bags' || routeCategory === 'accessories' ? routeCategory : initialCategory);
  }, [initialCategory, location.pathname]);

  // جلب المنتجات الحقيقية من الـ Backend وتحديث الواجهة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        const apiProducts = response.data?.products ?? response.data ?? [];

        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          setProducts(apiProducts.map(normalizeProduct));
        }
      } catch (error) {
        console.error('Error fetching products from backend, falling back to default:', error);
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'all'
        ? products
        : products.filter((item) => item.category === selectedCategory),
    [products, selectedCategory]
  );

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }

    setNotification(`تمت إضافة "${product.title}" إلى السلة بنجاح! 🛍️`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div dir="rtl" className="min-vh-100 pb-5" style={{ backgroundColor: '#fcf8f8' }}>
      <div className="container py-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 text-white" style={{ background: 'linear-gradient(135deg, #c79298 0%, #a06b72 100%)' }}>
          <div className="row align-items-center">
            <div className="col-md-8 text-md-end text-center mb-3 mb-md-0">
              <h2 className="fw-bold mb-2">أهلاً بك في عالم AURA ✨</h2>
              <p className="mb-0 opacity-75 small">
                وجهتك الأولى للأنوثة والأناقة؛ اختاري أجمل البيجامات المريحة، الشنط العصرية، والإكسسوارات المميزة.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <span className="badge bg-white text-dark px-4 py-2 rounded-pill fw-bold shadow-sm" style={{ color: '#684549' }}>
                تشكيلة صيف وشتوي جديدة
              </span>
            </div>
          </div>
        </div>

        {notification && (
          <div className="alert alert-success text-center fw-bold rounded-3 shadow-sm py-2 mb-4">
            {notification}
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
          <div>
            <h4 className="fw-bold mb-1" style={{ color: '#684549' }}>تصفح منتجات أورا</h4>
            <p className="text-muted small mb-0">تسوقي أحدث صيحات الموضة والإكسسوارات والبيجامات المصنوعة خصيصاً لكِ</p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm rounded-pill px-3 fw-bold ${selectedCategory === 'all' ? 'text-white' : 'btn-outline-secondary'}`}
              style={selectedCategory === 'all' ? { backgroundColor: '#c79298', borderColor: '#c79298' } : {}}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('pajamas')}
              className={`btn btn-sm rounded-pill px-3 fw-bold ${selectedCategory === 'pajamas' ? 'text-white' : 'btn-outline-secondary'}`}
              style={selectedCategory === 'pajamas' ? { backgroundColor: '#c79298', borderColor: '#c79298' } : {}}
            >
              بيجامات 🌙
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('bags')}
              className={`btn btn-sm rounded-pill px-3 fw-bold ${selectedCategory === 'bags' ? 'text-white' : 'btn-outline-secondary'}`}
              style={selectedCategory === 'bags' ? { backgroundColor: '#c79298', borderColor: '#c79298' } : {}}
            >
              شنط 👜
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('accessories')}
              className={`btn btn-sm rounded-pill px-3 fw-bold ${selectedCategory === 'accessories' ? 'text-white' : 'btn-outline-secondary'}`}
              style={selectedCategory === 'accessories' ? { backgroundColor: '#c79298', borderColor: '#c79298' } : {}}
            >
              إكسسوارات ✨
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-muted py-4">جاري تحميل المنتجات...</div>
        )}

        <div className="row g-4 mb-5">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="col-md-4 col-sm-6">
              <div className="card h-100 rounded-4 border-0 shadow-sm overflow-hidden bg-white position-relative">
                <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#f9f3f4' }}>
                  <img src={prod.image} alt={prod.title} className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.3s' }} />
                </div>

                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <span className="badge bg-light text-secondary border rounded-pill px-3 py-1 mb-2">
                      {prod.category === 'pajamas' ? 'بيجامات بنات' : prod.category === 'bags' ? 'شنط نسائية' : 'إكسسوارات'}
                    </span>
                    <h5 className="fw-bold text-dark mb-2">{prod.title}</h5>
                    <p className="text-muted small mb-3">{prod.desc}</p>
                  </div>

                  <div className="border-top pt-3 d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted d-block" style={{ fontSize: '11px' }}>السعر</span>
                      <span className="fw-bold fs-5" style={{ color: '#684549' }}>
                        {prod.price} <small className="fs-6">ج.م</small>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="btn fw-bold px-3 py-2 rounded-3 text-white d-flex align-items-center gap-1 shadow-sm"
                      style={{ backgroundColor: '#c79298', fontSize: '13px' }}
                    >
                      <i className="bi bi-bag-plus"></i> إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}