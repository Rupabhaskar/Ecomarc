// 'use client';
// import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from '../../lib/firebase';
// import { CartContext } from '../../utils/cartContext';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cart, clearCart } = useContext(CartContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false); // ✅ Add this line

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       if (!u) {
//         router.push('/login?redirect=/checkout');
//       } else {
//         setUser(u);
//       }
//     });
//     return () => unsub();
//   }, [router]);

//   const placeOrder = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const order = {
//         items: cart,
//         total: cart.reduce((sum, item) => sum + item.price, 0),
//         status: 'Order Placed',
//         createdAt: serverTimestamp(),
//         userId: user.uid,
//         email: user.email,
//       };
//       const orderRef = await addDoc(collection(db, 'orders'), order);
//       clearCart();
//       router.push(`/orders/${orderRef.id}`);
//     } catch (error) {
//       console.error('Order placement failed:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return <p>Redirecting to login…</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-xl font-bold mb-4">Checkout</h1>
//       <p>Total Items: {cart.length}</p>
//       <p>Total Amount: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
//       <button
//         className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
//         onClick={placeOrder}
//         disabled={loading}
//       >
//         {loading ? 'Placing Order...' : 'Place Order'}
//       </button>
//     </div>
//   );
// }



'use client';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { CartContext } from '../../utils/cartContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push('/login?redirect=/checkout');
      } else {
        setUser(u);
      }
    });
    return () => unsub();
  }, [router]);

  const placeOrder = async () => {
    if (!user || cart.length === 0) return;

    setLoading(true);
    try {
      const order = {
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        status: 'Order Placed',
        createdAt: serverTimestamp(),
        userId: user.uid,
        email: user.email,
      };
      const orderRef = await addDoc(collection(db, 'orders'), order);
      clearCart();
      router.push(`/orders/${orderRef.id}`);
    } catch (error) {
      console.error('Order placement failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Redirecting to login…</p>;

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold mb-4">Checkout</h1>
        <p className="text-red-600">Your cart is empty. Add items before placing an order.</p>
        <button
          onClick={() => router.push('/cart')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="mb-4">
        {cart.map((item, index) => (
          <li key={index} className="border-b py-2">
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
      <p className="mb-2 font-medium">Total Items: {cart.length}</p>
      <p className="mb-4 font-medium">Total Amount: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded w-full"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}
