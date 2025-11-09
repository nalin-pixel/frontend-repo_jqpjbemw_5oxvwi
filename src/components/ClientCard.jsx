import React from 'react';
import { User, BadgeDollarSign } from 'lucide-react';

function ClientCard({ client, unpaidCompletedCount, onOpen }) {
  return (
    <button
      onClick={() => onOpen(client)}
      className="w-full text-left rounded-xl border border-yellow-300/20 bg-yellow-50/5 hover:bg-yellow-50/10 transition-colors p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-yellow-300/10 text-yellow-300">
          <User size={20} />
        </div>
        <div>
          <div className="font-semibold text-yellow-100">{client.name}</div>
          <div className="text-xs text-yellow-200/70">Tap to view works</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-400/20 text-red-200 border border-red-400/30">
          <BadgeDollarSign size={14} />
          {unpaidCompletedCount}
        </span>
      </div>
    </button>
  );
}

export default ClientCard;
