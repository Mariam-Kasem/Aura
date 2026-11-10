import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ممكن تربطيها بالباك إند أو تعرضي رسالة نجاح
    console.log('بيانات الرسالة المرسلة:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div dir="rtl" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2" style={{ color: '#4a3b44' }}>تواصل معنا</h2>
              <p className="text-muted small">
                عندك استفسار عن مقاس، منتج، أو طلب خاص؟ سيلينا وعمر في خدمتك، اتركي رسالتنا وهنتواصل معاكي في أقرب وقت!
              </p>
            </div>

            {submitted && (
              <div className="alert alert-success text-center rounded-3 fw-bold mb-4">
                تم إرسال رسالتك بنجاح! شكراً لتواصلك مع AURA، سنتواصل معك قريباً. ✨
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">الاسم الكامل</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control rounded-3 py-2 border-light-subtle"
                    placeholder="اكتبي اسمك هنا..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control rounded-3 py-2 border-light-subtle"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-secondary">رقم الهاتف (اختياري)</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control rounded-3 py-2 border-light-subtle"
                    placeholder="01xxxxxxxxx"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-secondary">رسالتك أو استفسارك</label>
                  <textarea 
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-control rounded-3 py-2 border-light-subtle"
                    placeholder="اكتبي تفاصيل الطلب أو الاستفسار هنا..."
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-4">
                  <button 
                    type="submit" 
                    className="btn px-5 py-2 text-white fw-bold rounded-pill shadow-sm"
                    style={{ backgroundColor: '#b87380' }}
                  >
                    إرسال الرسالة 💌
                  </button>
                </div>

              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}