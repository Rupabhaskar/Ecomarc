
// 'use client';
// import { useEffect, useState } from 'react';
// import { db } from '../../lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';

// // Sample banner images (host your own or use CDN links)
// const banners = [
//   "https://cdn.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.webp",
// "https://as1.ftcdn.net/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.webp",
// "https://thumbs.dreamstime.com/b/red-banner-special-offer-megaphone-white-background-ribbon-discount-sale-modern-advertising-promotion-store-info-174333995.jpg?w=768",
// ];



// export default function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [bannerIndex, setBannerIndex] = useState(0);
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('search')?.toLowerCase() || '';

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsCol = collection(db, 'products');
//       const productSnapshot = await getDocs(productsCol);
//       const productList = productSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setProducts(productList);
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBannerIndex((prev) => (prev + 1) % banners.length);
//     }, 4000); // change every 4s
//     return () => clearInterval(interval);
//   }, []);

//   const filtered = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery)
//   );

//   return (
//     <div className="p-4 mt-[50px] md:p-8">
//       {/* Sliding Offer Banner */}
//       <div className="mb-8 overflow-hidden rounded-xl shadow-md">
//         <img
//           src={banners[bannerIndex]}
//           alt={`Offer ${bannerIndex + 1}`}
//           className="w-full h-70 object-cover transition-all duration-500 ease-in-out"
//         />
//       </div>

//       <h1 className="text-2xl font-bold mb-4">All Products</h1>

//       {searchQuery && (
//         <p className="text-gray-600 mb-2">
//           Showing results for: <strong>{searchQuery}</strong>
//         </p>
//       )}

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filtered.map((product) => (
//           <Link key={product.id} href={`/product/${product.id}`}>
//             <div className="border p-4 rounded-xl shadow hover:shadow-lg transition duration-300 bg-white">
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="h-40 w-full object-contain mb-2 rounded"
//               />
//               <h2 className="text-lg font-semibold truncate">{product.name}</h2>
//               <p className="text-sm text-gray-700">₹{product.price}</p>
//               <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
//               <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded">
//                 View Details
//               </button>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Typewriter } from 'react-simple-typewriter';

// Sample banner images
const banners = [
  "https://cdn.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.webp",
  "https://as1.ftcdn.net/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.webp",
  "https://thumbs.dreamstime.com/b/red-banner-special-offer-megaphone-white-background-ribbon-discount-sale-modern-advertising-promotion-store-info-174333995.jpg?w=768",
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="mt-[60px] bg-gradient-to-br from-pink-50 via-white to-blue-50 min-h-screen">
      {/* Animations inline */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeImage {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .fade-image { animation: fadeImage 1s ease-in-out; }
      `}</style>

      {/* Hero Section */}
      <div className="px-4 md:px-8 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">
        {/* Left */}
        <div className="text-center md:text-left space-y-6 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-snug">
            Your One-Stop{' '}
            <span className="text-pink-600">
              <Typewriter
                words={["Shopping", "Saving", "Style Spot", "Deals", "Gadgets", "Fashion"]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light max-w-md mx-auto md:mx-0">
            Discover amazing styles, exclusive offers, and top brands that redefine your shopping journey.
          </p>
          <a
            href="#products"
            className="mt-4 inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transform transition hover:scale-105"
          >
            Start Shopping
          </a>
        </div>

        {/* Right (Banner Slider) */}
        <div className="relative w-full flex justify-center animate-slideInRight">
          <img
            key={bannerIndex}
            src={banners[bannerIndex]}
            alt={`Offer ${bannerIndex + 1}`}
            className="fade-image w-full max-w-[700px] h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-cover rounded-xl shadow-lg border border-gray-200"
          />
        </div>
      </div>

      {/* Search Info */}
      {searchQuery && (
        <p className="text-gray-600 mb-4 text-center md:text-left max-w-[1600px] mx-auto px-4 animate-fadeIn">
          Showing results for: <strong>{searchQuery}</strong>
        </p>
      )}

      {/* Product Grid */}
      <div
        id="products"
        className="px-4 md:px-8 max-w-[1600px] mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-6 pb-10"
      >
        {filtered.map((product, index) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div
              className="border p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 bg-white transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] w-full object-contain mb-2 rounded transition-transform duration-300 hover:scale-110"
              />
              <h2 className="text-sm sm:text-base font-semibold truncate">{product.name}</h2>
              <p className="text-xs sm:text-sm text-gray-700">₹{product.price}</p>
              <p className="text-xs sm:text-sm text-green-600">In Stock: {product.quantity}</p>
              <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-1 rounded transition-transform duration-300 hover:scale-105">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
