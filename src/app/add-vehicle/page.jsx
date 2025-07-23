'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddVehicle() {
    const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/'); 
        } else {
            alert('Error adding vehicle');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Vehicle Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="capacityKg"
                    placeholder="Capacity in Kg"
                    value={form.capacityKg}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="tyres"
                    placeholder="No. of Tyres"
                    value={form.tyres}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
