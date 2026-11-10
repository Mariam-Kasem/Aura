import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer dir="rtl" className="text-white pt-5 pb-3 mt-auto" style={{ backgroundColor: '#362930' }}>
      <div className="container">
        <div className="row gy-4 mb-4">
          
          {/* العمود الأول: معلومات التواصل */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">تواصلوا معنا</h6>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-2">
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <i className="bi bi-telephone-fill" style={{ color: '#b87380' }}></i>
                <span>+20 000 000 100</span>
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <i className="bi bi-envelope-fill" style={{ color: '#b87380' }}></i>
                <span>support@aura-store.com</span>
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <i className="bi bi-geo-alt-fill" style={{ color: '#b87380' }}></i>
                <span>القاهرة، مصر</span>
              </li>
            </ul>
          </div>

          {/* العمود الثاني: خدمة العملاء */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">خدمة العملاء</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/returns" className="text-white-50 text-decoration-none hover-white">سياسة الاستبدال والاسترجاع</Link></li>
              <li><Link to="/size-guide" className="text-white-50 text-decoration-none hover-white">جدول المقاسات</Link></li>
              <li><Link to="/tracking" className="text-white-50 text-decoration-none hover-white">متابعة الطلب</Link></li>
              <li><Link to="/faq" className="text-white-50 text-decoration-none hover-white">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: روابط سريعة */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">روابط سريعة</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-white">الرئيسية</Link></li>
              <li><Link to="/pajamas" className="text-white-50 text-decoration-none hover-white">قسم البيجامات البناتي</Link></li>
              <li><Link to="/bags" className="text-white-50 text-decoration-none hover-white">شنط وحقائب راقية</Link></li>
              <li><Link to="/accessories" className="text-white-50 text-decoration-none hover-white">إكسسوارات ممتازة</Link></li>
              <li><Link to="/qr-generator" className="text-white-50 text-decoration-none hover-white">مولد الكيو آر كود</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: نبذة عن البراند والسوشيال ميديا */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '35px', height: '35px', backgroundColor: '#b87380', color: '#fff' }}
              >
                <span className="fw-bold" style={{ fontSize: '12px' }}>AU</span>
              </div>
              <h5 className="mb-0 fw-bold tracking-wider">AURA</h5>
            </div>
            <p className="text-white-50 small mb-3">
              علامة تجارية متخصصة في توفير أرقى البيجامات والشنط والإكسسوارات الأنيقة للبنات بتصاميم تجمع بين الراحة والجمال.
            </p>
            {/* أيقونات التواصل الاجتماعي */}
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <a href="#whatsapp" className="text-white fs-5"><i className="bi bi-whatsapp"></i></a>
              <a href="#facebook" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#instagram" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

        </div>

        {/* خط فاصل وحقوق الملكية */}
        <hr className="border-secondary opacity-25 my-3" />
        <div className="row align-items-center gy-2">
          <div className="col-12 text-center text-md-start">
            <p className="mb-0 text-white-50" style={{ fontSize: '12px' }}>
              &copy; {currentYear} جميع الحقوق محفوظة لـ AURA Store - تصميم وتطوير متجر عمر وأخته.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}