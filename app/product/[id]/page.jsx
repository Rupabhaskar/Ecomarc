// 'use client';
// import { useEffect, useState, useContext } from 'react';
// import { useParams } from 'next/navigation';
// import { db } from '../../../lib/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { CartContext } from '../../../utils/cartContext';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const docRef = doc(db, 'products', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setProduct({ id: docSnap.id, ...docSnap.data() });
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-8 max-w-2xl mx-auto">
//       <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-contain mb-4" />
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <p className="mt-2 text-lg text-gray-700">₹{product.price}</p>
//       <p className="text-sm text-green-600 mb-4">In Stock: {product.quantity}</p>
//       <button
//         className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
//         onClick={() => addToCart(product)}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }



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

  if (!product) return <p>Loading...</p>;

  const handleBuyNow = () => {
    addToCart({ ...product, id });
    router.push('/checkout');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl mt-4 font-semibold text-green-700">₹{product.price}</p>
          <div className="mt-6 flex gap-4">
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded"
              onClick={() => addToCart({ ...product, id })}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggested.map((item) => (
            <div
              key={item.id}
              className="border rounded p-2 cursor-pointer hover:shadow"
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <img src={item.imageUrl} className="w-full h-32 object-cover rounded" />
              <p className="mt-2 text-sm font-semibold">{item.name}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
