import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { InboxPage } from "./InboxPage"

const meta = {
  title: "Pages/Inbox",
  component: InboxPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InboxPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="inbox" onSelect={() => {}}>
      <InboxPage />
    </AppShell>
  ),
}
