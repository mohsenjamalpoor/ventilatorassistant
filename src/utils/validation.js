import { z } from "zod";

export const setupSchema = z.object({
  weight: z.coerce
    .number()
    .min(1, "وزن باید بیشتر از صفر باشد")
    .max(300, "وزن معتبر نیست"),

  age: z.coerce
    .number()
    .min(1, "سن باید بیشتر از صفر باشد")
    .max(18, "سن باید کمتر از 18 سال باشد"),

  lungInvolvement: z.string().min(1, "نوع درگیری ریه را انتخاب کنید"),
});
