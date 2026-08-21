import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { KnowledgeSourcesPage } from "./KnowledgeSourcesPage"

const meta = {
  title: "Pages/Knowledge Sources",
  component: KnowledgeSourcesPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KnowledgeSourcesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="knowledge" onSelect={() => {}}>
      <KnowledgeSourcesPage />
    </AppShell>
  ),
}
