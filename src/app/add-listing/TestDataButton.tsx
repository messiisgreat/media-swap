
import { Button } from "@/components"

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
setTestDataWithQuerySelector("#description", "これは試験商品の説明です。");
setTestDataWithQuerySelector("#postageIsIncluded", "1");
setTestDataWithQuerySelector("#shippingDaysId", "1");
setTestDataWithQuerySelector("#shippingMethodId", "1");
}

type Props = ComponentProps<typeof Button>

export const TestFataButton = (props:Props) => {
    return (
<Button onClick={handleClick} {...props} >試験データ設定</Button>
    )}
