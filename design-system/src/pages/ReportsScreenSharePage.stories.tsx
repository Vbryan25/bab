import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsScreenSharePage } from "./ReportsScreenSharePage"

const meta = {
  title: "Pages/Reports Screen Share",
  component: ReportsScreenSharePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsScreenSharePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsScreenSharePage />
    </AppShell>
  ),
}
