import { type Meta, type StoryObj } from "@storybook/react";

import { DeliveryContents } from "@/features/itemsFormContents/deliveryContents/DeliveryContents";

export default {
  component: DeliveryContents,
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
} satisfies Meta<typeof DeliveryContents>;

type Story = StoryObj<typeof DeliveryContents>;

export const Empty: Story = {
  args: {
    isShippingIncluded: "",
    shippingMethodCode: "",
    shippingMethodCustom: "",
    shippingDaysCode: "",
    price: "",
  },
};

export const Filled: Story = {
  args: {
    isShippingIncluded: "1",
    shippingMethodCode: "1",
    shippingMethodCustom: "",
    shippingDaysCode: "1",
    price: "300",
  },
};
