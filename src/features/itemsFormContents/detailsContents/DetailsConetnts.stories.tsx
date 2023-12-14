import { type Meta, type StoryObj } from "@storybook/react";

import { DetailsContents } from "@/features/itemsFormContents/detailsContents/DetailsContents";

export default {
  component: DetailsContents,
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
} satisfies Meta<typeof DetailsContents>;

type Story = StoryObj<typeof DetailsContents>;

export const Empty: Story = {
  args: {
    name: "",
    conditionCode: "",
    description: "",
    tags: [],
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
  },
};
