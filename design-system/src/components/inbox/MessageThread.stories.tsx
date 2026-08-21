import type { Meta, StoryObj } from "@storybook/react-vite"

import { MessageThread } from "./MessageThread"
import { StoryCard, StoryGround, useInboxStory } from "./_story-inbox"

/**
 * The conversation itself. Received messages sit left on the warm selection
 * grey, the agent's own sit right on `--sent-bubble`; the thread pins to the
 * bottom on load the way a chat is expected to.
 */
function MessageThreadRegion() {
  const inbox = useInboxStory()

  return (
    <StoryGround className="p-4">
      <StoryCard>
        <MessageThread conversation={inbox.conversation} />
      </StoryCard>
    </StoryGround>
  )
}

const meta = {
  title: "Inbox/MessageThread",
  component: MessageThreadRegion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MessageThreadRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
