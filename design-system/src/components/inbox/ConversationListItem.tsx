import { cn } from "@/lib/utils"
import type { InboxRowState } from "@/data/inbox"
import { RoleAvatar } from "./RoleAvatar"

interface ConversationListItemProps {
  row: InboxRowState
  selected: boolean
  timeLabel: string
  onSelect: () => void
}

function ConversationListItem({ row, selected, timeLabel, onSelect }: ConversationListItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-current={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "flex h-15 shrink-0 cursor-pointer items-center gap-3 border-b border-border px-4 py-2 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        selected
          ? "cursor-default bg-chat-selected hover:bg-chat-selected"
          : row.unread
            ? "bg-unread hover:bg-unread-hover"
            : "bg-chat-read hover:bg-chat-read-hover"
      )}
    >
      <RoleAvatar role={row.role} replied={row.replied} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={cn("truncate text-sm", row.unread && "font-semibold")}>{row.label}</span>
          {row.closed ? (
            <span className="shrink-0 rounded-md bg-border px-1.5 text-xs leading-[18px] text-muted-foreground">Closed</span>
          ) : row.live ? (
            <span className="shrink-0 rounded-md bg-red-deep px-1.5 text-xs leading-[18px] text-white">In-attempt</span>
          ) : (
            <span className="shrink-0 text-xs text-muted-foreground">{timeLabel}</span>
          )}
        </div>
        <p
          className={cn(
            "mt-1 truncate text-xs",
            selected ? "text-foreground" : row.unread ? "font-medium text-muted3" : "text-muted3"
          )}
        >
          {row.preview}
        </p>
      </div>
    </div>
  )
}

export { ConversationListItem }
