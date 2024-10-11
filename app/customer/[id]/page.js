"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDetailPage = ({ params }) => {
  const { id } = params; // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/customer/${id}`);
        console.log('API Response:', response.data); // Log the API response
        setCustomer(response.data);
        console.log('Customer Data:', response.data); // Log the customer data after setting it
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setError('Failed to fetch customer details. Please try again later.');
      }
    };

    fetchCustomer();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold">{customer.data.name || 'N/A'}</h2>
        <p><strong>Date of Birth:</strong> {customer.data.dateOfBirth ? new Date(customer.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Member Number:</strong> {customer.data.memberNumber || 'N/A'}</p>
        <p><strong>Interests:</strong> {customer.data.interests ? customer.data.interests.join(', ') : 'N/A'}</p>
      </div>
    </div>
  );
};

export default CustomerDetailPage;