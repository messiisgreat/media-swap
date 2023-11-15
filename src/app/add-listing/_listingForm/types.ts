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
  isPublic: string;
};

type ProductFormState = FormState<ProductFormData>;

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
    isPublic: "",
  },
  errors: {},
  message: "",
};

export const ProductFormSchema: ZodType<ProductFormData> = z.object({
  productName: z.string().min(1, { message: "商品名は必須です" }),
  productConditionId: z
    .string()
    .min(1, { message: "商品の状態を選択してください" }),
  price: z.number().min(0, { message: "価格は0以上で入力してください" }),
  description: z.string().min(1, { message: "商品の説明は必須です" }),
  postageIsIncluded: z.string().min(1, { message: "送料を選択してください" }),
  shippingDaysId: z.string().min(1, { message: "発送日数を選択してください" }),
  shippingMethodId: z
    .string()
    .min(1, { message: "発送方法を選択してください" }),
  imageFiles: z.array(z.any()).min(1, { message: "画像は必須です" }),
  tags: z.string(),
  isPublic: z.string().min(1, { message: "公開設定は必須です" }),
});
