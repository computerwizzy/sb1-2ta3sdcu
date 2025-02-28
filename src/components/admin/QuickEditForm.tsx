import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface QuickEditFormProps {
  initialPrice: number;
  initialImage: string;
  onSave: (price: number, image: string) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function QuickEditForm({
  initialPrice,
  initialImage,
  onSave,
  onCancel,
  loading = false
}: QuickEditFormProps) {
  const [price, setPrice] = useState(initialPrice);
  const [image, setImage] = useState(initialImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(price, image);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-3 py-2 text-sm font-medium text-white 
            bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
      </div>
    </form>
  );
}