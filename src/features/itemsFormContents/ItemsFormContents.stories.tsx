import { Meta, StoryObj } from "@storybook/react";

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
    detailsContentsProps: {
      productName: "",
      productConditionId: "",
      description: "",
      tags: [],
    },
    deliveryContentsProps: {
      postageIsIncluded: "",
      shippingMethodId: "",
      shippingDaysId: "",
      price: "",
    },
  },
};

export const Filled: Story = {
  args: {
    detailsContentsProps: {
      productName: "商品名",
      productConditionId: "1",
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
    },
    deliveryContentsProps: {
      postageIsIncluded: "1",
      shippingMethodId: "1",
      shippingDaysId: "1",
      price: "300",
    },
  },
};
