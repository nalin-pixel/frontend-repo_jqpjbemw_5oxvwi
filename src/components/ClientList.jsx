import { useEffect, useMemo, useState } from 'react';
import { Plus, Users } from 'lucide-react';

function loadData() {
  const raw = localStorage.getItem('gd_clients');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveData(clients) {
  localStorage.setItem('gd_clients', JSON.stringify(clients));
}

export default function ClientList({ onOpenClient }) {
  const [clients, setClients] = useState(loadData());
  const [name, setName] = useState('');

  useEffect(() => {
    saveData(clients);
  }, [clients]);

  const addClient = () => {
    const n = name.trim();
    if (!n) return;
    const newClient = {
      id: crypto.randomUUID(),
      name: n,
      works: [],
    };
    setClients([newClient, ...clients]);
    setName('');
  };

  const unpaidCounts = useMemo(() => {
    const map = {};
    for (const c of clients) {
      map[c.id] = c.works.filter(w => w.status === 'Completed' && !w.paid).length;
    }
    return map;
  }, [clients]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-yellow-100">
          <Users className="w-5 h-5 text-yellow-300" />
          <h2 className="font-semibold">Clients</h2>
        </div>
      </div>

      <div className="bg-[#121212] border border-yellow-300/20 rounded-xl p-4 mb-6">
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client name"
            className="flex-1 bg-black/40 text-yellow-100 placeholder-yellow-300/50 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-yellow-300/40"
          />
          <button
            onClick={addClient}
            className="inline-flex items-center gap-2 bg-yellow-300 text-black font-medium px-3 py-2 rounded-lg hover:bg-yellow-200"
          >
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {clients.length === 0 && (
          <div className="text-yellow-300/70 text-sm">No clients yet. Add your first client.</div>
        )}
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpenClient(c, (updated) => {
              // receive updated client and persist
              setClients((prev) => prev.map(pc => pc.id === updated.id ? updated : pc));
            })}
            className="text-left bg-[#121212] hover:bg-[#171717] border border-yellow-300/20 rounded-xl p-4 transition"
          >
            <div className="flex items-center justify-between">
              <div className="text-yellow-100 font-medium">{c.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-300/70">Unpaid</span>
                <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 text-xs font-semibold bg-yellow-300 text-black rounded-full">
                  {unpaidCounts[c.id] || 0}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
