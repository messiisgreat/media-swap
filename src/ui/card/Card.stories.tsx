import { Card } from "@/ui/card/Card";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "カードの中身",
  },
};

export const WithClassName: Story = {
  args: {
    children: "カードの中身",
    className: "border-2 border-red-500",
  },
};
