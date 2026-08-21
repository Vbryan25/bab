import { useEffect } from "react"

import { cn } from "@/lib/utils"

import { useInbox, type UseInboxReturn } from "./useInbox"

/**
 * Shared setup for the Inbox region stories.
 *
 * Two departures from how the page uses the hook, both because a region on its
 * own is being *read* rather than worked:
 *
 * - `trickle: false`, so the queue is populated on first paint instead of
 *   filling over the following half minute.
 * - Jordan Lee's conversation is opened rather than `welcome`, which is the
 *   empty-state pitch — `SidePanel` renders nothing at all on it.
 */
export function useInboxStory(): UseInboxReturn {
  const inbox = useInbox({ trickle: false })
  const { selectConversation } = inbox

  useEffect(() => {
    selectConversation("jordan")
  }, [selectConversation])

  return inbox
}

/**
 * The warm app ground the regions sit on. `cn` rather than template
 * interpolation so a caller passing `h-auto` actually wins against the default
 * `h-screen` — string concatenation leaves both classes live and the taller one
 * takes it.
 */
export function StoryGround({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {children}
    </div>
  )
}

/** The single shadowed card the chat regions live inside on the real page. */
export function StoryCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      {children}
    </div>
  )
}
