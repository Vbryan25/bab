import { AlertCircle, AppWindow, MonitorUp, MoreHorizontal, PanelRightOpen, Reply, UserCheck, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RoleBadge } from "./RoleBadge"
import type { UseInboxReturn } from "./useInbox"

const MORE_ACTIONS = [
  { key: "screenshare", label: "Screen share", icon: MonitorUp },
  { key: "transfer", label: "Transfer conversation", icon: Reply },
  { key: "assign", label: "Assign to teammate", icon: UserCheck },
] as const

function ChatHeader(inbox: UseInboxReturn) {
  const { conversation, sidePanelCollapsed, setSidePanelCollapsed, requestCloseActive } = inbox
  const isWelcome = conversation.key === "welcome"

  return (
    <div className="flex items-center justify-between border-b border-border-rail px-4 py-4">
      <div className="flex items-center gap-3">
        <strong className="text-base font-semibold tracking-tight">{conversation.name}</strong>
        <div className="flex items-center gap-1.5">
          <RoleBadge role={conversation.role} />
          {conversation.canvas && (
            <span
              className="flex size-6.5 items-center justify-center rounded-md border border-border-soft"
              title="Canvas"
            >
              <AppWindow className="size-4 text-muted-foreground" />
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isWelcome && sidePanelCollapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Show context panel"
            aria-expanded={!sidePanelCollapsed}
            onClick={() => setSidePanelCollapsed(false)}
          >
            <PanelRightOpen className="size-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More" />}>
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {MORE_ACTIONS.map(({ key, label, icon: Icon }) => (
              <DropdownMenuItem
                key={key}
                onSelect={() => toast(`This is a prototype — ${label} isn't wired up yet`)}
              >
                <Icon className="size-3.5" />
                {label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast("This is a prototype — Mark as spam isn't wired up yet")}>
              <AlertCircle className="size-3.5" />
              Mark as spam
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" className="bg-red-deep hover:bg-red-deep/90" onClick={requestCloseActive}>
          <X className="size-4" />
          Close
        </Button>
      </div>
    </div>
  )
}

export { ChatHeader }
