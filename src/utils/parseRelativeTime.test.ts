import { parseRelativeTime } from "@/utils/parseRelativeTime";

describe("parseRelativeTime", () => {
  test("1秒前の場合、'1秒前'が返されること", () => {
    const target = new Date();
    target.setSeconds(target.getSeconds() - 1);
    expect(parseRelativeTime(target)).toBe("1秒前");
  });

  test("1分前の場合、'1分前'が返されること", () => {
    const target = new Date();
    target.setMinutes(target.getMinutes() - 1);
    expect(parseRelativeTime(target)).toBe("1分前");
  });

  test("1時間前の場合、'1時間前'が返されること", () => {
    const target = new Date();
    target.setHours(target.getHours() - 1);
    expect(parseRelativeTime(target)).toBe("1時間前");
  });

  test("1日前の場合、'1日前'が返されること", () => {
    const target = new Date();
    target.setDate(target.getDate() - 1);
    expect(parseRelativeTime(target)).toBe("1日前");
  });

  test("1週間前の場合、'1週間前'が返されること", () => {
    const target = new Date();
    target.setDate(target.getDate() - 7);
    expect(parseRelativeTime(target)).toBe("1週間前");
  });

  test("1ヶ月前の場合、'1ヶ月前'が返されること", () => {
    const target = new Date();
    target.setMonth(target.getMonth() - 1);
    expect(parseRelativeTime(target)).toBe("1ヶ月前");
  });

  test("1年前の場合、'1年前'が返されること", () => {
    const target = new Date();
    target.setFullYear(target.getFullYear() - 1);
    expect(parseRelativeTime(target)).toBe("1年前");
  });
});
