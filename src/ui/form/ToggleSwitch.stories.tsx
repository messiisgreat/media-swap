import { ToggleSwitch } from "@/ui/form/ToggleSwitch";
import { type Meta } from "@storybook/react";

export default {
  component: ToggleSwitch,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center  bg-gray-300 py-16 [&>*]:max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleSwitch>;

export const Default = {
  args: {
    labelText: "ラベル",
  },
};

export const Checked = {
  args: {
    labelText: "ラベル",
    checked: true,
  },
};

export const Disabled = {
  args: {
    labelText: "ラベル",
    disabled: true,
  },
};
