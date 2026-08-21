import type { Meta, StoryObj } from "@storybook/react-vite"

import { ConversationList } from "./ConversationList"
import { StoryGround, useInboxStory } from "./_story-inbox"

/**
 * The queue an agent works down: status filter, sort, and one row per
 * conversation, unread reading lighter than the ground and read reading a step
 * darker.
 */
function ConversationListRegion() {
  const inbox = useInboxStory()

  return (
    <StoryGround>
      <ConversationList {...inbox} />
    </StoryGround>
  )
}

const meta = {
  title: "Inbox/ConversationList",
  component: ConversationListRegion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ConversationListRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
