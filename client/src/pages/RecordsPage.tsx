import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem, Item } from '../api/items';

export const RecordsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Textile');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchItems();
      setItems(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = await createItem({
        title,
        category,
        price: Number(price || 0),
        description,
      });
      setItems([newItem, ...items]);
      setTitle('');
      setPrice('');
      setDescription('');
    } catch (err: any) {
      alert(err.message || 'Error saving record');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting record');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items & Craft Records</h1>

      {/* Insert Form */}
      <form id="item-form" onSubmit={handleSubmit} className="border p-4 mb-6 rounded bg-white">
        <h2 className="font-semibold mb-3">Add Item</h2>
        
        <div className="mb-2">
          <label className="block text-sm">Title</label>
          <input
            id="item-title-input"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full rounded"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">Category</label>
          <select
            id="item-category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-1 w-full rounded"
          >
            <option value="Textile">Textile</option>
            <option value="Pottery">Pottery</option>
            <option value="Craft">Craft</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm">Price</label>
          <input
            id="item-price-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-1 w-full rounded"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm">Description</label>
          <input
            id="item-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 w-full rounded"
          />
        </div>

        <button id="item-submit-btn" type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm">
          Save Record
        </button>
      </form>

      {/* Records Table */}
      <table id="items-table" className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(item.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
