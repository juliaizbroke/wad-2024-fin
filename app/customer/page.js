"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', dateOfBirth: '', memberNumber: '', interests: [] });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const router = useRouter();

  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${APIBASE}/customer`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${APIBASE}/customer`, newCustomer);
      setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: [] });
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${APIBASE}/customer/${editingCustomer._id}`, editingCustomer);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${APIBASE}/customer/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCustomer) {
      setEditingCustomer({ ...editingCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
  };

  const handleViewClick = (id) => {
    router.push(`/customer/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <ul className="space-y-4 mb-8">
        {customers.map((customer) => (
          <li key={customer._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <span className="text-lg font-medium">{customer.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleViewClick(customer._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleEditClick(customer)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCustomer(customer._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
      <form onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer} className="space-y-4 bg-white shadow-md rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={editingCustomer ? editingCustomer.name : newCustomer.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={editingCustomer ? editingCustomer.dateOfBirth : newCustomer.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Member Number</label>
          <input
            type="number"
            name="memberNumber"
            value={editingCustomer ? editingCustomer.memberNumber : newCustomer.memberNumber}
            onChange={handleInputChange}
            placeholder="Member Number"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <input
            type="text"
            name="interests"
            value={editingCustomer ? editingCustomer.interests : newCustomer.interests}
            onChange={handleInputChange}
            placeholder="Interests (comma separated)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingCustomer ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default Page;