import {
  LuRuler,
  LuStethoscope,
  LuLightbulb,
  LuTriangleAlert,
} from "react-icons/lu";
import NoteCard from "../shared/NoteCard";
import ReferenceFooter from "../shared/ReferenceFooter";

function EttTeachingNotes() {
  return (
    <div className="mt-4 space-y-3">
      <NoteCard icon={LuRuler} title="مبنای محاسبه (سن ≥ ۲ سال)" tone="blue">
        <p>
          بدون کاف: سایز = (سن ÷ ۴) + ۴ — کاف‌دار: سایز = (سن ÷ ۴) + ۳.۵ · عمق
          لوله از لب (cm) تقریباً برابر ۳ × سایز لوله (mm) است.
        </p>
        <p className="mt-2 pt-2 border-t border-blue-200 font-medium">
          سقف سایز: بدون کاف حداکثر ۷.۵ mm و کاف‌دار حداکثر ۷ mm — برای بیماران
          بزرگ‌تر (نوجوانان)، فرمول خام دیگر به‌کار نمی‌رود و به این سقف محدود
          می‌شود.
        </p>
      </NoteCard>

      <NoteCard title="آماده‌سازی حین انتوباسیون">
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

      <NoteCard icon={LuStethoscope} title="تایید محل صحیح لوله">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
            روش استاندارد طلایی: Capnography (تشخیص فوری CO2 بازدمی)
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
