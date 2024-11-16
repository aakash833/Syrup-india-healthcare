'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function StockUpdateForm() {
    const [materials, setMaterials] = useState([]);
    const [materialId, setMaterialId] = useState('');
    const [usedQuantity, setUsedQuantity] = useState('');

    // Fetch all materials when the component mounts
    useEffect(() => {
        const fetchMaterials = async () => {
            const { data, error } = await supabase.from('materials').select('id, material_name');
            if (error) console.error('Error fetching materials:', error.message);
            else setMaterials(data);
        };
        fetchMaterials();
    }, []);

    const handleUpdateStock = async (e) => {
        e.preventDefault();

        // Fetch the selected material's quantity
        const { data, error } = await supabase
            .from('materials')
            .select('material_quantity')
            .eq('id', materialId)
            .single();

        if (error) return console.error('Error fetching material:', error.message);

        const newQuantity = data.material_quantity - usedQuantity;

        if (newQuantity < 0) return alert('Not enough stock!');

        // Update the material's quantity
        const { error: updateError } = await supabase
            .from('materials')
            .update({ material_quantity: newQuantity })
            .eq('id', materialId);

        if (updateError) console.error('Error updating stock:', updateError.message);
        else alert('Stock updated successfully!');
    };

    return (
        <form onSubmit={handleUpdateStock} className="space-y-4">
            {/* Dropdown to select material */}
            <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            >
                <option value="" disabled>Select Material</option>
                {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                        {material.material_name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Quantity Used"
                value={usedQuantity}
                onChange={(e) => setUsedQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                Update Stock
            </button>
        </form>
    );
}
