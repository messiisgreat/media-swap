import type { PartialStoryFn } from "@storybook/addon-essentials";
import type { Preview } from "@storybook/react";
import { ReactRenderer } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";

export const decorators = [
  (Story: PartialStoryFn<ReactRenderer>) => (
    <div className="flex h-full flex-col items-center bg-gray-300 py-16">
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    tags: ["autodocs"],
  },
};

export default preview;
