import { SalesHistoryPresenter } from "@/features/salesHistory/SalesHistoryPresenter";
import logo from "@/images/logo.png";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: SalesHistoryPresenter,
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SalesHistoryPresenter>;

type Story = StoryObj<typeof SalesHistoryPresenter>;

export const Incomings: Story = {
  args: {
    id: 1,
    title: "販売利益",
    date: "2023/3/11 08:23",
    price: (4000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
    imageUrl: logo.src,
  },
};

export const Outgoings: Story = {
  args: {
    id: 1,
    title: "商品購入",
    date: "2023/8/01 10:06",
    price: (-2800).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
    imageUrl: logo.src,
  },
};
