import React from 'react';
import { Calendar, File, CheckCircle2, ArrowRightLeft, DollarSign } from 'lucide-react';

const statusColors = {
  Pending: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  Ongoing: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  Completed: 'bg-green-500/20 text-green-200 border-green-500/30',
};

function WorkItem({ work, onChangeStatus, onMarkPaid }) {
  return (
    <div className="rounded-xl border border-yellow-300/20 bg-yellow-50/5 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-yellow-100">{work.description}</div>
          <div className="text-xs text-yellow-200/70 flex items-center gap-2 mt-1">
            <Calendar size={14} /> Due: {new Date(work.dueDate).toLocaleDateString()}
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border inline-flex items-center gap-1 ${statusColors[work.status]}`}>
          <CheckCircle2 size={14} /> {work.status}
        </span>
      </div>
      {work.attachments && work.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-yellow-200/80">
          {work.attachments.map((file, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-yellow-300/20 bg-zinc-800">
              <File size={14} /> {file.name || file}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(work.status === 'Pending' || work.status === 'Ongoing') && (
            <select
              className="rounded-lg bg-zinc-800 border border-yellow-300/20 px-2 py-1 text-sm"
              value={work.status}
              onChange={(e) => onChangeStatus(work.id, e.target.value)}
            >
              <option>Pending</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          )}
        </div>
        {work.status === 'Completed' && !work.paid && (
          <button onClick={() => onMarkPaid(work.id)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-400/20 text-green-200 border border-green-400/30 hover:bg-green-400/30">
            <DollarSign size={16} /> Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkItem;
