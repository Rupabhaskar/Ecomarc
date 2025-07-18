// 'use client';
// import { useContext } from 'react';
// import { CartContext } from '../../utils/cartContext';
// import Link from 'next/link';

// export default function CartPage() {
//   const { cart, removeFromCart } = useContext(CartContext);

//   const total = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div className="p-8">
//       <h1 className="text-xl font-bold mb-4">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div key={item.id} className="mb-4 border-b pb-2 flex justify-between">
//               <div>
//                 <p>{item.name}</p>
//                 <p>₹{item.price}</p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <p className="mt-4 font-semibold">Total: ₹{total}</p>
//           <Link href="/checkout">
//             <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
//               Proceed to Checkout
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';
import { useContext } from 'react';
import { CartContext } from '../../utils/cartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 border-b pb-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 bg-gray-100">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="mt-1">Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="mt-4 font-bold">Total: ₹{total}</p>
          <Link href="/checkout">
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
