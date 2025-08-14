// // 'use client';
// // import { useContext } from 'react';
// // import { CartContext } from '../../utils/cartContext';
// // import Link from 'next/link';

// // export default function CartPage() {
// //   const { cart, removeFromCart } = useContext(CartContext);

// //   const total = cart.reduce((sum, item) => sum + item.price, 0);

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-xl font-bold mb-4">Your Cart</h1>
// //       {cart.length === 0 ? (
// //         <p>No items in cart.</p>
// //       ) : (
// //         <div>
// //           {cart.map((item) => (
// //             <div key={item.id} className="mb-4 border-b pb-2 flex justify-between">
// //               <div>
// //                 <p>{item.name}</p>
// //                 <p>₹{item.price}</p>
// //               </div>
// //               <button
// //                 onClick={() => removeFromCart(item.id)}
// //                 className="text-red-500"
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}
// //           <p className="mt-4 font-semibold">Total: ₹{total}</p>
// //           <Link href="/checkout">
// //             <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
// //               Proceed to Checkout
// //             </button>
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// 'use client';
// import { useContext } from 'react';
// import { CartContext } from '../../utils/cartContext';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function CartPage() {
//   const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-4"
//             >
//               <div className="flex items-center gap-4 w-full md:w-2/3">
//                 <div className="w-24 h-24 relative">
//                   <Image
//                     src={item.imageUrl || '/fallback.jpg'}
//                     alt={item.name}
//                     fill
//                     className="object-cover rounded"
//                     unoptimized
//                   />
//                 </div>
//                 <div>
//                   <p className="text-lg font-medium">{item.name}</p>
//                   <p className="text-gray-600">Price: ₹{item.price}</p>
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => decreaseQty(item.id)}
//                       className="px-3 py-1 bg-gray-300 rounded-l text-lg"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-1 bg-gray-100 text-lg">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQty(item.id)}
//                       className="px-3 py-1 bg-gray-300 rounded-r text-lg"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="mt-1 text-sm">Subtotal: ₹{item.price * item.quantity}</p>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 font-semibold"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="mt-6 text-right">
//             <p className="text-xl font-bold">Total: ₹{total}</p>
//             <Link href="/checkout">
//               <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition">
//                 Proceed to Checkout
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';
import { useContext } from 'react';
import { CartContext } from '../../utils/cartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto mt-18">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center py-20">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex-shrink-0">
                  <Image
                    src={item.imageUrl || '/fallback.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg sm:text-xl font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600 mt-1">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-3 border rounded-lg overflow-hidden w-max">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 sm:px-4 py-1 bg-gray-200 hover:bg-gray-300 transition text-lg"
                    >
                      -
                    </button>
                    <span className="px-4 sm:px-5 py-1 bg-gray-100 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 sm:px-4 py-1 bg-gray-200 hover:bg-gray-300 transition text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <div className="mt-4 md:mt-0 text-right">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-semibold hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="mt-6 md:mt-8 text-right">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">Total: ₹{total}</p>
            <Link href="/checkout">
              <button className="mt-4 sm:mt-6 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
