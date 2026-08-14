"use client";

function RsiMedications({ med, doseText }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-1 gap-3">
        <span className="text-sm font-bold text-gray-800">{med.name}</span>

        <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 whitespace-nowrap">
          {doseText}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-1">{med.role}</p>

      <p className="text-[11px] text-gray-400 leading-relaxed">{med.note}</p>
    </div>
  );
}

export default RsiMedications;
