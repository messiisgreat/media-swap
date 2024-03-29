import { LikeButtonRenderer } from "@/app/(contents)/item/[itemId]/_components/likeButton/LikeButtonRenderer";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: LikeButtonRenderer,
} satisfies Meta<typeof LikeButtonRenderer>;

type Story = StoryObj<typeof LikeButtonRenderer>;

export const Default: Story = {
  args: {
    count: 0,
    isLiked: false,
    loading: false,
  },
};

export const Liked: Story = {
  args: {
    count: 1,
    isLiked: true,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    count: 2,
    isLiked: false,
    loading: true,
  },
};

export const LikedLoading: Story = {
  args: {
    count: 3,
    isLiked: true,
    loading: true,
  },
};
