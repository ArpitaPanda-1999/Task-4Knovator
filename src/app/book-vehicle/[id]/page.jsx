

'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function BookVehicle() {
    const { id } = useParams(); 
    const router = useRouter();

    const [form, setForm] = useState({
        vehicleId: id,
        customer: '',
        from: '',
        to: '',
        date: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(form.date + 'T00:00:00'); // Ensure it's a proper ISO date

    if (isNaN(formattedDate)) {
        alert("Invalid date selected.");
        return;
    }

    const payload = {
        vehicleId: id,
        customerId: form.customer,
        fromPincode: form.from,
        toPincode: form.to,
        startTime: formattedDate,
    };

    try {
        const res = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Server Error:", data.error);
            alert("Booking failed: " + (data.error || "Unknown error"));
            return;
        }

        console.log("✅ Booking saved:", data);
        alert("Booking successful ✅");
        router.push('/');
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Booking failed: " + err.message);
    }
};



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Book Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="customer"
                    placeholder="Customer Name"
                    value={form.customer}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="from"
                    placeholder="From Location"
                    value={form.from}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="to"
                    placeholder="To Location"
                    value={form.to}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
}


export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/vehicles');
  const vehicles = await res.json();

  return vehicles.map(vehicle => ({
    id: vehicle._id,
  }));
}