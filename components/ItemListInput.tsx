// components/ItemListInput.tsx
"use client";

import React, { useState } from 'react';

interface ItemListInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}

const ItemListInput: React.FC<ItemListInputProps> = ({ label, items, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder={`Add ${label.toLowerCase()}...`}
        />
        <button 
          type="button" 
          onClick={addItem} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <ul className="mt-2 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>
              <button 
                type="button" 
                onClick={() => removeItem(index)} 
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListInput;
