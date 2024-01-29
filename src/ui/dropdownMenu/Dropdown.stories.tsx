import { MeetballsButton } from "@/ui/buttons/iconButton";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: DropdownContainer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownContainer>;

type Story = StoryObj<typeof DropdownContainer>;

export const Default: Story = {
  args: {
    children: (
      <DropdownItem
        menuItems={Array.from({ length: 5 }, (_, i) => (
          <div key={i}>メニュー{i}</div>
        ))}
      >
        <MeetballsButton className="bg-white" />
      </DropdownItem>
    ),
  },
};
