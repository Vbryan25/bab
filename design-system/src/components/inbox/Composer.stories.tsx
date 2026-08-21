import type { Meta, StoryObj } from "@storybook/react-vite"

import { Composer } from "./Composer"
import { StoryGround, useInboxStory } from "./_story-inbox"

/**
 * Where the agent replies. Typing works — so does `/`, which is the entry
 * point to the command set rather than a decorative affordance.
 */
function ComposerRegion() {
  const inbox = useInboxStory()

  return (
    <StoryGround className="h-auto items-start p-4">
      <div className="flex-1 overflow-hidden rounded-2xl bg-card shadow-card">
        <Composer
          activeConvo={inbox.activeConvo}
          sendMessage={inbox.sendMessage}
        />
      </div>
    </StoryGround>
  )
}

const meta = {
  title: "Inbox/Composer",
  component: ComposerRegion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ComposerRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
