import { useEffect, useState } from "react";

/**
 * 指定した要素の高さを取得するReactフック
 * @param ref 要素の参照
 */
export const useDescriptionHeight = (ref: React.RefObject<HTMLElement>) => {
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setDescriptionHeight(ref.current.clientHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [ref]);

  return descriptionHeight;
};
