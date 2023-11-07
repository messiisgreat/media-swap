// https://panda-program.com/posts/ts-diff-time
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInYears from "date-fns/differenceInYears";

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
