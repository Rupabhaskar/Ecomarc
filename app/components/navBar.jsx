// // 'use client';
// // import Link from 'next/link';
// // import { useContext, useEffect, useState } from 'react';
// // import { CartContext } from '../../utils/cartContext';
// // import { auth } from '../../lib/firebase';
// // import { onAuthStateChanged, signOut } from 'firebase/auth';
// // import { useRouter } from 'next/navigation';
// // import { Menu, X } from 'lucide-react'; // Hamburger and Close Icons

// // export default function Navbar() {
// //   const { cart } = useContext(CartContext);
// //   const [user, setUser] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   const handleLogout = async () => {
// //     await signOut(auth);
// //     setUser(null);
// //     setIsMenuOpen(false);
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       router.push(`/?search=${searchQuery}`);
// //       setSearchQuery('');
// //       setIsMenuOpen(false);
// //     }
// //   };

// //   return (
// //     <nav className="bg-white fixed top-0 left-0 right-0 z-50 px-6 py-4 shadow transition-all duration-300">
// //       <div className="flex items-center justify-between">
// //         {/* Logo */}
// //         <Link href="/" className="text-xl font-bold text-blue-600">
// //           🛒 ShopX
// //         </Link>

// //         {/* Hamburger icon for mobile */}
// //         <button
// //           onClick={() => setIsMenuOpen(!isMenuOpen)}
// //           className="md:hidden text-gray-700"
// //         >
// //           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //         </button>

// //         {/* Desktop Menu */}
// //         <div className="hidden md:flex items-center gap-6">
// //           <form onSubmit={handleSearch} className="flex items-center border rounded overflow-hidden">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="px-3 py-1 outline-none w-48"
// //             />
// //             <button type="submit" className="bg-blue-500 text-white px-3">
// //               🔍
// //             </button>
// //           </form>

// //           <Link href="/" className="hover:underline">Home</Link>
// //           <Link href="/cart" className="relative hover:underline">
// //             Cart
// //             {cart.length > 0 && (
// //               <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
// //                 {cart.length}
// //               </span>
// //             )}
// //           </Link>
// //           <Link href="/orders" className="hover:underline">Orders</Link>

// //           {user ? (
// //             <>
// //               <span className="text-sm text-gray-600 hidden lg:inline">Hi, {user.email}</span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-red-500 text-white px-3 py-1 rounded text-sm"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isMenuOpen && (
// //         <div className="flex flex-col mt-4 md:hidden space-y-4">
// //           <form onSubmit={handleSearch} className="flex border rounded overflow-hidden">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="flex-1 px-3 py-1 outline-none"
// //             />
// //             <button type="submit" className="bg-blue-500 text-white px-3">
// //               🔍
// //             </button>
// //           </form>

// //           <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
// //           <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="relative">
// //             Cart
// //             {cart.length > 0 && (
// //               <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
// //                 {cart.length}
// //               </span>
// //             )}
// //           </Link>
// //           <Link href="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link>

// //           {user ? (
// //             <>
// //               <span className="text-sm text-gray-600">Hi, {user.email}</span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-red-500 text-white px-3 py-1 rounded text-sm"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       )}
// //     </nav>
// //   );
// // }






// 'use client';
// import Link from 'next/link';
// import { useContext, useEffect, useState } from 'react';
// import { CartContext } from '../../utils/cartContext';
// import { auth } from '../../lib/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { Menu, X } from 'lucide-react';

// export default function Navbar() {
//   const { cart } = useContext(CartContext);
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const router = useRouter();

//   // Detect auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Shadow change on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 5);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//     setIsMenuOpen(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/?search=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//       setIsMenuOpen(false);
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
//       }`}
//     >
//       <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 tracking-wide">
//           🛒 ShopX
//         </Link>

//         {/* Hamburger - Mobile */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden text-gray-700 p-1"
//         >
//           {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400"
//           >
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="px-3 py-1 outline-none w-52 lg:w-64 text-sm"
//             />
//             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1">
//               🔍
//             </button>
//           </form>

//           <Link href="/" className="hover:text-blue-600 transition">Home</Link>
//           <Link href="/cart" className="relative hover:text-blue-600 transition">
//             Cart
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </Link>
//           <Link href="/orders" className="hover:text-blue-600 transition">Orders</Link>

//           {user ? (
//             <>
//               <span className="text-sm text-gray-600 hidden xl:inline">Hi, {user.email}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               href="/login"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-4 animate-slideDown">
//           <form
//             onSubmit={handleSearch}
//             className="flex border rounded-lg overflow-hidden"
//           >
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 px-3 py-1 outline-none"
//             />
//             <button type="submit" className="bg-blue-500 text-white px-3 py-1">
//               🔍
//             </button>
//           </form>

//           <Link href="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-600">Home</Link>
//           <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="block relative hover:text-blue-600">
//             Cart
//             {cart.length > 0 && (
//               <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </Link>
//           <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-600">Orders</Link>

//           {user ? (
//             <>
//               <span className="text-sm text-gray-600">Hi, {user.email}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               href="/login"
//               onClick={() => setIsMenuOpen(false)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm w-full text-center block"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out forwards;
//         }
//       `}</style>
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
import { Menu, X, Search, Home, MessageCircle, ShoppingCart, PackageCheck } from 'lucide-react';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white' : 'bg-pink-500'}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-black md:text-white">
          🛍️ ShopX
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <form onSubmit={handleSearch} className="flex w-full max-w-lg bg-white rounded-full overflow-hidden shadow-sm focus-within:ring-2 ring-pink-500">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 outline-none text-gray-800"
            />
            <button type="submit" className="bg-pink-500 px-3 text-white flex items-center justify-center">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-pink-300 transition">
            <Home size={18} /> Home
          </Link>
          <Link href="/cart" className="flex items-center gap-1 relative hover:text-pink-300 transition">
            <ShoppingCart size={18} /> Cart
            {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
          </Link>
          <Link href="/orders" className="flex items-center gap-1 hover:text-pink-300 transition">
            <PackageCheck size={18} /> Orders
          </Link>
          {user ? (
            <>
              <span className="hidden lg:inline text-sm text-gray-800">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-pink-500 text-white overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 py-4 px-4' : 'max-h-0'}`}>
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="flex w-full bg-white rounded-full overflow-hidden shadow-sm mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none text-gray-800"
          />
          <button type="submit" className="bg-pink-500 px-3 flex items-center justify-center text-white">
            <Search size={16} />
          </button>
        </form>

        {/* Links */}
        <Link href="/" className="flex items-center gap-2 py-2 hover:text-pink-300 transition">
          <Home size={18} /> Home
        </Link>
        <Link href="/cart" className="flex items-center gap-2 py-2 relative hover:text-pink-300 transition">
          <ShoppingCart size={18} /> Cart
          {cart.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
        </Link>
        <Link href="/orders" className="flex items-center gap-2 py-2 hover:text-pink-300 transition">
          <PackageCheck size={18} /> Orders
        </Link>
        {user ? (
          <>
            <span className="text-sm text-gray-200 py-2">{user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full text-center">Logout</button>
          </>
        ) : (
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full text-center block mt-2">Login</Link>
        )}
      </div>
    </header>
  );
}
