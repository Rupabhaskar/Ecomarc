// 'use client';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-600 text-white text-center py-4 mt-10">
//       <div className="container mx-auto">
//         <p className="text-sm">
//           &copy; {new Date().getFullYear()} VavePro — All rights reserved.
//         </p>
//         <div className="mt-2">
//           <a href="/privacy" className="text-white hover:underline mx-2">Privacy</a>
//           <a href="/terms" className="text-white hover:underline mx-2">Terms</a>
//           <a href="/contact" className="text-white hover:underline mx-2">Contact</a>
//         </div>
//       </div>
//     </footer>
//   );
// }




'use client';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-700">
        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Careers</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Press</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Help</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition">Payments</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Shipping</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Cancellation</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Consumer Policy</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition">Return Policy</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Security</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Privacy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-500 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition"><Youtube size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 mt-6 text-center text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} ShopX. All rights reserved. | Designed with ❤️
      </div>
    </footer>
  );
}
