import { AgeCheckContents } from "@/app/age-check/AgeCheckContents";
import { Meta, StoryObj } from "@storybook/react";

export default {
  component: AgeCheckContents,
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
} satisfies Meta<typeof AgeCheckContents>;

type Story = StoryObj<typeof AgeCheckContents>;
export const Primary: Story = {};
