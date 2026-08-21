import { useState } from "react"
import {
  AlertCircle,
  Check,
  CalendarClock,
  ChevronDown,
  Clock,
  Hourglass,
  Inbox as InboxIcon,
  ListFilter,
  Menu,
  Search,
  User,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CONVERSATIONS, SORT_LABELS } from "@/data/inbox"
import type { UseInboxReturn } from "./useInbox"
import { ConversationListItem } from "./ConversationListItem"

const VIEWS = [
  { key: "your-inbox", label: "Your Inbox", icon: InboxIcon },
  { key: "mentions", label: "Mentions", icon: User },
  { key: "all", label: "All", icon: InboxIcon },
  { key: "unassigned", label: "Unassigned", icon: InboxIcon },
  { key: "spam", label: "Spam", icon: AlertCircle },
] as const

function ConversationList(inbox: UseInboxReturn) {
  const {
    sortedRows,
    activeConvo,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filterLabel,
    isRowVisible,
    openCount,
    totalCount,
    selectConversation,
    relativeTimeLabel,
  } = inbox

  const [searchOpen, setSearchOpen] = useState(false)
  const [activeView, setActiveView] = useState<(typeof VIEWS)[number]["key"]>("your-inbox")

  const welcome = CONVERSATIONS.welcome

  return (
    <div className="flex w-70 shrink-0 flex-col pt-4">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Views" />}>
              <Menu className="size-4.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5 text-base font-semibold tracking-tight">Inbox</div>
              {VIEWS.map((v) => {
                const Icon = v.icon
                const active = activeView === v.key
                const count = v.key === "all" ? totalCount : v.key === "mentions" || v.key === "spam" ? 0 : openCount
                return (
                  <DropdownMenuItem
                    key={v.key}
                    onSelect={() => setActiveView(v.key)}
                    className={cn(active && "bg-success-background text-success-foreground data-[highlighted]:bg-success-background data-[highlighted]:text-success-foreground")}
                  >
                    <Icon className="size-3.5" />
                    {v.label}
                    <span className={cn("ml-auto rounded-full bg-background px-1.5 text-xs", active && "text-success-foreground")}>
                      {count}
                    </span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <h2 className="text-base font-semibold tracking-tight">Chats</h2>
        </div>
        <div className="relative h-8 w-8 shrink-0">
          <div
            className={cn(
              "absolute top-0 right-0 h-8 overflow-hidden rounded-full border border-border bg-card shadow-[0_4px_14px_rgba(0,0,0,.08)] transition-[width,opacity] duration-200",
              searchOpen ? "w-59 opacity-100" : "pointer-events-none w-8 opacity-0"
            )}
          >
            <input
              placeholder="Search conversations"
              className="h-full w-full bg-transparent px-3.5 pr-9 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchOpen(false)
              }}
            />
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative z-10 rounded-full"
            aria-label={searchOpen ? "Close search" : "Search"}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="secondary" size="xs" className="rounded-full font-medium" />}>
            {filterLabel}
            <ChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            {(["open", "closed", "all"] as const).map((key) => (
              <DropdownMenuItem key={key} onSelect={() => setStatusFilter(key)}>
                <InboxIcon className="size-3.5" />
                {key === "open" ? "Open" : key === "closed" ? "Closed" : "Open & Closed"}
                {statusFilter === key && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="secondary" size="xs" className="rounded-full font-medium" />}>
            {SORT_LABELS[sortBy]}
            <ListFilter className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {[
              { key: "last-activity" as const, icon: Clock },
              { key: "date-started" as const, icon: CalendarClock },
              { key: "waiting-since" as const, icon: Hourglass },
            ].map(({ key, icon: Icon }) => (
              <DropdownMenuItem key={key} onSelect={() => setSortBy(key)}>
                <Icon className="size-3.5" />
                {SORT_LABELS[key]}
                {sortBy === key && <Check className="ml-auto size-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto border-t border-border">
        <ConversationListItem
          row={{
            key: "welcome",
            role: "system",
            label: "Welcome",
            preview: "This is a fully interactive front-end prototype — tap to read more.",
            timeMode: "fixed",
            fixedTime: welcome.started ?? "",
            arrivedAt: 0,
            activityAt: 0,
            live: false,
            unread: false,
            replied: false,
            closed: false,
          }}
          selected={activeConvo === "welcome"}
          timeLabel={welcome.started ?? ""}
          onSelect={() => selectConversation("welcome")}
        />
        {sortedRows.map((row) =>
          isRowVisible(row) ? (
            <ConversationListItem
              key={row.key}
              row={row}
              selected={activeConvo === row.key}
              timeLabel={row.timeMode === "fixed" ? (row.fixedTime ?? "") : relativeTimeLabel(Date.now() - row.activityAt)}
              onSelect={() => selectConversation(row.key)}
            />
          ) : null
        )}
      </div>
    </div>
  )
}

export { ConversationList }
