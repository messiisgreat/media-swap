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
};

export const productFormData: ProductFormData = {
  productName: "",
  productConditionId: "",
  price: 0,
  description: "",
  postageIsIncluded: "",
  shippingDaysId: "",
  shippingMethodId: "",
  imageFiles: [],
  tags: "",
};
