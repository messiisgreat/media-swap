import { failure, success, type Result } from "@/lib/result";

describe("Result型", () => {
  type TestType = {
    foo: string;
  };

  describe("success", () => {
    test("成功時の値が正しく格納されること", () => {
      const value = 123;
      const result: Result<number> = success(value);

      expect(result).toMatchObject({
        isSuccess: true,
        isFailure: false,
        value: value,
      });
    });

    test("isSuccessで絞り込んだあとの型が正しいこと", () => {
      const value: TestType = {
        foo: "bar",
      };
      const result: Result<TestType> = success(value);

      if (result.isSuccess) {
        expect(result.value).toBeInstanceOf(Object);
      }
    });

    test("値がない場合はundefinedが格納されること", () => {
      const result: Result<number> = success();

      expect(result).toMatchObject({
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

      expect(result).toMatchObject({
        isSuccess: false,
        isFailure: true,
        error: error,
      });
    });

    test("isFailureで絞り込んだあとの型が正しいこと", () => {
      const error: TestType = {
        foo: "bar",
      };
      const result: Result<string, TestType> = failure(error);

      if (result.isFailure) {
        expect(result.error).toBeInstanceOf(Object);
      }
    });
  });
});
