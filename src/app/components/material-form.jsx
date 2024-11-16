'use client'
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function MaterialForm() {
    const [material_name, setName] = useState('');
    const [material_quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('kg'); // Default value is 'kg'
    const [vendor_name, setVendorName] = useState(''); // New state for vendor name
    const [material_price, setMaterialPrice] = useState(''); // New state for material price
    const [quantityError, setQuantityError] = useState(''); // To hold error message for quantity validation

    const handleAddMaterial = async (e) => {
        e.preventDefault();

        // Check if the quantity is valid before submitting
        const quantityPattern = /^\d{1,5}(\.\d{1,2})?$/; // Allows up to 5 digits and optionally 2 decimals
        if (!quantityPattern.test(material_quantity)) {
            setQuantityError('Quantity must be a number with up to 5 digits, and optional 2 decimals.');
            return;
        }

        const { error } = await supabase.from('materials').insert([
            { material_name, material_quantity, unit, vendor_name, material_price }
        ]);
        if (error) {
            console.error('Error adding material:', error.message);
        } else {
            alert('Material added successfully!');
            // Clear the form
            setName('');
            setQuantity('');
            setUnit('kg'); // Reset to default unit
            setVendorName(''); // Reset vendor name
            setMaterialPrice(''); // Reset material price
            setQuantityError(''); // Reset quantity error

            // Refresh the page
            window.location.reload();
        }
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        // Validate that the quantity doesn't exceed the max 5 digits
        if (/^\d{0,5}(\.\d{0,2})?$/.test(value)) {
            setQuantity(value);
            setQuantityError('');
        } else {
            setQuantityError('Quantity must be a number with up to 5 digits and optional 2 decimals.');
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
            <div>
                <input
                    type="text"
                    placeholder="Quantity"
                    value={material_quantity}
                    onChange={handleQuantityChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                {quantityError && <p className="text-red-500 text-sm">{quantityError}</p>}
            </div>
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
            <input
                type="text"
                placeholder="Vendor Name"
                value={vendor_name}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <input
                type="number"
                placeholder="Material Price"
                value={material_price}
                onChange={(e) => setMaterialPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
            />
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                Add Material
            </button>
        </form>
    );
}
