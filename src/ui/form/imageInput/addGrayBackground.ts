/**
 * 画像に灰色の背景を追加して, 短い辺を長い辺と同じ長さにする
 * @param file ドロップされたファイル
 */
export const addGrayBackground = (file: File): Promise<File> =>
  new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.setAttribute("src", objectUrl);

    // onloadをsetする方法が現状ないため無効化（回避策あれば修正予定）
    // eslint-disable-next-line functional/immutable-data
    img.onload = () => {
      // オブジェクトURLの解放
      URL.revokeObjectURL(objectUrl);
      const maxLength = Math.max(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", maxLength.toString());
      canvas.setAttribute("height", maxLength.toString());
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not create canvas context."));
        return;
      }

      // 灰色の背景を設定
      // fillStyleをsetする方法が現状ないため無効化（回避策あれば修正予定）
      // eslint-disable-next-line functional/immutable-data
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, maxLength, maxLength);

      // 画像を中央に配置
      const offsetX = (maxLength - img.width) / 2;
      const offsetY = (maxLength - img.height) / 2;
      ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed."));
            return;
          }
          resolve(
            new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            }),
          );
        },
        "image/jpeg",
        1,
      );
    };
    // onerrorをsetする方法が現状ないため無効化（回避策あれば修正予定）
    // eslint-disable-next-line functional/immutable-data
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image loading error."));
    };
  });
