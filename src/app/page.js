'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/api/vehicles');
            setVehicles(res.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
        setLoading(false);
    };

    const deleteVehicle = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
            <h1 className="text-2xl font-bold">FleetLink - Vehicle List</h1>

            <div className="text-right">
                <Link href="/add-vehicle">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">
                        + Add Vehicle
                    </button>
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border mt-4 text-sm text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Capacity (Kg)</th>
                            <th className="p-2">Tyres</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v) => (
                            <tr key={v._id} className="border-t">
                                <td className="p-2">{v.name}</td>
                                <td className="p-2">{v.capacityKg}</td>
                                <td className="p-2">{v.tyres}</td>
                                <td className="p-2 space-x-2">
                                    <Link href={`/edit-vehicle/${v._id}`}>
                                        <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                                            Edit
                                        </button>
                                    </Link>

                                    <Link href={`/book-vehicle/${v._id}`}>
                                        <button className="px-2 py-1 bg-green-600 text-white rounded">
                                            Book
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => deleteVehicle(v._id)}
                                        className="px-2 py-1 bg-red-600 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
