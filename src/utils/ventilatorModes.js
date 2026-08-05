// utils/ventilatorModes.js
export const pediatricVentilatorModes = {
  SIMV: {
    name: "SIMV",
    description: "تهویه اجباری متناوب همزمان",
    icon: "🔄",
    clinicalIndications: [
      "مناسب برای اکثر بیماران کودکان",
      "کنترل مناسب تهویه با حفظ تنفس خودکار",
      "انتقال آسان به تهویه حمایتی",
    ],
    advantages: [
      "کمتر شدن تعداد تنفس‌های اجباری",
      "کاهش نیاز به سدیشن",
      "حفظ عضلات تنفسی",
    ],
  },
  CPAP: {
    name: "CPAP",
    description: "فشار مثبت مداوم راه هوایی",
    icon: "💨",
    clinicalIndications: [
      "آپنه نوزادان",
      "بیماری غشای هیالین",
      "نارسایی تنفسی خفیف تا متوسط",
    ],
    advantages: ["غیرتهاجمی", "حفظ راه هوایی باز", "کاهش نیاز به لوله‌گذاری"],
  },
  PRVC: {
    name: "PRVC",
    description: "کنترل حجمی با فشار تنظیم شده",
    icon: "📊",
    clinicalIndications: ["ARDS", "پنومونی شدید", "نیاز به تهویه دقیق حجمی"],
    advantages: [
      "تضمین حجم جاری",
      "کاهش باروتروما",
      "انطباق با تغییرات مکانیک ریه",
    ],
  },
};
