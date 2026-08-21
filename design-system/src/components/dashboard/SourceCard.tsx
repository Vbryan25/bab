import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface SourceCardProps {
  thumbBg: string
  thumbContent: ReactNode
  thumbBorder?: boolean
  title: string
  status: "live" | "not-live"
  liveLabel?: string
  notLiveLabel?: string
  description: string
  linkText?: string
  actionLabel?: string
  onAction?: () => void
}

function SourceCard({
  thumbBg,
  thumbContent,
  thumbBorder,
  title,
  status,
  liveLabel = "Live",
  notLiveLabel = "Not live",
  description,
  linkText = "Set up now",
  actionLabel,
  onAction,
}: SourceCardProps) {
  return (
    <div className="w-75 overflow-hidden rounded-xl bg-background">
      <div
        className={cn("flex h-30 items-center justify-center", thumbBorder && "border-b border-border")}
        style={{ backgroundColor: thumbBg }}
      >
        {thumbContent}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <strong className="text-base font-semibold tracking-tight">{title}</strong>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              status === "live" ? "bg-success-background text-success-foreground" : "bg-unread text-muted-foreground"
            )}
          >
            {status === "live" ? liveLabel : notLiveLabel}
          </span>
        </div>
        <p className="mb-3 text-[13px] text-muted-foreground">{description}</p>
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-full bg-pill px-3.5 py-2 text-sm font-medium hover:brightness-95"
          >
            {actionLabel}
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-sm font-medium text-success-foreground">
            {linkText}
            <ArrowUpRight className="size-3.5" />
          </div>
        )}
      </div>
    </div>
  )
}

function SourceList({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-lg border-[0.5px] border-border-soft bg-card">{children}</div>
}

interface SourceListRowProps {
  mark: ReactNode
  markBg?: string
  title: string
  meta: string
  actionLabel: string
  onAction?: () => void
  connected?: boolean
}

function SourceListRow({ mark, markBg, title, meta, actionLabel, onAction, connected = true }: SourceListRowProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 first:border-t-0">
      <div className="flex items-center gap-2.5">
        <span
          className={cn("size-4 shrink-0 rounded-full", connected ? "bg-success-foreground" : "bg-border")}
        />
        {markBg ? (
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
            style={{ backgroundColor: markBg }}
          >
            {mark}
          </div>
        ) : (
          <span className="font-bold tracking-wide text-muted3 uppercase">{mark}</span>
        )}
        <strong className="text-sm font-normal">{title}</strong>
      </div>
      <span className="text-[13px] text-muted-foreground">{meta}</span>
      <button
        type="button"
        onClick={onAction}
        className="rounded-full bg-pill px-3.5 py-2 text-sm font-medium hover:brightness-95"
      >
        {actionLabel}
      </button>
    </div>
  )
}

export { SourceCard, SourceList, SourceListRow }
