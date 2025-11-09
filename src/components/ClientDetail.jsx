import { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Play, Plus, DollarSign } from 'lucide-react';
import WorkForm from './WorkForm';

function saveClient(updated) {
  const raw = localStorage.getItem('gd_clients');
  const list = raw ? JSON.parse(raw) : [];
  const next = list.map((c) => (c.id === updated.id ? updated : c));
  localStorage.setItem('gd_clients', JSON.stringify(next));
}

export default function ClientDetail({ client, onBack, onUpdate }) {
  const [tab, setTab] = useState('Pending');
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(client);

  const counts = useMemo(() => {
    const base = { Pending: 0, Ongoing: 0, Completed: 0 };
    for (const w of data.works) base[w.status] = (base[w.status] || 0) + 1;
    return base;
  }, [data]);

  const filtered = useMemo(() => data.works.filter(w => w.status === tab), [data, tab]);

  const addWork = (w) => {
    const next = { ...data, works: [w, ...data.works] };
    setData(next);
    saveClient(next);
    onUpdate?.(next);
  };

  const moveStatus = (id, status) => {
    const next = { ...data, works: data.works.map(w => w.id === id ? { ...w, status } : w) };
    setData(next); saveClient(next); onUpdate?.(next);
  };

  const markPaid = (id) => {
    const next = { ...data, works: data.works.map(w => w.id === id ? { ...w, paid: true } : w) };
    setData(next); saveClient(next); onUpdate?.(next);
  };

  const unpaidCompleted = useMemo(() => data.works.filter(w => w.status === 'Completed' && !w.paid).length, [data]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-yellow-100 font-semibold">{data.name}</div>
        <button onClick={onBack} className="text-yellow-300 hover:underline">Back</button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {['Pending','Ongoing','Completed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-3 py-2 rounded-lg border transition ${tab===t? 'bg-yellow-300 text-black border-yellow-300':'bg-[#121212] text-yellow-100 border-yellow-300/20 hover:bg-[#171717]'}`}
          >
            <span className="inline-flex items-center gap-2">
              {t === 'Pending' && <Clock3 className="w-4 h-4" />}
              {t === 'Ongoing' && <Play className="w-4 h-4" />}
              {t === 'Completed' && <CheckCircle2 className="w-4 h-4" />}
              {t}
            </span>
            <span className={`absolute -top-2 -right-2 text-xs rounded-full px-2 h-5 inline-flex items-center justify-center ${tab===t? 'bg-black text-yellow-300':'bg-yellow-300 text-black'}`}>
              {counts[t] || 0}
            </span>
          </button>
        ))}
        <div className="ml-auto">
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-yellow-300 text-black font-medium px-3 py-2 rounded-lg hover:bg-yellow-200">
            <Plus className="w-4 h-4" /> Add Work / Project
          </button>
        </div>
      </div>

      {tab === 'Completed' && (
        <div className="mb-3 text-sm inline-flex items-center gap-2 text-yellow-100">
          <DollarSign className="w-4 h-4 text-yellow-300" />
          Unpaid completed works
          <span className="ml-2 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 text-xs font-semibold bg-yellow-300 text-black rounded-full">{unpaidCompleted}</span>
        </div>
      )}

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="text-yellow-300/70 text-sm">No items in {tab}.</div>
        )}
        {filtered.map((w) => (
          <div key={w.id} className="bg-[#121212] border border-yellow-300/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-yellow-100 font-medium">{w.description}</div>
                <div className="text-xs text-yellow-300/70">Due: {new Date(w.dueDate).toLocaleDateString()}</div>
                {w.files?.length > 0 && (
                  <div className="mt-2 text-xs text-yellow-300/70">{w.files.length} attachment(s) saved locally</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {tab !== 'Completed' ? (
                  <select
                    value={w.status}
                    onChange={(e) => moveStatus(w.id, e.target.value)}
                    className="bg-black/40 text-yellow-100 rounded-md px-2 py-1 border border-yellow-300/20"
                  >
                    <option>Pending</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                ) : (
                  <button
                    onClick={() => markPaid(w.id)}
                    disabled={w.paid}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${w.paid? 'opacity-60 cursor-not-allowed bg-transparent text-yellow-300 border-yellow-300/20':'bg-yellow-300 text-black border-yellow-300 hover:bg-yellow-200'}`}
                  >
                    <DollarSign className="w-4 h-4" /> {w.paid? 'Paid' : 'Mark as Paid'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <WorkForm
          onClose={() => setShowForm(false)}
          onSubmit={(work) => { addWork(work); setShowForm(false); }}
        />
      )}
    </div>
  );
}
