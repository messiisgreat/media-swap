import { Button } from "@/components";
import {
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { ComponentProps } from "react";

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

const generateRandomId = (constant: { id: string; name: string }[]): string => {
  return constant[Math.floor(Math.random() * constant.length)].id.toString();
};

async function fetchImageAsFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

type Props = ComponentProps<typeof Button>;

/**
 * 試験データ設定ボタン
 * @param props ボタンのprops
 */
export const TestDataButton = (props: Props) => {
  const handleClick = () => {
    setTestData("[name=productName]", "テストデータ");
    setTestData(
      "[name=productConditionId]",
      generateRandomId(PRODUCT_CONDITION),
    );
    setTestData(
      "[name=price]",
      Math.floor(Math.random() * 999700 + 300).toString(),
    );
    setTestData("textarea[name=description]", "これは試験商品の説明です。");
    setTestData(
      "[name=postageIsIncluded]",
      Math.floor(Math.random() * 2).toString(),
    );
    setTestData("[name=shippingDaysId]", generateRandomId(SHIPPING_DAYS));
    setTestData("[name=shippingMethodId]", generateRandomId(SHIPPING_METHOD));

    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = 'image/*';
    newInput.multiple = true;
    newInput.style.display = 'none';
    newInput.tabIndex = -1;
    newInput.className = 'hidden';
    newInput.name = 'imageFiles';
  };
  return (
    <>
    <Button onClick={handleClick} {...props}>
      試験データ設定
    </Button>
    </>
  );
};
