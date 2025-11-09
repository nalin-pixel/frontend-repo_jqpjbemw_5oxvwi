import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function AddWorkForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [attachments, setAttachments] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (!description || !dueDate) return;
    const id = Date.now().toString();
    onAdd({ id, description, dueDate, status, attachments, paid: false });
    setDescription('');
    setDueDate('');
    setStatus('Pending');
    setAttachments([]);
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-yellow-300/20 bg-yellow-50/5 p-4 space-y-3">
      <div>
        <label className="block text-sm mb-1 text-yellow-200">Work Description</label>
        <input
          className="w-full rounded-lg bg-zinc-800 border border-yellow-300/20 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Social media banner set"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm mb-1 text-yellow-200">Due Date</label>
          <input
            type="date"
            className="w-full rounded-lg bg-zinc-800 border border-yellow-300/20 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/40"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-yellow-200">Status</label>
          <select
            className="w-full rounded-lg bg-zinc-800 border border-yellow-300/20 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/40"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-yellow-200">Attachments</label>
          <input
            type="file"
            multiple
            className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-yellow-300 file:text-zinc-900 file:px-3 file:py-2"
            onChange={(e) => setAttachments(Array.from(e.target.files).map(f => ({ name: f.name })))}
          />
        </div>
      </div>
      <button type="submit" className="inline-flex items-center gap-2 bg-yellow-300 text-zinc-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-200">
        <Plus size={18} /> Add Work / Project
      </button>
    </form>
  );
}

export default AddWorkForm;
