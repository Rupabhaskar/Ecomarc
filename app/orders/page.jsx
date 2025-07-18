// 'use client';
// import { useEffect, useState } from 'react';
// import { db, auth } from '../../lib/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import Link from 'next/link';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       if (u) {
//         const q = query(
//           collection(db, 'orders'),
//           where('userId', '==', u.uid)
//         );
//         const snap = await getDocs(q);
//         setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       } else {
//         setOrders([]);
//       }
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   if (loading) return <p>Loading your orders…</p>;

//   if (!orders.length) return <p>No orders yet.</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-xl font-bold mb-4">Your Orders</h1>
//       {orders.map((order) => (
//         <Link key={order.id} href={`/orders/${order.id}`}>
//           <div className="border p-4 mb-4 rounded hover:bg-gray-100">
//             <p>Order ID: {order.id}</p>
//             <p>Status: {order.status}</p>
//             <p>Total: ₹{order.total}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { db, auth } from '../../lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const q = query(collection(db, 'orders'), where('userId', '==', u.uid));
        const snap = await getDocs(q);
        setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setOrders([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const cancelOrder = async (orderId) => {
    const confirm = window.confirm('Are you sure you want to cancel this order?');
    if (!confirm) return;

    await updateDoc(doc(db, 'orders', orderId), {
      status: 'Cancelled',
    });

    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
  };

  if (loading) return <p className="p-8 text-lg">Loading your orders…</p>;
  if (!orders.length) return <p className="p-8 text-lg">No orders yet.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700">Order ID: <span className="font-semibold">{order.id}</span></p>
                <p>Status: <span className={`font-medium ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>{order.status}</span></p>
                <p>Total: ₹{order.total}</p>
              </div>
              {order.status !== 'Cancelled' && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="border rounded p-2 flex flex-col items-center">
                  <img
                    src={item.imageUrl || '/placeholder.png'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <p className="text-sm mt-2">{item.name}</p>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/orders/${order.id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}



// 'use client';
// import { useEffect, useState } from 'react';
// import { db, auth } from '../../lib/firebase';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   doc,
//   orderBy
// } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import Link from 'next/link';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       if (u) {
//         setUser(u);
//         const q = query(
//           collection(db, 'orders'),
//           where('userId', '==', u.uid),
//           orderBy('createdAt', 'desc') // 🟢 Sort by most recent
//         );
//         const snap = await getDocs(q);
//         setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       } else {
//         setOrders([]);
//       }
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const cancelOrder = async (orderId) => {
//     const confirm = window.confirm('Are you sure you want to cancel this order?');
//     if (!confirm) return;

//     await updateDoc(doc(db, 'orders', orderId), {
//       status: 'Cancelled',
//     });

//     setOrders(prev =>
//       prev.map(order =>
//         order.id === orderId ? { ...order, status: 'Cancelled' } : order
//       )
//     );
//   };

//   if (loading) return <p className="p-8 text-lg">Loading your orders…</p>;
//   if (!orders.length) return <p className="p-8 text-lg">No orders yet.</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-700">
//                   Order ID: <span className="font-semibold">{order.id}</span>
//                 </p>
//                 <p>
//                   Status:{' '}
//                   <span className={`font-medium ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>
//                     {order.status}
//                   </span>
//                 </p>
//                 <p>Total: ₹{order.total}</p>
//               </div>
//               {order.status !== 'Cancelled' && (
//                 <button
//                   onClick={() => cancelOrder(order.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>

//             <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//               {order.items?.map((item, idx) => (
//                 <div key={idx} className="border rounded p-2 flex flex-col items-center">
//                   <img
//                     src={item.imageUrl || '/placeholder.png'}
//                     alt={item.name}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <p className="text-sm mt-2">{item.name}</p>
//                   <p className="text-sm font-semibold">₹{item.price}</p>
//                 </div>
//               ))}
//             </div>

//             <Link
//               href={`/orders/${order.id}`}
//               className="inline-block mt-4 text-blue-600 hover:underline"
//             >
//               View Details →
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }