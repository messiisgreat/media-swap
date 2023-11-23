import { useDialog } from "@/components/dialog";
import Image from "next/image";
import { useCallback } from "react";

/**
 * 画像を拡大してモーダル表示するためのフック
 * 画面外タップで閉じる
 * @param imageUrl - 表示する画像のURL
 */
export const useImageModal = (imageUrl: string) => {
  const { open, close, Dialog } = useDialog();

  const ImageModal = useCallback(
    () => (
      <Dialog>
        <Image src={imageUrl} alt="拡大した画像" height={360} width={360} />
      </Dialog>
    ),
    [Dialog, imageUrl],
  );

  return { open, close, ImageModal };
};
