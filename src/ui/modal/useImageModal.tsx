import { useCallback } from "react";

import Image from "next/image";

import { useDialog } from "@/ui/modal/dialog/useDialog";
import { useSetModal } from "@/ui/modal/modalProvider";

/**
 * 画像を拡大してモーダル表示するためのフック
 * 画面外タップで閉じる
 * @param imageUrl - 表示する画像のURL
 */
export const useImageModal = (imageUrl: string) => {
  const { handleOpen, handleClose, Dialog } = useDialog();

  const ImageModal = useCallback(
    () => (
      <Dialog>
        <Image src={imageUrl} alt="拡大した画像" height={360} width={360} />
      </Dialog>
    ),
    [Dialog, imageUrl],
  );

  useSetModal(<ImageModal />);

  return { handleOpen, handleClose };
};
