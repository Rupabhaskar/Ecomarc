'use client';

import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../utils/cartContext';
import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProduct(snap.data());
      }
    };

    const fetchSuggested = async () => {
      const querySnap = await getDocs(collection(db, 'products'));
      const all = [];
      querySnap.forEach(doc => {
        if (doc.id !== id) all.push({ id: doc.id, ...doc.data() });
      });
      setSuggested(all.slice(0, 4));
    };

    fetchProduct();
    fetchSuggested();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const handleBuyNow = () => {
    addToCart({ ...product, id });
    router.push('/checkout');
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-700 mb-2">₹{product.price}</p>
          <p className={`mb-4 text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
          </p>
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded text-white ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
              onClick={() => addToCart({ ...product, id })}
              disabled={isOutOfStock}
            >
              Add to Cart
            </button>
            <button
              className={`px-6 py-2 rounded text-white ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              onClick={handleBuyNow}
              disabled={isOutOfStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggested.map((item) => (
            <div
              key={item.id}
              className="border rounded p-2 cursor-pointer hover:shadow"
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <img
                src={item.imageUrl}
                className="w-full h-32 object-cover rounded"
                alt={item.name}
              />
              <p className="mt-2 text-sm font-semibold">{item.name}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
              {item.stock <= 0 && (
                <p className="text-red-500 text-xs mt-1">Out of Stock</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


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

//   if (!product) return <p>Loading...</p>;

//   const handleBuyNow = () => {
//     addToCart({ ...product, id });
//     router.push('/checkout');
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg" />
//         <div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <p className="text-xl mt-4 font-semibold text-green-700">₹{product.price}</p>
//           <div className="mt-6 flex gap-4">
//             <button
//               className="bg-purple-600 text-white px-6 py-2 rounded"
//               onClick={() => addToCart({ ...product, id })}
//             >
//               Add to Cart
//             </button>
//             <button
//               className="bg-green-600 text-white px-6 py-2 rounded"
//               onClick={handleBuyNow}
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Suggested Products */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">You may also like</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {suggested.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded p-2 cursor-pointer hover:shadow"
//               onClick={() => router.push(`/product/${item.id}`)}
//             >
//               <img src={item.imageUrl} className="w-full h-32 object-cover rounded" />
//               <p className="mt-2 text-sm font-semibold">{item.name}</p>
//               <p className="text-green-600 font-bold">₹{item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
