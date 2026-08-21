import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Search conversations...",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Readonly: Story = {
  args: { readOnly: true, value: "student@cascade.edu" },
}

export const Disabled: Story = {
  args: { disabled: true },
}
