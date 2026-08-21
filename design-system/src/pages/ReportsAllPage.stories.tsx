import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsAllPage } from "./ReportsAllPage"

const meta = {
  title: "Pages/Reports All",
  component: ReportsAllPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsAllPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsAllPage />
    </AppShell>
  ),
}
