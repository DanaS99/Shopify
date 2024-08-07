import React, { useState } from 'react';

function AdminPanel() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, price, stock, images }),
      });

      
      if (response.ok) {
        alert('Item added successfully');
        // Clear form fields
        //setId('');
        setTitle('');
        setPrice('');
        setStock('');
        setImages('');
      } else {
        const errorText = await response.text();
        alert(`Failed to add item: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };


  return (
    <div className="max-w-2xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
