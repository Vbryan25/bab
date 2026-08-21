import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { SettingsIntegrationsPage } from "./SettingsIntegrationsPage"

const meta = {
  title: "Pages/Settings Integrations",
  component: SettingsIntegrationsPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SettingsIntegrationsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="settings" onSelect={() => {}}>
      <SettingsIntegrationsPage />
    </AppShell>
  ),
}
