'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Sample banner images (host your own or use CDN links)
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
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, []);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-4 md:p-8">
      {/* Sliding Offer Banner */}
      <div className="mb-8 overflow-hidden rounded-xl shadow-md">
        <img
          src={banners[bannerIndex]}
          alt={`Offer ${bannerIndex + 1}`}
          className="w-full h-60 object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {searchQuery && (
        <p className="text-gray-600 mb-2">
          Showing results for: <strong>{searchQuery}</strong>
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="border p-4 rounded-xl shadow hover:shadow-lg transition duration-300 bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-contain mb-2 rounded"
              />
              <h2 className="text-lg font-semibold truncate">{product.name}</h2>
              <p className="text-sm text-gray-700">₹{product.price}</p>
              <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
              <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


// 'use client';
// import { useEffect, useState } from 'react';
// import { db } from '../lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';


// export default function HomePage() {
//   const [products, setProducts] = useState([]);
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

//   const filtered = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery)
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">All Products</h1>
//       {searchQuery && (
//         <p className="text-gray-600 mb-2">Showing results for: <strong>{searchQuery}</strong></p>
//       )}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//         {filtered.map((product) => (
//           <Link key={product.id} href={`/product/${product.id}`}>
//             <div className="border p-4 rounded shadow hover:bg-gray-100">
//               <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-contain mb-2" />
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="text-sm text-gray-700">₹{product.price}</p>
//               <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
