"use client";

import {
  LuRuler,
  LuStethoscope,
  LuLightbulb,
  LuTriangleAlert,
  LuClipboardList,
  LuScanLine,
} from "react-icons/lu";
import NoteCard from "../shared/NoteCard";
import ReferenceFooter from "../shared/ReferenceFooter";

function EttTeachingNotes() {
  return (
    <div className="mt-4 space-y-3">
      <NoteCard icon={LuRuler} title="مبنای محاسبه (سن ≥ ۲ سال)" tone="blue">
        <div className="grid grid-cols-1 gap-2 mb-2">
          <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2 border border-blue-100">
            <span className="text-xs font-bold text-blue-700">بدون کاف</span>
            <span className="text-xs font-mono font-semibold text-gray-700">
              (سن ÷ ۴) + ۴
            </span>
          </div>
          <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2 border border-blue-100">
            <span className="text-xs font-bold text-blue-700">کاف‌دار</span>
            <span className="text-xs font-mono font-semibold text-gray-700">
              (سن ÷ ۴) + ۳.۵
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-6">
          عمق لوله از لب (cm) تقریباً برابر ۳ برابر سایز لوله (mm) است.
        </p>
        <p className="mt-2 pt-2 border-t border-blue-200 text-xs font-medium text-gray-700 leading-6">
          سقف سایز: بدون کاف حداکثر ۷.۵ mm و کاف‌دار حداکثر ۷ mm — برای بیماران
          بزرگ‌تر (نوجوانان)، فرمول خام دیگر به‌کار نمی‌رود و به این سقف محدود
          می‌شود.
        </p>
      </NoteCard>

      <NoteCard icon={LuClipboardList} title="آماده‌سازی حین انتوباسیون">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            همیشه یک سایز بزرگ‌تر و یک سایز کوچک‌تر (اختلاف ۰.۵ میلی‌متر) از
            سایز محاسبه‌شده در دسترس باشد.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            سایز محاسبه‌شده یک نقطه شروع است، نه عدد قطعی — در بیماری‌های راه
            هوایی (کروپ، ساب‌گلوتیک استنوز) انتظار سایز کوچک‌تر را داشته باشید.
          </li>
        </ul>
      </NoteCard>

      <NoteCard icon={LuScanLine} title="تایید محل صحیح لوله">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            <span>
              <span className="font-semibold text-slate-700">
                روش استاندارد طلایی:
              </span>{" "}
              Capnography (تشخیص فوری CO2 بازدمی)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            در صورت عدم دسترسی: سمع دو طرفه ریه، تقارن حرکت قفسه سینه، و
            بخارگرفتگی لوله (misting)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            تایید نهایی همیشه با رادیوگرافی قفسه سینه (CXR) — نوک لوله باید در
            سطح مهره‌های T2-T3 باشد
          </li>
        </ul>
      </NoteCard>

      <NoteCard icon={LuLightbulb} title="نکته فوق‌تخصصی" tone="amber">
        <p>
          در نوزادان و شیرخواران، اختلاف چند میلی‌متری در سایز لوله می‌تواند
          نسبت به بزرگسالان اهمیت بالینی بسیار بیشتری داشته باشد؛ عبور سخت لوله
          با فشار زیاد را متوقف و سایز کوچک‌تر را امتحان کنید تا از آسیب
          ساب‌گلوتیک و استنوز بعدی پیشگیری شود.
        </p>
      </NoteCard>

      <div className="flex items-start gap-2 text-xs text-slate-400 px-1">
        <LuTriangleAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        این مقادیر صرفاً راهنمای اولیه‌اند و باید همیشه با قضاوت بالینی و شرایط
        اختصاصی بیمار تطبیق داده شوند.
      </div>

      <ReferenceFooter
        source={'UpToDate — "Emergency endotracheal intubation in children"'}
      />
    </div>
  );
}

export default EttTeachingNotes;
