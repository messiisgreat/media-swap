import { strToBool } from "@/utils/converter";

describe("converter", () => {
  test("文字列falseがfalseになること", () =>
    expect(strToBool("false")).toBe(false));
  test("文字列trueがtrueになること", () =>
    expect(strToBool("true")).toBe(true));
  test("文字列0がfalseになること", () => expect(strToBool("0")).toBe(false));
  test("文字列1がtrueになること", () => expect(strToBool("1")).toBe(true));
  test("空文字列がfalseになること", () => expect(strToBool("")).toBe(false));
});
