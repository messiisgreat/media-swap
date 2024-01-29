// storybook button component
import { Button } from "@/ui/buttons";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "ボタン",
  },
};
