import { ItemInformation } from "@/app/(contents)/item/[id]/_components/itemInformation/ItemInformation";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: ItemInformation,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center bg-gray-300 py-16 [&>*]:max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ItemInformation>;

type Story = StoryObj<typeof ItemInformation>;

export const Default: Story = {
  args: {
    item: {
      id: "1",
      name: "商品名",
      conditionCode: "1",
      description: "商品説明",
      tags: [
        {
          id: "1",
          itemId: "1",
          tagId: "1",
          tag: {
            id: "1",
            text: "タグ名",
            createdAt: new Date(),
          },
        },
      ],
      isShippingIncluded: true,
      shippingMethodCode: "1",
      shippingDaysCode: "1",
      shippingMethodCustom: "",
      price: 300,
      isPublic: true,
      createdAt: new Date(),
      isDeleted: false,
      pageView: 0,
      previousPrice: null,
      sellerId: "1",
      updatedAt: new Date(),
      transaction: null,
      images: [],
    },
  },
};
