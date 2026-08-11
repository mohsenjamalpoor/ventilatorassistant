import { LuExternalLink } from "react-icons/lu";

function ReferenceFooter({ source }) {
  return (
    <div className="flex items-center gap-2 pt-3 mt-1 border-t border-slate-100">
      <LuExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <p className="text-[11px] text-slate-400">منبع: {source}</p>
    </div>
  );
}

export default ReferenceFooter;
