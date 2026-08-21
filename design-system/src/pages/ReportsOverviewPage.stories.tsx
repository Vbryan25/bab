import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsOverviewPage } from "./ReportsOverviewPage"

const meta = {
  title: "Pages/Reports Overview",
  component: ReportsOverviewPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsOverviewPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsOverviewPage />
    </AppShell>
  ),
}
