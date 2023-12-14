import { type Meta, type StoryObj } from "@storybook/react";

import { ItemsFormContents } from "@/features/itemsFormContents/ItemsFormContents";

export default {
  component: ItemsFormContents,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="my-16 flex flex-col items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ItemsFormContents>;

type Story = StoryObj<typeof ItemsFormContents>;

export const Empty: Story = {
  args: {
    name: "",
    conditionCode: "",
    description: "",
    tags: [],
    isShippingIncluded: "",
    shippingMethodCode: "",
    shippingMethodCustom: "",
    shippingDaysCode: "",
    price: "",
  },
};

export const Filled: Story = {
  args: {
    name: "商品名",
    conditionCode: "1",
    description: "商品説明",
    tags: [
      {
        id: "1",
        text: "タグ名",
        createdAt: new Date(),
      },
    ],
    selectedTags: [
      {
        id: "1",
        text: "タグ名",
        createdAt: new Date(),
      },
    ],
    isShippingIncluded: "1",
    shippingMethodCode: "1",
    shippingDaysCode: "1",
    shippingMethodCustom: "",
    price: "300",
  },
};
