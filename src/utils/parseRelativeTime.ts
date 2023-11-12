// https://panda-program.com/posts/ts-diff-time
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInYears from "date-fns/differenceInYears";
import format from "date-fns/format";
import { utcToZonedTime } from "date-fns-tz";

/**
 * 相対時間を計算する
 * @param target 時間
 * @returns 相対時間の文字列
 */
export const parseRelativeTime = (target: Date): string => {
  const base = new Date();
  const diffInSecs = differenceInSeconds(base, target);
  if (diffInSecs < 60) {
    return `${diffInSecs}秒前`;
  }

  const diffInMins = differenceInMinutes(base, target);
  if (diffInMins < 60) {
    return `${diffInMins}分前`;
  }

  const diffInHours = differenceInHours(base, target);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = differenceInDays(base, target);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  const diffInWeeks = differenceInWeeks(base, target);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}週間前`;
  }

  const diffInMonths = differenceInMonths(base, target);
  // 4週間前でも 0ヶ月前と表示されるため、条件を足して絞り込む
  if (diffInWeeks >= 4 && diffInMonths < 2) {
    return `1ヶ月前`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}ヶ月前`;
  }

  const diffInYears = differenceInYears(base, target);

  return `${diffInYears}年前`;
};

/**
 * 「今日 10:00」や「2023/01/01 10:00」のような形式に変換する
 * @param target 日付
 * @returns 
 */
export const parseFixedDateTime = (target: Date): string => {
  target = utcToZonedTime(target, "Asia/Tokyo");
  const today = utcToZonedTime(new Date(), "Asia/Tokyo");
  const yesterday = utcToZonedTime(new Date(), "Asia/Tokyo");
  yesterday.setDate(today.getDate() - 1);

  // eslint-disable-next-line no-restricted-syntax
  let date = "";
  // 今日の場合は「今日」と表示
  if (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  ) {
    date = "今日";
  } else if (
    target.getFullYear() === yesterday.getFullYear() &&
    target.getMonth() === yesterday.getMonth() &&
    target.getDate() === yesterday.getDate()
  ) {
    date = "昨日";
  } else {
    date = format(target, "yyyy/MM/dd");
  }

  return `${date} ${format(target, "HH:mm")}`;
};
