// storybook button component
import { MeetballsButton } from "@/ui/buttons";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: MeetballsButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MeetballsButton>;

type Story = StoryObj<typeof MeetballsButton>;

export const Default: Story = {
  args: {
    children: "ボタン",
    className: "bg-white",
  },
};
