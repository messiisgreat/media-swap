import { failure, success, type Result } from "@/lib/result/result";

describe("Result型", () => {
  describe("success", () => {
    test("成功時の値が正しく格納されること", () => {
      const value = 123;
      const result: Result<number> = success(value);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(value);
    });

    test("値が指定されない場合、undefinedが格納され正しく結果が取得できること", () => {
      const result: Result<number> = success();
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBeUndefined();
    });
  });

  describe("failure", () => {
    test("失敗時のエラーが正しく格納されること", () => {
      const error = "Something went wrong";
      const result: Result<string, string> = failure(error);
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe(error);
    });

    test("エラーが指定されない場合、undefinedが格納され正しく結果が取得できること", () => {
      const result: Result<string, string> = failure();
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
