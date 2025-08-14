// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../../../utils/cartContext';
// import { db } from '../../../lib/firebase';
// import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { addToCart } = useContext(CartContext);

//   const [product, setProduct] = useState(null);
//   const [suggested, setSuggested] = useState([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const docRef = doc(db, 'products', id);
//       const snap = await getDoc(docRef);
//       if (snap.exists()) {
//         setProduct(snap.data());
//       }
//     };

//     const fetchSuggested = async () => {
//       const querySnap = await getDocs(collection(db, 'products'));
//       const all = [];
//       querySnap.forEach(doc => {
//         if (doc.id !== id) all.push({ id: doc.id, ...doc.data() });
//       });
//       setSuggested(all.slice(0, 4));
//     };

//     fetchProduct();
//     fetchSuggested();
//   }, [id]);

//   if (!product) return <p className="text-center mt-10">Loading...</p>;

//   const handleBuyNow = () => {
//     addToCart({ ...product, id });
//     router.push('/checkout');
//   };

//   const isOutOfStock = product.stock <= 0;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       {/* Product Details Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full h-96 object-cover rounded-lg shadow"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <p className="text-xl font-semibold text-green-700 mb-2">₹{product.price}</p>
//           <p className={`mb-4 text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
//             {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
//           </p>
//           <div className="flex gap-4">
//             <button
//               className={`px-6 py-2 rounded text-white ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
//               onClick={() => addToCart({ ...product, id })}
//               disabled={isOutOfStock}
//             >
//               Add to Cart
//             </button>
//             <button
//               className={`px-6 py-2 rounded text-white ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
//               onClick={handleBuyNow}
//               disabled={isOutOfStock}
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Suggested Products Section */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">You may also like</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {suggested.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded p-2 cursor-pointer hover:shadow"
//               onClick={() => router.push(`/product/${item.id}`)}
//             >
//               <img
//                 src={item.imageUrl}
//                 className="w-full h-32 object-cover rounded"
//                 alt={item.name}
//               />
//               <p className="mt-2 text-sm font-semibold">{item.name}</p>
//               <p className="text-green-600 font-bold">₹{item.price}</p>
//               {item.stock <= 0 && (
//                 <p className="text-red-500 text-xs mt-1">Out of Stock</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../utils/cartContext';
import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product and suggested products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        }

        const productsSnap = await getDocs(collection(db, 'products'));
        const relatedProducts = [];
        productsSnap.forEach((docSnap) => {
          if (docSnap.id !== id) {
            relatedProducts.push({ id: docSnap.id, ...docSnap.data() });
          }
        });

        setSuggested(relatedProducts.slice(0, 4));
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 animate-pulse">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-200 h-96 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-2/3 rounded" />
            <div className="h-4 bg-gray-200 w-full rounded" />
            <div className="h-6 bg-gray-200 w-1/4 rounded" />
            <div className="h-10 bg-gray-200 w-1/3 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Product not found.</p>;
  }

  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/checkout');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-12">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-700 mb-2">₹{product.price}</p>
          <p
            className={`mb-6 text-sm font-medium ${
              isOutOfStock ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                isOutOfStock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                isOutOfStock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      {suggested.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggested.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/product/${item.id}`)}
                className="bg-white border rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
              >
                <div className="relative w-full h-40 bg-gray-100">
                  <Image
                    src={item.imageUrl || '/placeholder.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-green-700 font-bold text-sm">₹{item.price}</p>
                  {item.stock <= 0 && (
                    <p className="text-red-500 text-xs mt-1">Out of Stock</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
