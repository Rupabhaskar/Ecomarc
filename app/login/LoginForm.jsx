// 'use client';

// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { auth } from '../../lib/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get('redirect') || '/';

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setMessage('Login successful!');
//       router.push(redirect);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full border p-2 mb-2"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full border p-2 mb-2"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         onClick={handleLogin}
//       >
//         Login
//       </button>
//       <p className="mt-2 text-sm text-green-700">{message}</p>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '../../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async () => {
    setMessage('');
    if (!email || !password) {
      setMessage('Email and password are required.');
      return;
    }

    try {
      if (isLogin) {
        // Attempt login
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Login successful!');
      } else {
        // Attempt signup
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully!');
      }
      router.push(redirect);
    } catch (error) {
      // Handle errors
      if (
        isLogin &&
        error.code === 'auth/user-not-found'
      ) {
        setMessage('User not found. You can sign up below.');
        setIsLogin(false);
      } else if (error.code === 'auth/email-already-in-use') {
        setMessage('Email already exists. Please login.');
        setIsLogin(true);
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>

      <p className="mt-3 text-sm text-red-600">{message}</p>

      <div className="mt-4 text-center">
        <p className="text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="text-blue-600 underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
