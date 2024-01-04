import Image from "next/image";
import { memo, useCallback } from "react";

type Props = {
  /** 画像のsrc */
  src: string;
  /** 画像のインデックス */
  index: number;
  /** 画像の選択状態 */
  selected: boolean;
  /** 画像をクリックしたときの処理 */
  onClick: (e: React.MouseEvent<HTMLElement>, index: number) => void;
};

/**
 * カルーセル内に表示されるスライド画像
 */
export const SlideImage = memo(({ src, index, selected, onClick }: Props) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onClick(e, index);
    },
    [index, onClick],
  );

  return (
    <Image
      role="button"
      aria-label="表示画像選択"
      className={`block cursor-pointer touch-manipulation transition-opacity duration-200
                                ${selected ? "opacity-100" : "opacity-20"}
                                `}
      src={src}
      alt={`サムネイル-${index}`}
      width={100}
      height={100}
      onClick={handleClick}
    />
  );
});

SlideImage.displayName = "SlideImage";
