import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsLockdownBrowserPage } from "./ReportsLockdownBrowserPage"

const meta = {
  title: "Pages/Reports Lockdown Browser",
  component: ReportsLockdownBrowserPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsLockdownBrowserPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsLockdownBrowserPage />
    </AppShell>
  ),
}
