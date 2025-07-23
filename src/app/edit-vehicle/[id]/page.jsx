'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditVehicle({ params }) {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehicles`)
            .then(res => {
                const found = res.data.find(v => v._id === params.id);
                if (found) setForm(found);
            });
    }, [params.id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/api/vehicles/${params.id}`, form);
        router.push('/');
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" />
                <input name="capacityKg" value={form.capacityKg} onChange={handleChange} placeholder="Capacity in Kg" type="number" className="w-full border p-2" />
                <input name="tyres" value={form.tyres} onChange={handleChange} placeholder="Tyres" type="number" className="w-full border p-2" />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Vehicle</button>
            </form>
        </div>
    );
}
