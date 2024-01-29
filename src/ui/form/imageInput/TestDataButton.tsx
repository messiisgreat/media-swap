"use client";

/* eslint-disable react/jsx-no-bind */
// ランダムな値を返す関数を使用しているため無効化
import { type ComponentProps } from "react";

import {
  CONDITION,
  PRICE_LIMIT,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/item";
import { Button } from "@/ui";

const setTestData = (selector: string, testData: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    if (element instanceof HTMLInputElement) {
      element.setAttribute("value", testData);
    } else if (
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      // eslint-disable-next-line functional/immutable-data
      element.value = testData;
    } else {
      throw new Error("Element is not input, select or textarea.");
    }
  } else {
    throw new Error("Element is not found.");
  }
};

const generateRandomCode = (constant: { [key: string]: string }): string => {
  const keys = Object.keys(constant);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex] === "99"
    ? (randomIndex - 1).toString()
    : randomIndex.toString();
};

type Props = ComponentProps<typeof Button>;

/**
 * 試験データ設定ボタン
 * @param props ボタンのprops
 */
export const TestDataButton = (props: Props) => {
  const handleClick = () => {
    setTestData("[name=name]", "テストデータ");
    setTestData("[name=conditionCode]", generateRandomCode(CONDITION));
    setTestData(
      "[name=price]",
      Math.floor(
        Math.random() * (PRICE_LIMIT.MAX - PRICE_LIMIT.MIN) + PRICE_LIMIT.MIN,
      ).toString(),
    );
    setTestData("textarea[name=description]", "これは試験商品の説明です。");
    setTestData(
      "[name=isShippingIncluded]",
      Math.floor(Math.random() * 2).toString(),
    );
    setTestData("[name=shippingDaysCode]", generateRandomCode(SHIPPING_DAYS));
    setTestData(
      "[name=shippingMethodCode]",
      generateRandomCode(SHIPPING_METHOD),
    );
  };
  return (
    <Button onClick={handleClick} {...props}>
      試験データ設定
    </Button>
  );
};
