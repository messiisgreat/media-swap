import { CommentLoading } from "@/app/(contents)/item/[id]/_components/commentContainer/CommentLoading";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: CommentLoading,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CommentLoading>;

type Story = StoryObj<typeof CommentLoading>;

export const Default: Story = {
  args: {},
};
