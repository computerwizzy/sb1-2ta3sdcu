import React from 'react';
import { X, Save } from 'lucide-react';
import { MenuItemType } from '../../types/menu';

interface MenuItemFormProps {
  item: MenuItemType;
  onSave: (item: MenuItemType) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function MenuItemForm({ item, onSave, onCancel, loading }: MenuItemFormProps) {
  const [formData, setFormData] = React.useState(item);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value as MenuItemType['category'] })}
            className="w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
            <option value="sushi">Sushi</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Tags</label>
        <div className="space-x-4">
          {['vegetarian', 'gluten-free', 'spicy'].map(tag => (
            <label key={tag} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.dietary.includes(tag)}
                onChange={e => {
                  const newDietary = e.target.checked
                    ? [...formData.dietary, tag]
                    : formData.dietary.filter(t => t !== tag);
                  setFormData({ ...formData, dietary: newDietary });
                }}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-600 capitalize">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          Save
        </button>
      </div>
    </form>
  );
}