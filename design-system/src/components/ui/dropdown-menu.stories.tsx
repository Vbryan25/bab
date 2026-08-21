import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"

const meta = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">All statuses</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuItem>Closed</DropdownMenuItem>
        <DropdownMenuItem>Escalated</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const CheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">All categories</Button>} />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem checked>Human Support</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>AI & Automation</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Proctoring</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
