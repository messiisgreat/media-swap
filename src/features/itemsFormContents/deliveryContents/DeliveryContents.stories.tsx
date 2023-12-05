import { Meta, StoryObj } from "@storybook/react";

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
    postageIsIncluded: "",
    shippingMethodId: "",
    shippingDaysId: "",
    price: "",
  },
};

export const Filled: Story = {
  args: {
    postageIsIncluded: "1",
    shippingMethodId: "1",
    shippingDaysId: "1",
    price: "300",
  },
};
