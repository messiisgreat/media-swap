import React from "react";

type TitleUnderbarProps = {
  title: string;
};

/**
 * タイトルとオプションの下線の色を持つタイトルアンダーバーコンポーネント
 *
 * @param {TitleUnderbarProps} props - タイトルアンダーバーコンポーネントのプロパティ
 * @param {string} props.title - タイトルアンダーバーのタイトル
 * @returns {ReactElement} レンダリングされたタイトルアンダーバーコンポーネント
 */
export const TitleUnderbar: React.FC<TitleUnderbarProps> = ({ title }) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="section-title">
      <h2 className="mb-3 text-lg">{title}</h2>
      <style jsx>{`
        .section-title {
          position: relative;
        }
        .section-title::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(163, 169, 174, 0.3);
        }
      `}</style>
    </div>
  );
};
