import { failure, success, type Result } from "@/lib/result";

describe("Result型", () => {
  describe("success", () => {
    test("成功時の値が正しく格納されること", () => {
      const value = 123;
      const result: Result<number> = success(value);

      expect(result).toStrictEqual({
        isSuccess: true,
        isFailure: false,
        value: value,
      });
    });

    test("値がない場合はundefinedが格納されること", () => {
      const result: Result<number> = success();

      expect(result).toStrictEqual({
        isSuccess: true,
        isFailure: false,
        value: undefined,
      });
    });
  });

  describe("failure", () => {
    test("失敗時のエラーが正しく格納されること", () => {
      const error = "Something went wrong";
      const result: Result<string, string> = failure(error);

      expect(result).toStrictEqual({
        isSuccess: false,
        isFailure: true,
        error: error,
      });
    });

    test("値がない場合はundefinedが格納されること", () => {
      const result: Result<number> = success();

      expect(result).toStrictEqual({
        isSuccess: true,
        isFailure: false,
        value: undefined,
      });
    });
  });
});
