import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

const meta = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="w-100 rounded-lg border">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            Close conversation
            <CommandShortcut>⌘⇧C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Grant extra time
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigate">
          <CommandItem>Go to Inbox</CommandItem>
          <CommandItem>Go to Reports</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
