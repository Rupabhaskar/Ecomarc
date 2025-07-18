// // 'use client';
// // import { useState } from 'react';
// // import { auth } from '../../lib/firebase';
// // import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// // export default function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isSignup, setIsSignup] = useState(false);
// //   const [message, setMessage] = useState('');

// //   const handleAuth = async () => {
// //     try {
// //       if (isSignup) {
// //         await createUserWithEmailAndPassword(auth, email, password);
// //         setMessage('Signup successful!');
// //       } else {
// //         await signInWithEmailAndPassword(auth, email, password);
// //         setMessage('Login successful!');
// //       }
// //     } catch (error) {
// //       setMessage(error.message);
// //     }
// //   };

// //   return (
// //     <div className="p-8 max-w-md mx-auto">
// //       <h1 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>
// //       <input
// //         type="email"
// //         placeholder="Email"
// //         className="w-full border p-2 mb-2"
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         className="w-full border p-2 mb-2"
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <button
// //         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// //         onClick={handleAuth}
// //       >
// //         {isSignup ? 'Sign Up' : 'Login'}
// //       </button>
// //       <p className="mt-2 text-sm text-green-700">{message}</p>
// //       <p className="mt-4 text-sm text-gray-600 cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
// //         {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
// //       </p>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { auth } from '../../lib/firebase';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(false);
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get('redirect') || '/';

//   const handleAuth = async () => {
//     try {
//       if (isSignup) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         setMessage('Signup successful!');
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         setMessage('Login successful!');
//       }

//       setTimeout(() => {
//         router.push(redirect);
//       }, 1000);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h1 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full border p-2 mb-2"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full border p-2 mb-2"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         onClick={handleAuth}
//       >
//         {isSignup ? 'Sign Up' : 'Login'}
//       </button>
//       <p className="mt-2 text-sm text-green-700">{message}</p>
//       <p
//         className="mt-4 text-sm text-gray-600 cursor-pointer"
//         onClick={() => setIsSignup(!isSignup)}
//       >
//         {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
//       </p>
//     </div>
//   );
// }




// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { auth } from '../../lib/firebase';
// // import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// // export default function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isSignup, setIsSignup] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const redirect = searchParams.get('redirect') || '/';

// //   const handleAuth = async () => {
// //     try {
// //       if (isSignup) {
// //         await createUserWithEmailAndPassword(auth, email, password);
// //         setMessage('Signup successful!');
// //       } else {
// //         await signInWithEmailAndPassword(auth, email, password);
// //         setMessage('Login successful!');
// //       }

// //       setTimeout(() => {
// //         router.push(redirect);
// //       }, 1000); // Optional delay to show message
// //     } catch (error) {
// //       setMessage(error.message);
// //     }
// //   };

// //   return (
// //     <div className="p-8 max-w-md mx-auto">
// //       <h1 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>
// //       <input
// //         type="email"
// //         placeholder="Email"
// //         className="w-full border p-2 mb-2"
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         className="w-full border p-2 mb-2"
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <button
// //         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// //         onClick={handleAuth}
// //       >
// //         {isSignup ? 'Sign Up' : 'Login'}
// //       </button>
// //       <p className="mt-2 text-sm text-green-700">{message}</p>
// //       <p className="mt-4 text-sm text-gray-600 cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
// //         {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
// //       </p>
// //     </div>
// //   );
// // }

import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading login form...</p>}>
      <LoginForm />
    </Suspense>
  );
}
