import { generateKeyGuard, isArrayOfFiles } from "@/utils/typeGuard";

describe("isArrayOfFiles", () => {
  test("配列の要素が全てFileの場合、trueを返す", () => {
    const arr = [new File([""], "filename"), new File([""], "filename")];
    expect(isArrayOfFiles(arr)).toBe(true);
  });

  test("配列の要素の一部がFileでない場合、falseを返す", () => {
    const arr = [
      new File([""], "filename"),
      new File([""], "filename"),
      new Blob([""], { type: "text/plain" }),
    ];
    expect(isArrayOfFiles(arr)).toBe(false);
  });

  test("配列でない場合、falseを返す", () => {
    const file = new File([""], "filename");
    expect(isArrayOfFiles(file)).toBe(false);
  });
});

describe("generateKeyGuard", () => {
  test("生成した関数で、存在するキーを判定した際にtrueを返す", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    const isKey = generateKeyGuard(obj);
    expect(isKey("key1")).toBe(true);
    expect(isKey("key2")).toBe(true);
    expect(isKey("key3")).toBe(true);
  });

  test("生成した関数で、存在しないキーを判定した際にfalseを返す", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    const isKey = generateKeyGuard(obj);
    expect(isKey("key4")).toBe(false);
    expect(isKey(1)).toBe(false);
    expect(isKey(obj)).toBe(false);
    expect(isKey(undefined)).toBe(false);
  });
});
