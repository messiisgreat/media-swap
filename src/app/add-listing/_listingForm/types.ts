import { FormState } from "@/components/form/type";
import { ZodType, z } from "zod";

export type ProductFormData = {
  productName: string;
  productConditionId: string;
  price: number;
  description: string;
  postageIsIncluded: string;
  shippingDaysId: string;
  shippingMethodId: string;
  imageFiles: File[];
  tags: string;
  verificationCode: string;
  isPublic: string;
};

export type ProductFormState = FormState<ProductFormData>;

export const initialProductFormValues: ProductFormState = {
  values: {
    productName: "",
    productConditionId: "",
    price: 0,
    description: "",
    postageIsIncluded: "",
    shippingDaysId: "",
    shippingMethodId: "",
    imageFiles: [],
    tags: "",
    verificationCode: "",
    isPublic: "",
  },
  errors: {},
  message: "",
};

export const ProductFormSchema: ZodType<ProductFormData> = z.object({
  productName: z
    .string()
    .min(1, { message: "商品名は必須です" })
    .max(32, { message: "商品名は32文字以内で入力してください" }),
  productConditionId: z
    .string()
    .min(1, { message: "商品の状態を選択してください" }),
  price: z
    .number()
    .min(1, { message: "価格は1円以上で入力してください" })
    .max(9999999, { message: "価格は9999999円以下で入力してください" }),
  description: z
    .string()
    .min(1, { message: "商品の説明は必須です" })
    .max(1000, { message: "商品の説明は1000文字以内で入力してください" }),
  postageIsIncluded: z.string().min(1, { message: "送料を選択してください" }),
  shippingDaysId: z.string().min(1, { message: "発送日数を選択してください" }),
  shippingMethodId: z
    .string()
    .min(1, { message: "発送方法を選択してください" }),
  imageFiles: z
    .array(z.custom<File>())
    .nonempty({ message: "画像は必須です" })
    .max(10, { message: "画像は10枚まで選択できます" }),
  tags: z.string(),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
  isPublic: z.string().min(1),
});
