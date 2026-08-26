// جدول مرجع تیغه‌ی لارنگوسکوپ بر اساس سن — برای نمایش در جدول مرجع
export const LARYNGOSCOPE_AGE_REFERENCE = [
  {
    ageLabel: "نوزاد نارس / کمتر از ۱ ماه",
    type: "straight",
    name: "Miller",
    size: "0",
  },
  {
    ageLabel: "نوزاد ترم تا ۱ سالگی",
    type: "straight",
    name: "Miller",
    size: "1",
  },
  {
    ageLabel: "۱ تا ۲ سالگی",
    type: "straight",
    name: "Miller",
    size: "1",
    altType: "curved",
    altName: "Macintosh",
    altSize: "2",
  },
  {
    ageLabel: "۲ تا ۸ سالگی",
    type: "curved",
    name: "Macintosh",
    size: "2",
    altType: "straight",
    altName: "Miller",
    altSize: "2",
  },
  {
    ageLabel: "بزرگ‌تر از ۸ سال تا بزرگسال",
    type: "curved",
    name: "Macintosh",
    size: "3",
    altType: "straight",
    altName: "Miller",
    altSize: "2",
  },
];

/**
 * تعیین نوع و سایز تیغه‌ی لارنگوسکوپ پیشنهادی بر اساس سن (به سال).
 * برای نوزادان می‌توان اعداد اعشاری وارد کرد (مثلاً 0.08 برای حدود ۱ ماهگی).
 */
export function getLaryngoscopeBlade(ageYears) {
  const age = Number(ageYears);
  if (!age || age <= 0) return null;

  if (age < 1 / 12) {
    return {
      ageLabel: "نوزاد نارس / کمتر از ۱ ماه",
      type: "straight",
      name: "Miller",
      size: "0",
      altType: null,
      altName: null,
      altSize: null,
      rationale:
        "در نوزادان نارس، اپی‌گلوت بلند و شل و به‌صورت امگاشکل است و حنجره موقعیتی بالاتر و قدامی‌تر دارد؛ تیغه‌ی صاف (Miller) با بلند کردن مستقیم اپی‌گلوت بهترین دید از تارهای صوتی را فراهم می‌کند.",
    };
  }

  if (age < 1) {
    return {
      ageLabel: "نوزاد ترم تا ۱ سالگی",
      type: "straight",
      name: "Miller",
      size: "1",
      altType: null,
      altName: null,
      altSize: null,
      rationale:
        "در شیرخواران، اپی‌گلوت هنوز بلند و شل است و قاعده‌ی زبان نسبتاً بزرگ؛ تیغه‌ی صاف با بلند کردن مستقیم اپی‌گلوت، دید بهتری نسبت به تیغه‌ی خمیده فراهم می‌کند.",
    };
  }

  if (age < 2) {
    return {
      ageLabel: "۱ تا ۲ سالگی",
      type: "straight",
      name: "Miller",
      size: "1",
      altType: "curved",
      altName: "Macintosh",
      altSize: "2",
      rationale:
        "در این بازه‌ی سنی همچنان تیغه‌ی صاف ترجیح داده می‌شود، هرچند با کوتاه‌تر شدن نسبی اپی‌گلوت، در برخی مراکز از تیغه‌ی خمیده هم استفاده می‌شود.",
    };
  }

  if (age < 8) {
    return {
      ageLabel: "۲ تا ۸ سالگی",
      type: "curved",
      name: "Macintosh",
      size: "2",
      altType: "straight",
      altName: "Miller",
      altSize: "2",
      rationale:
        "با رشد کودک، آناتومی راه هوایی فوقانی به بزرگسال نزدیک‌تر می‌شود؛ تیغه‌ی خمیده با قرارگیری در والکولا و کشیدن غیرمستقیم اپی‌گلوت، از این سن به‌عنوان انتخاب اول مطرح است.",
    };
  }

  return {
    ageLabel: "بزرگ‌تر از ۸ سال / نوجوان",
    type: "curved",
    name: "Macintosh",
    size: age < 12 ? "2" : "3",
    altType: "straight",
    altName: "Miller",
    altSize: "2",
    rationale:
      "از این سن به بعد آناتومی راه هوایی مشابه بزرگسال است و تیغه‌ی خمیده با سایز متناسب با قد و وزن بیمار، انتخاب استاندارد محسوب می‌شود.",
  };
}
