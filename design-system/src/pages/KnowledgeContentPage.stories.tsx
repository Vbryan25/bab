import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { KnowledgeContentPage } from "./KnowledgeContentPage"

const meta = {
  title: "Pages/Knowledge Content",
  component: KnowledgeContentPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KnowledgeContentPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="knowledge" onSelect={() => {}}>
      <KnowledgeContentPage />
    </AppShell>
  ),
}
