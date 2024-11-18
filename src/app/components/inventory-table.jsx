'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function InventoryTable() {
    const [materials, setMaterials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            const { data, error } = await supabase
                .from('materials')
                .select('*');
            if (error) {
                console.error('Error fetching materials:', error.message);
            } else {
                // Filter materials with quantity > 0
                const filteredMaterials = data.filter(material => material.material_quantity > 0);
                setMaterials(filteredMaterials);
            }
        };

        fetchMaterials();

    }, []);

    const handleDelete = async () => {
        if (materialToDelete) {
            const { error } = await supabase
                .from('materials')
                .delete()
                .eq('id', materialToDelete.id);

            if (error) {
                console.error('Error deleting material:', error.message);
            } else {
                alert('Material deleted successfully!');
                setMaterials(materials.filter(material => material.id !== materialToDelete.id));
                setShowModal(false);
                setMaterialToDelete(null);
                window.location.reload();
            }
        }
    };

    return (
        <>
            <h1 className="mb-4 text-2xl font-bold">Material Stock</h1>
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Material</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Unit</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material) => (
                        <tr key={material.id}>
                            <td className="border px-4 py-2">{material.material_name}</td>
                            <td className="border px-4 py-2 truncate">{material.material_quantity}</td>
                            <td className="border px-4 py-2">{material.unit}</td>
                            <td className="border px-4 py-2">{material.vendor_name}</td>
                            <td className="border px-4 py-2">{material.material_price}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    onClick={() => {
                                        setMaterialToDelete(material);
                                        setShowModal(true);
                                    }}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">
                            Are you sure you want to delete{' '}
                            <span className="font-bold">{materialToDelete.material_name}</span>?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
