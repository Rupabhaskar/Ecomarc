// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { db, auth } from '../../lib/firebase';
// // import {
// //   collection,
// //   query,
// //   where,
// //   getDocs,
// //   updateDoc,
// //   doc,
// // } from 'firebase/firestore';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import Link from 'next/link';

// // export default function OrdersPage() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const unsub = onAuthStateChanged(auth, async (u) => {
// //       if (u) {
// //         setUser(u);
// //         const q = query(collection(db, 'orders'), where('userId', '==', u.uid));
// //         const snap = await getDocs(q);
// //         setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
// //       } else {
// //         setOrders([]);
// //       }
// //       setLoading(false);
// //     });
// //     return () => unsub();
// //   }, []);

// //   const cancelOrder = async (orderId) => {
// //     const confirm = window.confirm('Are you sure you want to cancel this order?');
// //     if (!confirm) return;

// //     await updateDoc(doc(db, 'orders', orderId), {
// //       status: 'Cancelled',
// //     });

// //     setOrders(prev =>
// //       prev.map(order =>
// //         order.id === orderId ? { ...order, status: 'Cancelled' } : order
// //       )
// //     );
// //   };

// //   if (loading) return <p className="p-8 text-lg">Loading your orders…</p>;
// //   if (!orders.length) return <p className="p-8 text-lg">No orders yet.</p>;

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
// //       <div className="space-y-6">
// //         {orders.map((order) => (
// //           <div
// //             key={order.id}
// //             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
// //           >
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <p className="text-gray-700">Order ID: <span className="font-semibold">{order.id}</span></p>
// //                 <p>Status: <span className={`font-medium ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>{order.status}</span></p>
// //                 <p>Total: ₹{order.total}</p>
// //               </div>
// //               {order.status !== 'Cancelled' && (
// //                 <button
// //                   onClick={() => cancelOrder(order.id)}
// //                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
// //                 >
// //                   Cancel Order
// //                 </button>
// //               )}
// //             </div>

// //             <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
// //               {order.items?.map((item, idx) => (
// //                 <div key={idx} className="border rounded p-2 flex flex-col items-center">
// //                   <img
// //                     src={item.imageUrl || '/placeholder.png'}
// //                     alt={item.name}
// //                     className="w-24 h-24 object-cover rounded"
// //                   />
// //                   <p className="text-sm mt-2">{item.name}</p>
// //                   <p className="text-sm font-semibold">₹{item.price}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             <Link
// //               href={`/orders/${order.id}`}
// //               className="inline-block mt-4 text-blue-600 hover:underline"
// //             >
// //               View Details →
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


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
// } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       if (u) {
//         const q = query(collection(db, 'orders'), where('userId', '==', u.uid));
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
//     if (!window.confirm('Are you sure you want to cancel this order?')) return;
//     await updateDoc(doc(db, 'orders', orderId), { status: 'Cancelled' });
//     setOrders(prev =>
//       prev.map(order =>
//         order.id === orderId ? { ...order, status: 'Cancelled' } : order
//       )
//     );
//   };

//   if (loading) {
//     return <p className="p-8 text-lg text-center text-gray-500 animate-pulse">Loading your orders…</p>;
//   }

//   if (!orders.length) {
//     return <p className="p-8 text-lg text-center text-gray-500">You have no orders yet.</p>;
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-8">Your Orders</h1>

//       <div className="space-y-8">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
//           >
//             {/* Order Summary */}
//             <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Order ID</p>
//                 <p className="font-semibold break-all text-gray-800">{order.id}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     order.status === 'Cancelled'
//                       ? 'bg-red-100 text-red-600'
//                       : 'bg-green-100 text-green-700'
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//                 <p className="text-sm sm:text-base font-medium text-gray-800">
//                   Total: ₹{order.total}
//                 </p>
//                 {order.status !== 'Cancelled' && (
//                   <button
//                     onClick={() => cancelOrder(order.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="p-4 sm:p-6">
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
//                 {order.items?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-50 rounded-lg p-3 flex flex-col items-center hover:bg-gray-100 transition"
//                   >
//                     <div className="relative w-24 h-24">
//                       <Image
//                         src={item.imageUrl || '/placeholder.png'}
//                         alt={item.name}
//                         fill
//                         className="object-cover rounded-md"
//                       />
//                     </div>
//                     <p className="text-xs sm:text-sm mt-2 font-medium text-gray-700 text-center">
//                       {item.name}
//                     </p>
//                     <p className="text-xs sm:text-sm font-semibold text-gray-900">
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* View Details */}
//               <div className="mt-6">
//                 <Link
//                   href={`/orders/${order.id}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
//                 >
//                   View Details →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        // 🔹 Redirect to login if not logged in
        router.push('/login');
        return;
      }

      // 🔹 Fetch orders for logged-in user
      const q = query(collection(db, 'orders'), where('userId', '==', u.uid));
      const snap = await getDocs(q);
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    await updateDoc(doc(db, 'orders', orderId), { status: 'Cancelled' });
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
  };

  if (loading) {
    return <p className="p-8 text-lg text-center text-gray-500 animate-pulse">Loading your orders…</p>;
  }

  if (!orders.length) {
    return <p className="p-8 text-lg text-center text-gray-500">You have no orders yet.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Order Summary */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold break-all text-gray-800">{order.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Cancelled'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  Total: ₹{order.total}
                </p>
                {order.status !== 'Cancelled' && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-3 flex flex-col items-center hover:bg-gray-100 transition"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.imageUrl || '/placeholder.png'}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <p className="text-xs sm:text-sm mt-2 font-medium text-gray-700 text-center">
                      {item.name}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <div className="mt-6">
                <Link
                  href={`/orders/${order.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
