"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="بازگشت به صفحه قبل"
      className="
        group
        inline-flex
        items-center
        gap-2.5
        rounded-2xl
        border border-slate-200/80
        bg-white/90
        px-3.5
        py-2.5
        text-sm
        font-bold
        text-slate-600
        shadow-[0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5
        hover:border-blue-200
        hover:bg-blue-50/70
        hover:text-blue-700
        hover:shadow-[0_6px_18px_rgba(37,99,235,0.12)]

        active:translate-y-0
        active:scale-[0.97]

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500/30
        focus-visible:ring-offset-2
      "
    >
      {/* Label */}
      <span className="leading-none">بازگشت</span>
      {/* Icon */}
      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
          transition-all
          duration-200
          group-hover:bg-blue-100
          group-hover:text-blue-600
        "
      >
        <LuArrowLeft
          size={17}
          strokeWidth={2.2}
          className="
            transition-transform
            duration-200
            group-hover:translate-x-0.5
          "
        />
      </span>
    </button>
  );
}
