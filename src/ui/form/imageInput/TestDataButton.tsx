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
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      element.value = testData;
    } else {
      console.error(`Unsupported element type for selector ${selector}.`);
    }
  } else {
    console.error(`Element with selector ${selector} not found.`);
  }
};

const generateRandomCode = (constant: { [key: string]: string }): string => {
  const keys = Object.keys(constant);
  return Math.floor(Math.random() * keys.length).toString();
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
