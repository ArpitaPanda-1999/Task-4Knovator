'use client';
import { useState } from 'react';
import axios from 'axios';

export default function SearchBook() {
    const [input, setInput] = useState({ fromPincode: '', toPincode: '', capacityRequired: '', startTime: '', customerId: '' });
    const [available, setAvailable] = useState([]);

    const handleSearch = async () => {
        const res = await axios.get('http://localhost:3000/api/vehicles/available', {
            params: {
                ...input
            }
        });
        setAvailable(res.data.vehicles);
    };

    const bookVehicle = async (vehicleId) => {
        const res = await axios.post('http://localhost:3000/api/bookings', {
            vehicleId,
            ...input
        });
        alert('Booking successful!');
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Search & Book</h1>
            <div className="space-y-3">
                <input className="w-full border p-2" name="fromPincode" placeholder="From Pincode" value={input.fromPincode} onChange={(e) => setInput({ ...input, fromPincode: e.target.value })} />
                <input className="w-full border p-2" name="toPincode" placeholder="To Pincode" value={input.toPincode} onChange={(e) => setInput({ ...input, toPincode: e.target.value })} />
                <input className="w-full border p-2" name="capacityRequired" placeholder="Capacity Required" type="number" value={input.capacityRequired} onChange={(e) => setInput({ ...input, capacityRequired: e.target.value })} />
                <input className="w-full border p-2" name="startTime" placeholder="Start Time" type="datetime-local" value={input.startTime} onChange={(e) => setInput({ ...input, startTime: e.target.value })} />
                <input className="w-full border p-2" name="customerId" placeholder="Customer ID" value={input.customerId} onChange={(e) => setInput({ ...input, customerId: e.target.value })} />
                <button onClick={handleSearch} className="px-4 py-2 bg-green-600 text-white rounded">Search Available Vehicles</button>
            </div>

            {available.length > 0 && (
                <div className="mt-6 space-y-4">
                    <h2 className="font-bold">Available Vehicles:</h2>
                    {available.map(v => (
                        <div key={v._id} className="border p-4 rounded bg-gray-50">
                            <p><strong>Name:</strong> {v.name}</p>
                            <p><strong>Capacity:</strong> {v.capacityKg} Kg</p>
                            <p><strong>Tyres:</strong> {v.tyres}</p>
                            <button onClick={() => bookVehicle(v._id)} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Book Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
