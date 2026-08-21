import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsRoomScanPage } from "./ReportsRoomScanPage"

const meta = {
  title: "Pages/Reports Room Scan",
  component: ReportsRoomScanPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsRoomScanPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsRoomScanPage />
    </AppShell>
  ),
}
