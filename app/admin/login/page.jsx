// // "use client";

// // import { useState } from "react";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../../../lib/firebase";
// // import { useRouter } from "next/navigation";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const router = useRouter();
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       router.push("/admin");
// //     } catch (err) {
// //       setError("Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow mt-20">
// //       <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
// //       <form onSubmit={handleLogin} className="space-y-4">
// //         <input
// //           type="email"
// //           className="w-full p-2 border rounded"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           className="w-full p-2 border rounded"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         {error && <div className="text-red-500 text-sm">{error}</div>}
// //         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../lib/firebase";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // 1️⃣ Sign in
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCred.user;

//       // 2️⃣ Fetch admin flag from Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userDocRef);

//       if (!userSnap.exists()) {
//         throw new Error("No user record found");
//       }

//       const userData = userSnap.data();

//       // 3️⃣ Check if admin
//       if (userData.isAdmin) {
//         router.push("/admin");
//       } else {
//         await auth.signOut();
//         throw new Error("Access denied. Admins only.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-28 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="email"
//           className="w-full p-2 border rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="w-full p-2 border rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <div className="text-red-500 text-sm">{error}</div>}
//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Sign in
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // 2️⃣ Fetch admin flag from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      // 3️⃣ If no user doc → deny access
      if (!userSnap.exists()) {
        await auth.signOut();
        setError("Sorry, you’re not allowed to access this page.");
        return;
      }

      const userData = userSnap.data();

      // 4️⃣ If not admin → deny access
      if (!userData.isAdmin) {
        await auth.signOut();
        setError("Sorry, you’re not allowed to access this page.");
        return;
      }

      // 5️⃣ Admin → redirect
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
