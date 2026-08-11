import { formatNumber } from "@/utils/formatNumberEtt";

function EttSizeTable({ ett }) {
  return (
    <div className="rounded-2xl border border-blue-200 overflow-hidden">
      <div className="grid grid-cols-3 bg-slate-100 text-[13px] font-bold text-gray-600">
        <div className="p-3 border-l border-blue-100"></div>
        <div className="p-3 border-l border-blue-100 text-center">
          سایز لوله (mm)
        </div>
        <div className="p-3 text-center">عمق لوله (cm)</div>
      </div>

      <div className="grid grid-cols-3 items-center border-t border-blue-100">
        <div className="p-3 border-l border-blue-100">
          <div className="text-sm font-bold text-gray-700">بدون کاف</div>
          <div className="text-[11px] text-gray-400">Uncuffed</div>
        </div>
        <div className="p-3 border-l border-blue-100 text-center">
          <span className="text-2xl font-extrabold text-blue-700">
            {formatNumber(ett.uncuffedSize)}
          </span>
        </div>
        <div className="p-3 text-center">
          <span className="text-xl font-bold text-cyan-700">
            {formatNumber(ett.uncuffedDepth)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center border-t border-blue-100 bg-blue-50/50">
        <div className="p-3 border-l border-blue-100">
          <div className="text-sm font-bold text-gray-700">کاف‌دار</div>
          <div className="text-[11px] text-gray-400">Cuffed</div>
        </div>
        <div className="p-3 border-l border-blue-100 text-center">
          <span className="text-2xl font-extrabold text-blue-700">
            {formatNumber(ett.cuffedSize)}
          </span>
        </div>
        <div className="p-3 text-center">
          <span className="text-xl font-bold text-cyan-700">
            {formatNumber(ett.cuffedDepth)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EttSizeTable;
