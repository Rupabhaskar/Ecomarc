"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
    quantity: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.imageUrl || !form.quantity) return;

    const newProduct = {
      name: form.name,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
      quantity: parseInt(form.quantity),
    };

    const docRef = await addDoc(collection(db, "products"), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setForm({ name: "", price: "", imageUrl: "", quantity: "" });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: product.quantity,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: form.name,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
      quantity: parseInt(form.quantity),
    };

    await updateDoc(doc(db, "products", editingId), updatedProduct);
    setProducts((prev) =>
      prev.map((p) => (p.id === editingId ? { id: editingId, ...updatedProduct } : p))
    );
    setEditingId(null);
    setForm({ name: "", price: "", imageUrl: "", quantity: "" });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Admin - Manage Products
      </h1>

      {/* Product Form */}
      <form
        onSubmit={editingId ? handleUpdate : handleAddProduct}
        className="mb-6 space-y-3 border p-4 rounded-md bg-white shadow"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded text-sm"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded text-sm"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded text-sm"
          required
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 border rounded text-sm"
          required
        />
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", price: "", imageUrl: "", quantity: "" });
              }}
              className="text-gray-600 text-sm"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-2 rounded bg-white shadow-sm text-sm flex flex-col items-center"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-28 object-cover rounded mb-2"
            />
            <div className="text-center w-full px-1">
              <div className="font-medium text-gray-800 truncate">{p.name}</div>
              <div className="text-gray-600 text-xs">₹{p.price}</div>
              <div className="text-gray-500 text-xs mb-2">Qty: {p.quantity}</div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-2 py-0.5 text-xs rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-2 py-0.5 text-xs rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
