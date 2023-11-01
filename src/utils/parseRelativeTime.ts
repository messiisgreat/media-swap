import "dayjs/locale/ja";
import dayjs, { locale, extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

locale("ja");
extend(relativeTime);

/**
 * Dateを「5分前」や「1週間前」などといった相対表記にする
 * @param date Date
 * @returns 相対表記の文字列
 */
export const parseRelativeTime = (date: Date): string => {
  return dayjs(date).fromNow();
};