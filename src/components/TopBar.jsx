import { Palette } from 'lucide-react';

export default function TopBar({ title, onBack }) {
  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-[#0a0a0a]/70 border-b border-yellow-300/20">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="p-2 rounded-md hover:bg-yellow-300/10 text-yellow-300"
          >
            {/* Using a simple unicode arrow to avoid extra icon imports */}
            <span className="text-lg">←</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-yellow-300" />
          <h1 className="text-yellow-100 font-semibold tracking-tight">{title}</h1>
        </div>
      </div>
    </div>
  );
}
