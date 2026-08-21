import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsConversationsByRolePage } from "./ReportsConversationsByRolePage"

const meta = {
  title: "Pages/Reports Conversations By Role",
  component: ReportsConversationsByRolePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsConversationsByRolePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsConversationsByRolePage />
    </AppShell>
  ),
}
