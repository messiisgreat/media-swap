import { TabMenu } from "@/ui/tabmenu/TabMenu";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: TabMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-full flex-col items-center bg-white py-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabMenu>;

type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
  args: {
    pages: [
      {
        title: "出品関連",
        url: "/a",
      },
      {
        title: "個人情報",
        url: "/",
      },
      {
        title: "売上管理",
        url: "/c",
      },
      {
        title: "その他",
        url: "/d",
      },
    ],
  },
};
