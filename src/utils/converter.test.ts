import { binaryToDecimal, decimalToBinary, strToBool } from "@/utils/converter"; // 関数が定義されたモジュールをインポート

describe("strToBool", () => {
  test("文字列falseがfalseになること", () =>
    expect(strToBool("false")).toBe(false));
  test("文字列trueがtrueになること", () =>
    expect(strToBool("true")).toBe(true));
  test("文字列0がfalseになること", () => expect(strToBool("0")).toBe(false));
  test("文字列1がtrueになること", () => expect(strToBool("1")).toBe(true));
  test("空文字列がfalseになること", () => expect(strToBool("")).toBe(false));
});

describe("decimalToBinary", () => {
  const length = 4;

  // 同値分析
  test("整数8が4桁の2進数[false, true, true, true]になること", () => {
    expect(decimalToBinary(8, length)).toEqual([false, true, true, true]);
  });

  // 境界値分析
  test("整数0が4桁の2進数[true, true, true, true]になること", () => {
    expect(decimalToBinary(0, length)).toEqual([true, true, true, true]);
  });

  test("整数1が4桁の2進数[true, true, true, false]になること", () => {
    expect(decimalToBinary(1, length)).toEqual([true, true, true, false]);
  });

  test("整数15が4桁の2進数[true, true, true, true]になること", () => {
    expect(decimalToBinary(15, length)).toEqual([false, false, false, false]);
  });
});

describe("binaryToDecimal", () => {
  // 同値分析
  test("2進数[false, true, true, true]が整数8になること", () => {
    expect(binaryToDecimal([false, true, true, true])).toBe(8);
  });

  // 境界値分析
  test("2進数[true, true, true, true]が整数0になること", () => {
    expect(binaryToDecimal([true])).toBe(0);
  });

  test("2進数[true, true, true, false]が整数1になること", () => {
    expect(binaryToDecimal([false])).toBe(1);
  });

  test("2進数[false, false, false, false]が整数15になること", () => {
    expect(binaryToDecimal([false, false, false, false])).toBe(15);
  });
});
