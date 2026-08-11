function NoteCard({ icon: Icon, title, tone = "slate", children }) {
  const toneMap = {
    slate: "border-slate-200 bg-slate-50",
    blue: "border-blue-200 bg-blue-50",
    amber: "border-amber-200 bg-amber-50",
  };
  const titleToneMap = {
    slate: "text-slate-700",
    blue: "text-blue-800",
    amber: "text-amber-800",
  };

  return (
    <div className={`rounded-xl border p-4 flex gap-3 ${toneMap[tone]}`}>
      {Icon && (
        <Icon className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${titleToneMap[tone]}`} />
      )}
      <div className="flex-1">
        {title && (
          <p className={`text-sm font-semibold mb-1.5 ${titleToneMap[tone]}`}>
            {title}
          </p>
        )}
        <div className="text-sm text-slate-600 leading-6">{children}</div>
      </div>
    </div>
  );
}

export default NoteCard;
