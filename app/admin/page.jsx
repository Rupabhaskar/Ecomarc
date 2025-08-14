"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Products from "./Products";
import checkAuth from "../../lib/checkAuth";

function AdminPortal() {
  const [section, setSection] = useState("products");

  const renderSection = () => {
    switch (section) {
      case "products":
        return <Products />;
      case "users":
        return <div>Users Section</div>;
      case "store":
        return <div>Store Info</div>;
      case "employees":
        return <div>Employees Section</div>;
      default:
        return <Products />;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-18">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <nav className="flex space-x-4 mb-4 border-b pb-2">
        <button onClick={() => setSection("products")} className="hover:underline">Products</button>
        <button onClick={() => setSection("users")} className="hover:underline">Users</button>
        <button onClick={() => setSection("store")} className="hover:underline">Store Info</button>
        <button onClick={() => setSection("employees")} className="hover:underline">Employees</button>
      </nav>

      <div>{renderSection()}</div>
    </div>
  );
}

// ✅ Wrap here before exporting
const ProtectedAdminPortal = checkAuth(AdminPortal);
export default ProtectedAdminPortal;



// "use client";

// import checkAuth from "../../lib/checkAuth";
// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../../lib/firebase";
// import Products from "./Products";

// function AdminPortal() {
//   const [section, setSection] = useState("products");

//   const renderSection = () => {
//     switch (section) {
//       case "products":
//         return <Products/>
//       case "users":
//         return <Users />;
//       case "store":
//         return <StoreInfo />;
//       case "employees":
//         return <Employees />;
//       default:
//         return <Products />;
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto mt-18">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Portal</h1>
//         <button
//           onClick={() => signOut(auth)}
//           className="bg-gray-700 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       <nav className="flex space-x-4 mb-4 border-b pb-2">
//         <button onClick={() => setSection("products")} className="hover:underline">Products</button>
//         <button onClick={() => setSection("users")} className="hover:underline">Users</button>
//         <button onClick={() => setSection("store")} className="hover:underline">Store Info</button>
//         <button onClick={() => setSection("employees")} className="hover:underline">Employees</button>
//       </nav>

//       <div>{renderSection()}</div>
//     </div>
//   );
// }

// export default checkAuth(AdminPortal);
