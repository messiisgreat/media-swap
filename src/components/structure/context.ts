import { createContext, useContext } from "react";

export const HeadingLevelContext = createContext({ level: 1 });

/**
 * Headingのレベルを取得する
 * @returns
 */
export const useLevel = () => {
  const context = useContext(HeadingLevelContext);
  return context.level;
};
