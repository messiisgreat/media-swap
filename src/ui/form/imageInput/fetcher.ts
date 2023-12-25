/**
 * ダミーの画像を取得する
 */
export const fetchImageAndConvertToFile = async (): Promise<File> => {
  const response = await fetch("https://picsum.photos/200/200");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const blob = await response.blob();
  return new File([blob], `image-${Math.floor(Math.random() * 100000)}.jpg`, {
    type: blob.type,
  });
};
