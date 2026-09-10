'use client';

import { useState } from 'react';

interface Offer {
  name: string;
  price: string;
}

interface Product {
  id: string;
  name: string;
  displayName: string;
  description: string;
  offers: Offer[];
}

const products: Product[] = [
  {
    id: 'pubg',
    name: 'ببجي موبايل (PUBG)',
    displayName: 'PUBG Mobile',
    description: 'شدات بوبجي',
    offers: [
      { name: '60 UC', price: '12.333' },
      { name: '325 UC', price: '61.649' },
      { name: '660 UC', price: '123.336' },
      { name: '1800 UC', price: '308.339' },
      { name: '3850 UC', price: '616.674' },
      { name: '8100 UC', price: '1233.355' },
    ]
  },
  {
    id: 'freefire',
    name: 'فري فاير (Free Fire)',
    displayName: 'Free Fire',
    description: 'جواهر فري فاير',
    offers: [
      { name: 'Diamonds 100', price: '13.132' },
      { name: 'Diamonds 210', price: '26.264' },
      { name: 'Diamonds 530', price: '65.660' },
      { name: 'Diamonds 1080', price: '131.320' },
      { name: 'Diamonds 2200', price: '262.640' },
    ]
  },
  {
    id: 'itunes-us',
    name: 'بطاقة آيتونز أمريكي',
    displayName: 'iTunes US',
    description: 'بطاقات متجر أمريكي',
    offers: [
      { name: 'iTunes 2$', price: '26.264' },
      { name: 'iTunes 3$', price: '39.396' },
      { name: 'iTunes 4$', price: '52.528' },
      { name: 'iTunes 5$', price: '65.660' },
      { name: 'iTunes 10$', price: '131.320' },
      { name: 'iTunes 15$', price: '196.980' },
      { name: 'iTunes 20$', price: '262.640' },
      { name: 'iTunes 25$', price: '328.300' },
    ]
  },
  {
    id: 'itunes-tr',
    name: 'بطاقة آيتونز تركي',
    displayName: 'iTunes TR',
    description: 'بطاقات متجر تركي',
    offers: [
      { name: 'iTunes 25 TL', price: '8.554' },
      { name: 'iTunes 50 TL', price: '17.107' },
      { name: 'iTunes 100 TL', price: '34.215' },
      { name: 'iTunes 250 TL', price: '85.538' },
      { name: 'iTunes 1000 TL', price: '342.152' },
    ]
  },
  {
    id: 'tiktok',
    name: 'عملات تيك توك',
    displayName: 'TikTok Coins',
    description: 'عملات وهدايا تيك توك',
    offers: []
  }
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('libyana');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [trackOrderId, setTrackOrderId] = useState('');

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedOffer(null);
    setMessage(null);
    setTimeout(() => {
      document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      productName: selectedProduct?.name || '',
      offerName: selectedOffer?.name || '',
      price: selectedOffer?.price || '',
      playerId: formData.get('playerId') as string,
      paymentMethod: formData.get('paymentMethod') as string,
      cardCode: formData.get('cardCode') as string || '',
      phoneNumber: formData.get('phoneNumber') as string,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const trackingLink = `/track/${result.orderId}`;
        setMessage({ 
          type: 'success', 
          text: `تم إرسال الطلب بنجاح! رقم الطلب: #${result.orderId}` 
        });
        
        // Show tracking link
        setTimeout(() => {
          if (confirm('✅ تم إرسال الطلب بنجاح!\n\nهل تريد الانتقال لصفحة تتبع الطلب لاستلام كود الشحن؟')) {
            window.location.href = trackingLink;
          } else {
            (e.target as HTMLFormElement).reset();
            setSelectedProduct(null);
            setSelectedOffer(null);
          }
        }, 500);
      } else {
        setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#1E1E1E] border-b-[3px] border-[#FF6B00] py-5 text-center">
        <h1 className="text-[#FF6B00] text-4xl font-bold tracking-[2px] m-0">
          Tech Line تك لاين
        </h1>
        <p className="mt-2 text-gray-300">متجرك الأول لشحن الألعاب والتطبيقات عبر كروت ليبيانا</p>
      </header>

      {/* Container */}
      <div className="max-w-[1000px] mx-auto py-8 px-5">
        {/* Track Order Section */}
        <div className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] rounded-lg p-6 mb-8 border border-[#FF6B00]">
          <h3 className="text-xl font-bold text-[#FF6B00] mb-3 text-center">📦 تتبع طلبك واستلام الكود</h3>
          <p className="text-gray-300 text-center mb-4">أدخل رقم الطلب الخاص بك لمعرفة الحالة واستلام كود الشحن</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="number"
              value={trackOrderId}
              onChange={(e) => setTrackOrderId(e.target.value)}
              placeholder="رقم الطلب (مثال: 1)"
              className="flex-1 p-3 rounded border border-[#444] bg-[#2A2A2A] text-white text-center"
            />
            <button
              onClick={() => {
                if (trackOrderId) {
                  window.location.href = `/track/${trackOrderId}`;
                } else {
                  alert('⚠️ الرجاء إدخال رقم الطلب');
                }
              }}
              className="bg-[#FF6B00] text-white px-6 py-3 rounded font-bold hover:opacity-90 transition-opacity"
            >
              🔍 تتبع
            </button>
          </div>
        </div>

        <h2 className="mb-5 border-r-4 border-[#FF6B00] pr-3 text-2xl">اختر الخدمة</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className={`bg-[#1E1E1E] rounded-[10px] p-4 text-center border cursor-pointer transition-all duration-200 hover:-translate-y-[5px] ${
                selectedProduct?.id === product.id ? 'border-[#FF6B00]' : 'border-[#333] hover:border-[#FF6B00]'
              }`}
            >
              <h3 className="my-2.5 text-xl">{product.displayName}</h3>
              <p className="text-gray-400">{product.description}</p>
            </div>
          ))}
        </div>

        {/* Offers Section */}
        {selectedProduct && selectedProduct.offers.length > 0 && (
          <div id="offers-section" className="mt-10">
            <h2 className="mb-5 border-r-4 border-[#FF6B00] pr-3 text-2xl">
              اختر العرض - {selectedProduct.name}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
              {selectedProduct.offers.map((offer, index) => (
                <div
                  key={index}
                  onClick={() => handleOfferSelect(offer)}
                  className={`bg-[#1E1E1E] rounded-lg p-5 text-center border cursor-pointer transition-all duration-200 hover:-translate-y-[5px] ${
                    selectedOffer?.name === offer.name ? 'border-[#FF6B00] bg-[#2A2A2A]' : 'border-[#333] hover:border-[#FF6B00]'
                  }`}
                >
                  <div className="text-2xl font-bold text-[#FF6B00] mb-2">{offer.name}</div>
                  <div className="text-xl text-gray-300">{offer.price} دينار</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message for products without offers */}
        {selectedProduct && selectedProduct.offers.length === 0 && (
          <div className="mt-10 bg-[#1E1E1E] p-6 rounded-lg text-center">
            <p className="text-gray-400 text-lg">
              العروض لـ {selectedProduct.name} ستكون متاحة قريباً...
            </p>
          </div>
        )}

        {/* Checkout Section */}
        {selectedProduct && selectedOffer && (
          <div id="checkout" className="bg-[#1E1E1E] mt-10 p-6 rounded-[10px]">
            <h2 className="mb-5 text-2xl">
              إتمام الطلب: {selectedProduct.name} - {selectedOffer.name}
            </h2>
            
            <div className="mb-5 p-4 bg-[#2A2A2A] rounded-lg border border-[#FF6B00]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">العرض:</span>
                <span className="font-bold text-[#FF6B00]">{selectedOffer.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">السعر:</span>
                <span className="font-bold text-2xl text-[#FF6B00]">{selectedOffer.price} دينار</span>
              </div>
            </div>

            {message && (
              <div className={`mb-5 p-4 rounded ${message.type === 'success' ? 'bg-green-900/30 border border-green-500 text-green-300' : 'bg-red-900/30 border border-red-500 text-red-300'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-right">
                <label className="block mb-1.5">معرّف الحساب (Player ID / Username):</label>
                <input
                  type="text"
                  name="playerId"
                  placeholder="أدخل ID الحساب الخاص بك"
                  required
                  className="w-full p-3 rounded border border-[#444] bg-[#2A2A2A] text-white"
                />
              </div>

              <div className="mb-4 text-right">
                <label className="block mb-1.5">طريقة الدفع:</label>
                <select
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 rounded border border-[#444] bg-[#2A2A2A] text-white"
                >
                  <option value="libyana">شحن كارت ليبيانا</option>
                  <option value="transfer">رصيد ليبيانا (تحويل)</option>
                </select>
              </div>

              {paymentMethod === 'libyana' && (
                <div className="mb-4 text-right">
                  <label className="block mb-1.5">رقم كارت الشحن (13 أو 14 رقم):</label>
                  <input
                    type="text"
                    name="cardCode"
                    placeholder="أدخل رقم كارت ليبيانا هنا"
                    required={paymentMethod === 'libyana'}
                    className="w-full p-3 rounded border border-[#444] bg-[#2A2A2A] text-white"
                  />
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="mb-4 text-right">
                  <div className="bg-[#2A2A2A] p-4 rounded border border-[#444]">
                    <label className="block mb-2 text-[#FF6B00] font-bold">رقم التحويل:</label>
                    <div className="text-2xl font-mono text-white text-center py-2 bg-[#1E1E1E] rounded">
                      0944235295
                    </div>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      قم بالتحويل إلى هذا الرقم ثم أدخل رقم هاتفك أدناه
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-4 text-right">
                <label className="block mb-1.5">رقم الهاتف للتواصل:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="092XXXXXXX"
                  required
                  className="w-full p-3 rounded border border-[#444] bg-[#2A2A2A] text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF6B00] text-white border-none p-3 text-base font-bold rounded cursor-pointer w-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'تأكيد إرسال الطلب'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
