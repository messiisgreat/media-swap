import { isToday, isYesterday } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInYears from "date-fns/differenceInYears";
import format from "date-fns/format";

/**
 * 現在時刻からの相対時間を計算する
 * 60秒未満なら「○秒前」、60分未満なら「○分前」、24時間未満なら「○時間前」、7日未満なら「○日前」、4週間未満なら「○週間前」、12ヶ月未満なら「○ヶ月前」、12ヶ月以上なら「○年前」を返す
 * @param target 時間
 * @returns 相対時間の文字列
 * @see https://panda-program.com/posts/ts-diff-time
 */
export const parseRelativeTime = (target: Date): string => {
  const base = new Date();
  // 早期リターンで上の条件を優先する
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
  const timeZone = "Asia/Tokyo";
  target = utcToZonedTime(target, timeZone);

  const formattedTime = format(target, "HH:mm");

  if (isToday(target)) {
    return `今日 ${formattedTime}`;
  }

  if (isYesterday(target)) {
    return `昨日 ${formattedTime}`;
  }

  return `${format(target, "yyyy/MM/dd")} ${formattedTime}`;
};
