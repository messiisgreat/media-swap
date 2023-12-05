import Image from "next/image";

import { useImageModal } from "@/ui/dialog";

type Props = {
  /** プレビューする画像ファイルとそのURL */
  file: File & { preview: string };
};

/**
 * 画像をプレビュー表示する
 */
export const ImagePreview = ({ file }: Props) => {
  const { open, ImageModal } = useImageModal(file.preview);
  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={file.preview}
        alt={file.name}
        width={200}
        height={200}
        onClick={open}
      />
      <ImageModal />
    </div>
  );
};
