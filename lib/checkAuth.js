// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// export default function checkAuth(Component) {
//   return function ProtectedRoute(props) {
//     const router = useRouter();

//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           router.push("/admin/login");
//         }
//       });
//       return () => unsubscribe();
//     }, [router]);

//     return <Component {...props} />;
//   };
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function checkAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          router.push("/admin/login");
          return;
        }

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (!userDoc.exists() || !userDoc.data().isAdmin) {
            await signOut(auth);
            router.push("/admin/login");
            return;
          }
        } catch (error) {
          console.error(error);
          await signOut(auth);
          router.push("/admin/login");
        } finally {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <p className="text-center mt-10">Checking permissions...</p>;
    }

    return <WrappedComponent {...props} />;
  };
}
