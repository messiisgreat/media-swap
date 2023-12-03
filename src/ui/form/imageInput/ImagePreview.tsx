import { useImageModal } from "@/ui/dialog";
import Image from "next/image";

type Props = {
  file: File & { preview: string };
};

/**
 * 画像をプレビュー表示する
 */
export const ImagePreview = ({ file }: Props) => {
  const { open, ImageModal } = useImageModal(file.preview);
  return (
    <>
      <Image
        src={file.preview}
        alt={file.name}
        width={80}
        height={80}
        onClick={open}
      />
      <ImageModal />
    </>
  );
};
