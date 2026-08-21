import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { cn } from "@/lib/utils"

import { ChatHeader } from "./ChatHeader"
import { Composer } from "./Composer"
import { ConversationList } from "./ConversationList"
import { MessageThread } from "./MessageThread"
import { SidePanel } from "./SidePanel"
import { useInboxStory } from "./_story-inbox"

const REGIONS = ["list", "header", "thread", "composer", "context"] as const
type Region = (typeof REGIONS)[number]

function isRegion(value: unknown): value is Region {
  return REGIONS.includes(value as Region)
}

/**
 * Dims to 20% rather than hiding, so the region stays in place and the reader
 * keeps the whole page as a frame of reference. `aria-hidden` is deliberately
 * not set: everything here is still real, focusable UI, and hiding four fifths
 * of the page from a screen reader to make a visual point would be a worse
 * trade than the dimming is worth.
 */
function Focus({
  on,
  className,
  children,
}: {
  on: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-out",
        on ? "opacity-100" : "opacity-20",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * The whole Inbox with one region brought forward at a time.
 *
 * The picker that drives this lives in the *host page*, not here — embedded in
 * a portfolio case study it sits outside the iframe, at full size, rather than
 * being scaled down along with the console. The contract between them is a
 * single same-origin message:
 *
 *     { source: "embed-focus", value: "list" | "header" | ... }
 *
 * Nothing is required to send one. Opened directly in Storybook this is simply
 * the Inbox with the queue brought forward, which is a fine thing to look at on
 * its own.
 *
 * The wrappers carry the flex sizing the regions rely on — the queue and the
 * context panel are `shrink-0`, the thread is the only thing that grows —
 * otherwise focusing a region quietly reflows the page around it.
 */
function InboxRegions() {
  const inbox = useInboxStory()
  const [region, setRegion] = useState<Region>("list")

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Same-origin only. The host page serves this iframe from its own domain;
      // anything else talking to it has no business steering the view.
      if (event.origin !== window.location.origin) return

      const data = event.data as { source?: string; value?: unknown } | null
      if (data?.source !== "embed-focus") return
      if (isRegion(data.value)) setRegion(data.value)
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Focus on={region === "list"} className="shrink-0">
          <ConversationList {...inbox} />
        </Focus>

        <div className="flex flex-1 gap-2 p-4">
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-card shadow-card">
            <Focus on={region === "header"}>
              <ChatHeader {...inbox} />
            </Focus>

            <Focus
              on={region === "thread"}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <MessageThread conversation={inbox.conversation} />
            </Focus>

            <Focus on={region === "composer"}>
              <Composer
                activeConvo={inbox.activeConvo}
                sendMessage={inbox.sendMessage}
              />
            </Focus>
          </div>

          <Focus on={region === "context"} className="shrink-0">
            <SidePanel {...inbox} />
          </Focus>
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: "Inbox/Regions",
  component: InboxRegions,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InboxRegions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
