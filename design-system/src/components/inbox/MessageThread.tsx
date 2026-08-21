import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import type { Conversation } from "@/data/inbox"

function MessageThread({ conversation }: { conversation: Conversation }) {
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [conversation.thread.length])

  return (
    <div ref={threadRef} className="flex flex-1 flex-col items-center gap-6 overflow-y-auto bg-card px-4 pt-4">
      {conversation.role !== "system" && conversation.started && (
        <div className="w-full rounded-full px-2 py-1 text-center text-xs text-muted2">
          Chat Started - {conversation.started}
        </div>
      )}
      {conversation.thread.map((m, i) => (
        <div key={i} className={cn("flex w-full items-start gap-2", m.mine && "justify-end")}>
          {!m.mine && (
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium shadow-[inset_0_1px_1px_rgba(0,0,0,.1)]"
              style={{ backgroundColor: "#fae0d1", color: "#cd4c15" }}
            >
              {conversation.initials}
            </div>
          )}
          <div className={cn("flex max-w-[70%] flex-col gap-1", m.mine && "items-end", m.wide && "max-w-105")}>
            <div
              className={cn(
                "rounded-tr-xl rounded-b-xl px-4 py-2.5 text-sm leading-5",
                m.mine ? "rounded-tl-xl rounded-tr-none bg-sent-bubble" : "bg-sel",
                m.wide && "max-w-none"
              )}
            >
              {m.text}
            </div>
            <span className="text-xs text-muted2">{m.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export { MessageThread }
