import { useState, useEffect } from 'react';

/**
 * スクロール中かどうかを判定するReactフック
 * @param {number } [delay] - スクロール停止後に表示を切り替えるまでの遅延時間（ミリ秒）
 * @returns {boolean} - スクロール中かどうかを示す状態
 */
export const useScrollingState = (delay: number = 200): boolean => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  // eslint-disable-next-line no-restricted-syntax
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isScrolling;
};
