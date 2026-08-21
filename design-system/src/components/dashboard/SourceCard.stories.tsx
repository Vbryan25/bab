import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bot } from "lucide-react"

import { SourceCard, SourceList, SourceListRow } from "./SourceCard"

const meta = {
  title: "Dashboard/SourceCard",
  component: SourceCard,
  tags: ["autodocs"],
} satisfies Meta<typeof SourceCard>

export default meta
type Story = StoryObj<typeof meta>

const DUMMY_ARGS = { thumbBg: "", thumbContent: null, title: "", status: "live" as const, description: "" }

export const Cards: Story = {
  args: DUMMY_ARGS,
  render: () => (
    <div className="flex flex-wrap gap-4">
      <SourceCard
        thumbBg="#bfeacb"
        thumbContent={<span className="text-[22px] font-bold tracking-wide text-[#2f7549] uppercase">BAB Help</span>}
        title="Help Center"
        status="live"
        description="Students and instructors use your knowledge to find accurate answers themselves."
      />
      <SourceCard
        thumbBg="#bfe6ea"
        thumbContent={<Bot className="size-10 text-[#0c4a6e]" />}
        title="AI Assist"
        status="not-live"
        description="AI Assist uses your knowledge to generate accurate answers for students, instructors, and administrators."
      />
    </div>
  ),
}

export const List: Story = {
  args: DUMMY_ARGS,
  render: () => (
    <SourceList>
      <SourceListRow mark="EH" title="Company Help Center" meta="1 article" actionLabel="Add article" />
      <SourceListRow mark="Z" markBg="#03363d" title="Zendesk" meta="Not set up" actionLabel="Sync or Import" connected={false} />
    </SourceList>
  ),
}
