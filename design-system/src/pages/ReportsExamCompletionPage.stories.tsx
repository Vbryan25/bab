import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/chrome/AppShell"
import { ReportsExamCompletionPage } from "./ReportsExamCompletionPage"

const meta = {
  title: "Pages/Reports Exam Completion",
  component: ReportsExamCompletionPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ReportsExamCompletionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppShell active="reports" onSelect={() => {}}>
      <ReportsExamCompletionPage />
    </AppShell>
  ),
}
