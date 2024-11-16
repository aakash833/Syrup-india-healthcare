'use client'
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function MaterialForm() {
    const [material_name, setName] = useState('');
    const [material_quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('kg'); // Default value is 'kg'

    const handleAddMaterial = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('materials').insert([{ material_name, material_quantity, unit }]);
        if (error) {
            console.error('Error adding material:', error.message);
        } else {
            alert('Material added successfully!');
            // Clear the form
            setName('');
            setQuantity('');
            setUnit('kg'); // Reset to default unit

            // Refresh the page
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleAddMaterial} className="space-y-4">
            <input
                type="text"
                placeholder="Material Name"
                value={material_name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={material_quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            >
                <option value="kg">Kilogram (kg)</option>
                <option value="gram">Gram (g)</option>
                <option value="liter">Liter (ltr)</option>
                <option value="ml">Milliliter (ml)</option>
            </select>
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                Add Material
            </button>
        </form>
    );
}
