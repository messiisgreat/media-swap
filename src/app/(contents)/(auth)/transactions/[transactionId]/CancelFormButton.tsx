"use client";

type Props = {
  /** className */
  className?: string;
};

/**
 * 
 * 取引画面のキャンセルフォームボタン
 */
export const CancelFormButton = ({
  className = "",
}: Props) => {
  return (
      <button className={className}>
        運営への問合わせ
      </button>
  );
};