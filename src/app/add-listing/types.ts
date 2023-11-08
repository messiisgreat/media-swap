export type ProductFormData = {
  productName: string;
  productConditionId: string;
  price: number;
  description: string;
  postageId: string;
  shippingDaysId: string;
  shippingMethodId: string;
  imageFiles: File[];
  tags: string;
};
