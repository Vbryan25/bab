import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChatHeader } from "./ChatHeader"
import { StoryGround, useInboxStory } from "./_story-inbox"

/**
 * Who the agent is talking to, their role, and the two controls that matter
 * mid-conversation: collapse the context panel, or close the case.
 */
function ChatHeaderRegion() {
  const inbox = useInboxStory()

  return (
    <StoryGround className="h-auto items-start p-4">
      <div className="flex-1 overflow-hidden rounded-2xl bg-card shadow-card">
        <ChatHeader {...inbox} />
      </div>
    </StoryGround>
  )
}

const meta = {
  title: "Inbox/ChatHeader",
  component: ChatHeaderRegion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChatHeaderRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
