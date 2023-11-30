import { FormState } from "@/components/form/type";
import { ZodType, z } from "zod";

/** 出品情報登録フォームの値を表す型 */
export type ProductFormValues = {
  /** 商品名 */
  productName: string;
  /** 商品の状態 */
  productConditionId: string;
  /** 価格 */
  price: string;
  /** 商品の説明 */
  description: string;
  /** 送料込みかどうか */
  postageIsIncluded: string;
  /** 発送日数 */
  shippingDaysId: string;
  /** 発送方法 */
  shippingMethodId: string;
  /** 画像ファイル */
  imageFiles: File[];
  /** タグ */
  tags: string;
  /** 認証コード */
  verificationCode: string;
  /** 公開するかどうか */
  isPublic: string;
};

/** 出品情報登録フォームの状態とバリデーション、メッセージを表す型 */
export type ProductFormState = FormState<ProductFormValues>;

/** 出品情報登録フォームの初期値 */
export const initialProductFormValues: ProductFormState = {
  values: {
    productName: "",
    productConditionId: "",
    price: "",
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

/** 出品情報登録フォームのバリデーション */
export const ProductFormSchema: ZodType<ProductFormValues> = z.object({
  productName: z
    .string()
    .min(1, { message: "商品名は必須です" })
    .max(32, { message: "商品名は32文字以内で入力してください" }),
  productConditionId: z.string({
    invalid_type_error: "商品の状態を選択してください",
  }),
  price: z
    .string()
    .refine((price) => Number(price) < 300, {
      message: "価格は300円以上で入力してください",
    })
    .refine((price) => Number(price) > 10000, {
      message: "価格は10,000,000円以下で入力してください",
    }),
  description: z
    .string()
    .min(1, { message: "商品の説明は必須です" })
    .max(1000, { message: "商品の説明は1000文字以内で入力してください" }),
  postageIsIncluded: z.string({ invalid_type_error: "送料を選択してください" }),
  shippingDaysId: z.string({
    invalid_type_error: "発送日数を選択してください",
  }),
  shippingMethodId: z
    .string({ invalid_type_error: "発送方法を選択してください" })
    .min(1, { message: "発送方法を選択してください" }),
  imageFiles: z
    .array(z.custom<File>())
    .nonempty({ message: "画像は必須です" })
    .max(10, { message: "画像は10枚まで選択できます" }),
  tags: z.string(),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
  isPublic: z.string().regex(/true|false/, {
    message: "公開するかどうかを選択してください",
  }),
});
