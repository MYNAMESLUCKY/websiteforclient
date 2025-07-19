import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { fetchProducts } from '../api/products';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', description: '', price: '', priceINR: '', image: '' });
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null); // product id or null
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(tokenResult => {
        setIsAdmin(!!tokenResult.claims.admin);
      });
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts().then(setProducts);
      fetchEnquiries();
    }
  }, [isAdmin]);

  const fetchEnquiries = async () => {
    const q = query(collection(db, 'orderEnquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setEnquiries(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleInput = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditInput = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = async e => {
    e.preventDefault();
    setAdding(true);
    setError('');
    try {
      await addDoc(collection(db, 'products'), {
        name: form.name,
        type: form.type,
        description: form.description,
        price: parseFloat(form.price),
        priceINR: parseInt(form.priceINR),
        image: form.image,
      });
      setForm({ name: '', type: '', description: '', price: '', priceINR: '', image: '' });
      fetchProducts().then(setProducts);
    } catch (err) {
      setError('Failed to add product.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteDoc(doc(db, 'products', id));
    fetchProducts().then(setProducts);
  };

  const handleEditProduct = (product) => {
    setEditing(product.id);
    setEditForm({
      name: product.name,
      type: product.type,
      description: product.description,
      price: product.price,
      priceINR: product.priceINR,
      image: product.image,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    await updateDoc(doc(db, 'products', editing), {
      name: editForm.name,
      type: editForm.type,
      description: editForm.description,
      price: parseFloat(editForm.price),
      priceINR: parseInt(editForm.priceINR),
      image: editForm.image,
    });
    setEditing(null);
    fetchProducts().then(setProducts);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    await deleteDoc(doc(db, 'orderEnquiries', id));
    fetchEnquiries();
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12 text-red-600 font-bold">You must be signed in to view this page.</div>;
  if (!isAdmin) return <div className="text-center py-12 text-red-600 font-bold">You are not authorized to view this page.</div>;

  return (
    <div className="w-full px-8 py-12 flex flex-col items-center min-h-[60vh]">
      <h2 className="text-4xl font-extrabold text-green-900 mb-8">Admin Dashboard</h2>
      <div className="text-lg text-gray-700 mb-10">Welcome, admin! Here you can manage products and view enquiries.</div>
      <form onSubmit={handleAdd} className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 w-full max-w-lg mb-8 border border-green-100">
        <div className="text-xl font-bold text-green-900 mb-2">Add New Product</div>
        <input name="name" value={form.name} onChange={handleInput} placeholder="Name" className="px-3 py-2 rounded border border-green-200" required />
        <input name="type" value={form.type} onChange={handleInput} placeholder="Type" className="px-3 py-2 rounded border border-green-200" required />
        <input name="description" value={form.description} onChange={handleInput} placeholder="Description" className="px-3 py-2 rounded border border-green-200" required />
        <input name="price" value={form.price} onChange={handleInput} placeholder="Price (USD)" type="number" step="0.01" className="px-3 py-2 rounded border border-green-200" required />
        <input name="priceINR" value={form.priceINR} onChange={handleInput} placeholder="Price (INR)" type="number" className="px-3 py-2 rounded border border-green-200" required />
        <input name="image" value={form.image} onChange={handleInput} placeholder="Image URL" className="px-3 py-2 rounded border border-green-200" required />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition" disabled={adding}>{adding ? 'Adding...' : 'Add Product'}</button>
      </form>
      <div className="w-full max-w-4xl mb-12">
        <div className="text-xl font-bold text-green-900 mb-4">All Products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-green-100">
              <img src={p.image} alt={p.name} className="w-16 h-16 mb-2" />
              {editing === p.id ? (
                <form onSubmit={handleSaveEdit} className="flex flex-col gap-2 w-full items-center">
                  <input name="name" value={editForm.name} onChange={handleEditInput} className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <input name="type" value={editForm.type} onChange={handleEditInput} className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <input name="description" value={editForm.description} onChange={handleEditInput} className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <input name="price" value={editForm.price} onChange={handleEditInput} type="number" step="0.01" className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <input name="priceINR" value={editForm.priceINR} onChange={handleEditInput} type="number" className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <input name="image" value={editForm.image} onChange={handleEditInput} className="px-2 py-1 rounded border border-green-200 w-full" required />
                  <div className="flex gap-2 mt-2">
                    <button type="button" onClick={handleCancelEdit} className="px-3 py-1 rounded bg-gray-200 text-green-700 font-bold hover:bg-gray-300 transition">Cancel</button>
                    <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">Save</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="font-bold text-green-900">{p.name}</div>
                  <div className="text-green-700">{p.type}</div>
                  <div className="text-gray-600 text-sm mb-1">{p.description}</div>
                  <div className="text-green-700 font-bold">₹{p.priceINR} / ${p.price}</div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditProduct(p)} className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 transition">Edit</button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200 transition">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <div className="text-xl font-bold text-green-900 mb-4">Order Enquiries</div>
        <div className="flex flex-col gap-4">
          {enquiries.length === 0 && <div className="text-gray-500">No enquiries found.</div>}
          {enquiries.map(e => (
            <div key={e.id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-green-100 gap-2">
              <div>
                <div className="font-bold text-green-900">{e.product}</div>
                <div className="text-green-700">{e.name} ({e.email})</div>
                <div className="text-gray-600 text-sm mb-1">{e.message}</div>
                <div className="text-gray-400 text-xs">{e.createdAt ? new Date(e.createdAt).toLocaleString() : ''}</div>
              </div>
              <button onClick={() => handleDeleteEnquiry(e.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200 transition self-start md:self-auto">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 