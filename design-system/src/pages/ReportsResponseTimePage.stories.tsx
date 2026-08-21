import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsResponseTimePage } from "./ReportsResponseTimePage"

const meta = {
  title: "Pages/Reports Response Time",
  component: ReportsResponseTimePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsResponseTimePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsResponseTimePage />
    </AppShell>
  ),
}
