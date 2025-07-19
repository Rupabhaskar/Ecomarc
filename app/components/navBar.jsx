// 'use client';
// import Link from 'next/link';
// import { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../../utils/cartContext';
// import { auth } from '../../lib/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const { cart } = useContext(CartContext);
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/?search=${searchQuery}`);
//     }
//   };

//   return (
//     <nav className="bg-white shadow px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50">
//       <div className="flex items-center gap-4 w-full md:w-auto">
//         <Link href="/" className="text-xl font-bold text-blue-600">
//           🛒 ShopX
//         </Link>

//         <form onSubmit={handleSearch} className="flex items-center w-full md:w-64">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border px-3 py-1 w-full rounded-l"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-3 py-1 rounded-r"
//           >
//             🔍
//           </button>
//         </form>
//       </div>

//       <div className="space-x-4 flex items-center">
//         <Link href="/" className="hover:underline">
//           Home
//         </Link>
//         <Link href="/cart" className="relative hover:underline">
//           Cart
//           {cart.length > 0 && (
//             <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//               {cart.length}
//             </span>
//           )}
//         </Link>
//         <Link href="/orders" className="hover:underline">
//           Orders
//         </Link>

//         {user ? (
//           <>
//             <span className="text-sm text-gray-600 hidden sm:inline">Hi, {user.email}</span>
//             <button
//               onClick={handleLogout}
//               className="ml-2 text-sm bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }


'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../utils/cartContext';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Hamburger and Close Icons

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${searchQuery}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 px-6 py-4 shadow transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛒 ShopX
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex items-center border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 outline-none w-48"
            />
            <button type="submit" className="bg-blue-500 text-white px-3">
              🔍
            </button>
          </form>

          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/cart" className="relative hover:underline">
            Cart
            {cart.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/orders" className="hover:underline">Orders</Link>

          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden lg:inline">Hi, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col mt-4 md:hidden space-y-4">
          <form onSubmit={handleSearch} className="flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-1 outline-none"
            />
            <button type="submit" className="bg-blue-500 text-white px-3">
              🔍
            </button>
          </form>

          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="relative">
            Cart
            {cart.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link>

          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
