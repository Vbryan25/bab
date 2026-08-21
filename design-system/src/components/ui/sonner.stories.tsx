import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"

import { Toaster } from "./sonner"
import { Button } from "./button"

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Button onClick={() => toast.success("Conversation closed")}>
        Show toast
      </Button>
      <Toaster />
    </div>
  ),
}
