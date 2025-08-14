// 'use client';
// import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from '../../lib/firebase';
// import { CartContext } from '../../utils/cartContext';
// import {
//   addDoc,
//   collection,
//   serverTimestamp,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   query,
//   where
// } from 'firebase/firestore';
// import Image from 'next/image';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cart, clearCart, removeFromCart } = useContext(CartContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     fullName: '',
//     phone: '',
//     street: '',
//     city: '',
//     zip: '',
//   });

//   // Monitor login state
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       if (!u) {
//         router.push('/login?redirect=/checkout');
//       } else {
//         setUser(u);
//         await fetchAddresses(u.uid);
//       }
//     });
//     return () => unsub();
//   }, [router]);

//   const fetchAddresses = async (userId) => {
//     const addressRef = collection(db, 'users', userId, 'addresses');
//     const snapshot = await getDocs(addressRef);
//     const addressList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setAddresses(addressList);
//     const defaultAddr = addressList.find(a => a.isDefault);
//     if (defaultAddr) setSelectedAddressId(defaultAddr.id);
//     else if (addressList.length > 0) setSelectedAddressId(addressList[0].id);
//   };

//   const handleInputChange = (e) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
//   };

//   const saveAddress = async () => {
//     if (!user) return;

//     const addressRef = collection(db, 'users', user.uid, 'addresses');
//     const newDoc = await addDoc(addressRef, {
//       ...newAddress,
//       createdAt: serverTimestamp(),
//     });

//     setNewAddress({
//       fullName: '',
//       phone: '',
//       street: '',
//       city: '',
//       zip: '',
//     });

//     setShowAddressForm(false);
//     await fetchAddresses(user.uid);
//     setSelectedAddressId(newDoc.id);
//   };

//   const editAddress = async (id) => {
//     const toEdit = addresses.find(a => a.id === id);
//     if (toEdit) {
//       setNewAddress(toEdit);
//       setShowAddressForm(true);
//       setSelectedAddressId(id);
//     }
//   };

//   const updateAddress = async () => {
//     if (!user || !selectedAddressId) return;

//     const addressDoc = doc(db, 'users', user.uid, 'addresses', selectedAddressId);
//     await updateDoc(addressDoc, { ...newAddress });
//     setShowAddressForm(false);
//     await fetchAddresses(user.uid);
//   };

//   const deleteAddress = async (id) => {
//     if (!user) return;
//     await deleteDoc(doc(db, 'users', user.uid, 'addresses', id));
//     await fetchAddresses(user.uid);
//   };

//   const placeOrder = async () => {
//     if (!user || cart.length === 0 || !selectedAddressId) return;

//     setLoading(true);
//     try {
//       const selectedAddress = addresses.find(a => a.id === selectedAddressId);
//       const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//       const order = {
//         items: cart,
//         total: totalAmount,
//         totalItems,
//         address: selectedAddress,
//         status: 'Order Placed',
//         createdAt: serverTimestamp(),
//         userId: user.uid,
//         email: user.email,
//       };

//       const orderRef = await addDoc(collection(db, 'orders'), order);
//       clearCart();
//       router.push(`/orders/${orderRef.id}`);
//     } catch (error) {
//       console.error('Order failed:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       {/* Address Section */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Choose Delivery Address</h2>
//         {addresses.length === 0 && <p>No saved addresses. Please add one.</p>}
//         <div className="space-y-3">
//           {addresses.map((addr) => (
//             <div key={addr.id} className={`p-3 border rounded ${selectedAddressId === addr.id ? 'bg-green-100' : 'bg-white'}`}>
//               <label className="flex justify-between items-center">
//                 <input
//                   type="radio"
//                   name="selectedAddress"
//                   checked={selectedAddressId === addr.id}
//                   onChange={() => setSelectedAddressId(addr.id)}
//                   className="mr-2"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{addr.fullName}</p>
//                   <p>{addr.phone}</p>
//                   <p>{addr.street}, {addr.city} - {addr.zip}</p>
//                 </div>
//               </label>
//               <div className="mt-2 flex space-x-4">
//                 <button className="text-blue-600" onClick={() => editAddress(addr.id)}>Edit</button>
//                 <button className="text-red-600" onClick={() => deleteAddress(addr.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Toggle Address Form */}
//         <div className="mt-4">
//           <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-purple-700 underline">
//             {showAddressForm ? 'Cancel' : 'Add New Address'}
//           </button>
//         </div>

//         {/* Address Form */}
//         {showAddressForm && (
//           <div className="mt-4 p-4 border rounded bg-gray-50 space-y-3">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={newAddress.fullName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={newAddress.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="street"
//               placeholder="Street"
//               value={newAddress.street}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={newAddress.city}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="zip"
//               placeholder="ZIP"
//               value={newAddress.zip}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <button
//               onClick={selectedAddressId && newAddress.id ? updateAddress : saveAddress}
//               className="bg-green-600 text-white px-4 py-2 rounded w-full"
//             >
//               {selectedAddressId && newAddress.id ? 'Update Address' : 'Save Address'}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Cart Items */}
//       <div className="space-y-4 mb-6">
//         {cart.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between border p-3 rounded bg-white shadow-sm"
//           >
//             <div className="flex items-center space-x-4">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.name}
//                 width={80}
//                 height={80}
//                 className="rounded object-cover"
//               />
//               <div>
//                 <p className="font-semibold">{item.name}</p>
//                 <p>₹{item.price} × {item.quantity}</p>
//                 <p className="text-sm text-gray-600">Subtotal: ₹{item.price * item.quantity}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-600 hover:text-red-800 font-semibold"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Order Summary */}
//       <div className="bg-gray-100 p-4 rounded shadow">
//         <p className="mb-1 font-medium">Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
//         <p className="mb-3 font-medium">Total Amount: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

//         <button
//           className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded w-full disabled:bg-gray-400"
//           onClick={placeOrder}
//           disabled={loading || !selectedAddressId}
//         >
//           {loading ? 'Placing Order...' : 'Place Order'}
//         </button>
//       </div>
//     </div>
//   );
// }



'use client';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { CartContext } from '../../utils/cartContext';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push('/login?redirect=/checkout');
      } else {
        setUser(u);
        await fetchAddresses(u.uid);
      }
    });
    return () => unsub();
  }, [router]);

  const fetchAddresses = async (userId) => {
    const addressRef = collection(db, 'users', userId, 'addresses');
    const snapshot = await getDocs(addressRef);
    const addressList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAddresses(addressList);
    const defaultAddr = addressList.find(a => a.isDefault);
    if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    else if (addressList.length > 0) setSelectedAddressId(addressList[0].id);
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    if (!user) return;
    const addressRef = collection(db, 'users', user.uid, 'addresses');
    const newDoc = await addDoc(addressRef, {
      ...newAddress,
      createdAt: serverTimestamp(),
    });
    setNewAddress({ fullName: '', phone: '', street: '', city: '', zip: '' });
    setShowAddressForm(false);
    await fetchAddresses(user.uid);
    setSelectedAddressId(newDoc.id);
  };

  const updateAddress = async () => {
    if (!user || !selectedAddressId) return;
    const addressDoc = doc(db, 'users', user.uid, 'addresses', selectedAddressId);
    await updateDoc(addressDoc, { ...newAddress });
    setShowAddressForm(false);
    await fetchAddresses(user.uid);
  };

  const deleteAddress = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'addresses', id));
    await fetchAddresses(user.uid);
  };

  const placeOrder = async () => {
    if (!user || cart.length === 0 || !selectedAddressId) return;
    setLoading(true);
    try {
      const selectedAddress = addresses.find(a => a.id === selectedAddressId);
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const order = {
        items: cart,
        total: totalAmount,
        totalItems,
        address: selectedAddress,
        status: 'Order Placed',
        createdAt: serverTimestamp(),
        userId: user.uid,
        email: user.email,
      };
      const orderRef = await addDoc(collection(db, 'orders'), order);
      clearCart();
      router.push(`/orders/${orderRef.id}`);
    } catch (error) {
      console.error('Order failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto mt-18">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

      {/* Address Section */}
      <section className="mb-10 bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Choose Delivery Address</h2>

        {addresses.length === 0 && <p className="text-gray-500 mb-4">No saved addresses. Please add one.</p>}

        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 border rounded-lg transition ${
                selectedAddressId === addr.id ? 'bg-green-50 border-green-400' : 'bg-gray-50'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-semibold">{addr.fullName}</p>
                  <p className="text-gray-600">{addr.phone}</p>
                  <p className="text-gray-600">{addr.street}, {addr.city} - {addr.zip}</p>
                </div>
              </label>
              <div className="mt-3 flex gap-4 text-sm">
                <button className="text-blue-600 hover:underline" onClick={() => {
                  setNewAddress(addr);
                  setShowAddressForm(true);
                  setSelectedAddressId(addr.id);
                }}>
                  Edit
                </button>
                <button className="text-red-600 hover:underline" onClick={() => deleteAddress(addr.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button
            onClick={() => {
              setShowAddressForm(!showAddressForm);
              setNewAddress({ fullName: '', phone: '', street: '', city: '', zip: '' });
            }}
            className="text-purple-700 hover:underline font-medium"
          >
            {showAddressForm ? 'Cancel' : 'Add New Address'}
          </button>
        </div>

        {showAddressForm && (
          <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg border">
            {['fullName', 'phone', 'street', 'city', 'zip'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/^\w/, c => c.toUpperCase())}
                value={newAddress[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ))}
            <button
              onClick={newAddress.id ? updateAddress : saveAddress}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
            >
              {newAddress.id ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        )}
      </section>

      {/* Cart Items */}
      <section className="mb-10">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  <p className="text-sm text-gray-500">Subtotal: ₹{item.price * item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Summary */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <p className="mb-2 font-medium">Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
        <p className="mb-4 font-semibold text-lg">Total Amount: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg w-full transition disabled:bg-gray-400"
          onClick={placeOrder}
          disabled={loading || !selectedAddressId}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </section>
    </div>
  );
}
