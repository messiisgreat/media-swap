export type ZipCloudResult = {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
};

/** 郵便番号APIのレスポンス */
export type ZipCloudResponse = {
  message: string | null;
  results: Array<ZipCloudResult>;
};
