import { useState } from 'react';

export default function WorkForm({ onSubmit, onClose }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState('Pending');
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []);
    // Store minimal file metadata; files are not uploaded anywhere (offline-first)
    setFiles(list.map(f => ({ name: f.name, size: f.size, type: f.type })));
  };

  const submit = (e) => {
    e.preventDefault();
    const work = {
      id: crypto.randomUUID(),
      description: description.trim(),
      dueDate: new Date(dueDate).toISOString(),
      status,
      files,
      paid: false,
      createdAt: new Date().toISOString(),
    };
    if (!work.description) return;
    onSubmit?.(work);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg bg-[#0e0e0e] border border-yellow-300/20 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-yellow-100 font-semibold">Add Work / Project</h3>
          <button onClick={onClose} className="text-yellow-300 hover:underline">Close</button>
        </div>
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="block text-sm text-yellow-300/80 mb-1">Work Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-black/40 text-yellow-100 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-yellow-300/40"
              placeholder="e.g., Social media post set, logo iteration, etc."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-yellow-300/80 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-black/40 text-yellow-100 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-yellow-300/40"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-300/80 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-black/40 text-yellow-100 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-yellow-300/40"
              >
                <option>Pending</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-yellow-300/80 mb-1">File Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="w-full text-yellow-100"
              accept="image/*,.pdf,.zip,.ai,.psd"
            />
            {files.length > 0 && (
              <div className="mt-2 text-xs text-yellow-300/70">
                {files.length} file(s) selected. Names will be saved locally.
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-yellow-300/20 text-yellow-100 hover:bg-yellow-300/10">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-300 text-black font-medium hover:bg-yellow-200">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
