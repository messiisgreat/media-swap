// storybook button component
import { KebabButton } from "@/ui/buttons";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: KebabButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KebabButton>;

type Story = StoryObj<typeof KebabButton>;

export const Default: Story = {
  args: {
    children: "ボタン",
    className: "bg-white",
  },
};
