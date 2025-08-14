// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import { db } from '../../../lib/firebase';
// // import { doc, getDoc } from 'firebase/firestore';

// // export default function OrderDetailPage() {
// //   const { id } = useParams();
// //   const [order, setOrder] = useState(null);

// //   useEffect(() => {
// //     const fetchOrder = async () => {
// //       const docRef = doc(db, 'orders', id);
// //       const docSnap = await getDoc(docRef);
// //       if (docSnap.exists()) {
// //         setOrder(docSnap.data());
// //       }
// //     };
// //     fetchOrder();
// //   }, [id]);

// //   if (!order) return <p>Loading...</p>;

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-xl font-bold">Order Status</h1>
// //       <p className="mt-2">Order ID: {id}</p>
// //       <p>Status: {order.status}</p>
// //       <p>Total: ₹{order.total}</p>
// //       <h2 className="mt-4 font-semibold">Items:</h2>
// //       <ul className="list-disc ml-6">
// //         {order.items.map((item, index) => (
// //           <li key={index}>{item.name} - ₹{item.price}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { db } from '../../../lib/firebase';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';

// export default function OrderDetailPage() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [canceling, setCanceling] = useState(false);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const docRef = doc(db, 'orders', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setOrder({ id: docSnap.id, ...docSnap.data() });
//       }
//       setLoading(false);
//     };
//     fetchOrder();
//   }, [id]);

//   const handleCancelOrder = async () => {
//     const confirmCancel = confirm('Are you sure you want to cancel this order?');
//     if (!confirmCancel) return;

//     setCanceling(true);
//     try {
//       const orderRef = doc(db, 'orders', id);
//       await updateDoc(orderRef, { status: 'Cancelled' });
//       setOrder({ ...order, status: 'Cancelled' });
//     } catch (err) {
//       console.error('Error cancelling order:', err);
//     } finally {
//       setCanceling(false);
//     }
//   };

//   if (loading) return <p className="p-8">Loading...</p>;
//   if (!order) return <p className="p-8">Order not found.</p>;

//   const statusColor = order.status === 'Cancelled' ? 'text-red-600' :
//                       order.status === 'Delivered' ? 'text-green-600' :
//                       'text-yellow-500';

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Order Details</h1>
//       <p className="text-sm text-gray-500 mb-2">Order ID: {order.id}</p>
//       <p className={`font-medium mb-4 ${statusColor}`}>Status: {order.status}</p>

//       <h2 className="text-xl font-semibold mb-2">Items:</h2>
//       <div className="grid gap-4">
//         {order.items.map((item, index) => (
//           <div key={index} className="flex items-center border rounded-lg p-4 bg-white shadow">
//             <img
//               src={item.imageUrl || '/placeholder.png'}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded mr-4"
//             />
//             <div className="flex-1">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-sm text-gray-600">₹{item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <p className="mt-6 font-bold text-lg">Total: ₹{order.total}</p>

//       <button
//         onClick={handleCancelOrder}
//         disabled={order.status === 'Cancelled' || canceling}
//         className={`mt-6 px-4 py-2 rounded ${
//           order.status === 'Cancelled'
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-red-500 hover:bg-red-600 text-white'
//         }`}
//       >
//         {canceling ? 'Cancelling...' : order.status === 'Cancelled' ? 'Order Cancelled' : 'Cancel Order'}
//       </button>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    setCanceling(true);
    try {
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, { status: 'Cancelled' });
      setOrder((prev) => ({ ...prev, status: 'Cancelled' }));
    } catch (err) {
      console.error('Error cancelling order:', err);
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return <p className="p-8 text-center text-gray-500 animate-pulse">Loading order details…</p>;
  }

  if (!order) {
    return <p className="p-8 text-center text-gray-500">Order not found.</p>;
  }

  const statusStyles = {
    Cancelled: 'bg-red-100 text-red-600',
    Delivered: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Shipped: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto mt-24">
      {/* Back link */}
      <Link href="/orders" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Orders
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">Order Details</h1>
        <p className="text-sm text-gray-500 mb-2">Order ID: {order.id}</p>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
            statusStyles[order.status] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {order.status}
        </span>

        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="grid gap-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src={item.imageUrl || '/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-bold text-lg">Total: ₹{order.total}</p>

        <button
          onClick={handleCancelOrder}
          disabled={order.status === 'Cancelled' || canceling}
          className={`mt-6 w-full sm:w-auto px-6 py-2 rounded-lg text-sm font-medium transition ${
            order.status === 'Cancelled'
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {canceling
            ? 'Cancelling...'
            : order.status === 'Cancelled'
            ? 'Order Cancelled'
            : 'Cancel Order'}
        </button>
      </div>
    </div>
  );
}
