'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white text-center py-4 mt-10">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} VavePro — All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy" className="text-white hover:underline mx-2">Privacy</a>
          <a href="/terms" className="text-white hover:underline mx-2">Terms</a>
          <a href="/contact" className="text-white hover:underline mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
}
