import { LuBrain, LuZap } from "react-icons/lu";

export const NORMAL_CONDITIONS = [
  { value: "reduced_consciousness", label: "کاهش سطح هوشیاری", icon: LuBrain },
  { value: "seizure", label: "تشنج", icon: LuZap },
];
export const OBSTRUCTIVE_DISEASES = [
  { value: "bronchiolitis", label: "برونشیولیت" },
  { value: "asthma", label: "آسم" },
  { value: "bronchiectasis", label: "برونشکتازی" },
  { value: "copd", label: "بیماری انسدادی مزمن ریوی (COPD)" },
  { value: "foreign_body_aspiration", label: "آسپیراسیون جسم خارجی" },
  { value: "cystic_fibrosis", label: "فیبروز سیستیک" },
];

export const RESTRICTIVE_DISEASES = [
  { value: "pneumonia", label: "پنومونی" },
  { value: "ards", label: "سندرم زجر تنفسی حاد (ARDS)" },
  { value: "pulmonary_edema", label: "ادم ریوی" },
  { value: "pulmonary_fibrosis", label: "فیبروز ریوی" },
  { value: "pleural_effusion", label: "افیوژن پلور" },
  { value: "pneumothorax", label: "پنوموتوراکس" },
  { value: "atelectasis", label: "آتلکتازی" },
];
