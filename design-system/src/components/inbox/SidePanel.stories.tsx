import type { Meta, StoryObj } from "@storybook/react-vite"

import { SidePanel } from "./SidePanel"
import { StoryGround, useInboxStory } from "./_story-inbox"

/**
 * The session context that arrives with the conversation — the whole point of
 * the redesign. This is what the agent reads instead of asking the test-taker
 * to reconstruct what they were doing.
 *
 * Renders nothing on the `welcome` conversation, which is why the story opens
 * a real one.
 */
function SidePanelRegion() {
  const inbox = useInboxStory()

  return (
    <StoryGround className="justify-start p-4">
      <SidePanel {...inbox} />
    </StoryGround>
  )
}

const meta = {
  title: "Inbox/SidePanel",
  component: SidePanelRegion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SidePanelRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
