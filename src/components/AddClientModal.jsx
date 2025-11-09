import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

function AddClientModal({ open, onClose, onAdd }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ id: Date.now().toString(), name });
    setName('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-yellow-300/20 bg-zinc-900 text-yellow-100 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Client</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
            <X />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Client Name</label>
            <input
              className="w-full rounded-lg bg-zinc-800 border border-yellow-300/20 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/40"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corp"
            />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 bg-yellow-300 text-zinc-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-200">
            <Plus size={18} /> Add Client
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClientModal;
