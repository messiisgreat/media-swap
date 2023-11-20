import { Button } from "@/components";
import { ComponentProps } from "react";

function setTestData(selector: string, testData: string): void {
  const element = document.querySelector(selector);

  if (element) {
    element.value = testData;
  } else {
    console.error(`Element with selector ${selector} not found.`);
  }
}

const handleClick = () => {
  setTestData("#productName", "試験商品");
  setTestData("#productConditionId", "1");
  setTestData("#price", "999");
  setTestData("#description", "これは試験商品の説明です。");
  setTestData("#postageIsIncluded", "1");
  setTestData("#shippingDaysId", "1");
  setTestData("#shippingMethodId", "1");
};

type Props = ComponentProps<typeof Button>;

/**
 * 試験データ設定ボタン
 * @param props ボタンのprops
 */
export const TestDataButton = (props: Props) => {
  return (
    <Button onClick={handleClick} {...props}>
      試験データ設定
    </Button>
  );
};
