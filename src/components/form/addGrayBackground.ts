/**
 * 画像に灰色の背景を追加して, 短い辺を長い辺と同じ長さにする
 * @param file ドロップされたファイル
 */
export async function addGrayBackground(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target || !event.target.result) {
        reject(new Error ("FileReader did not load the file."));
        return;
      }

      const img = new window.Image();
      img.src = event.target.result as string;
      img.onload = () => {
        const maxLength = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = maxLength;
        canvas.height = maxLength;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error("Could not create canvas context."));
          return;
        }

        // 灰色の背景を設定
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, maxLength, maxLength);

        // 画像を中央に配置
        const offsetX = (maxLength - img.width) / 2;
        const offsetY = (maxLength - img.height) / 2;
        ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed."));
            return;
          }
          resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
        }, 'image/jpeg', 1);
      };
      img.onerror = () => reject(new Error("Image loading error."));
    };
    reader.onerror = () => reject(new Error("FileReader error."));
    reader.readAsDataURL(file);
  });
}