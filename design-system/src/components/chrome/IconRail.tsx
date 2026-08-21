import { BarChart3, BookOpen, Inbox, Search, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavKey = "inbox" | "knowledge" | "reports" | "contacts" | "settings"

const TOP_ITEMS: { key: NavKey; icon: typeof Inbox; dot?: boolean }[] = [
  { key: "inbox", icon: Inbox, dot: true },
  { key: "knowledge", icon: BookOpen },
  { key: "reports", icon: BarChart3 },
  { key: "contacts", icon: Users },
]

function NavIconButton({
  navKey,
  icon: Icon,
  active,
  dot,
  onClick,
}: {
  navKey: string
  icon: typeof Inbox
  active: boolean
  dot?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      title={navKey}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-lg text-foreground",
        active ? "bg-sel" : "hover:bg-sel-hover"
      )}
    >
      <Icon className="size-5" strokeWidth={active ? 2.25 : 1.75} />
      {dot && active && <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary" />}
    </button>
  )
}

interface IconRailProps {
  active: NavKey
  onSelect: (key: NavKey) => void
}

function IconRail({ active, onSelect }: IconRailProps) {
  return (
    <div className="relative flex w-15 shrink-0 flex-col items-center justify-between p-3 after:absolute after:top-4 after:right-0 after:bottom-4 after:w-px after:bg-border-rail after:content-['']">
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-9 items-center justify-center text-[15px] font-bold tracking-tight">EH</div>
        <hr className="w-9 border-t-[0.5px] border-border-soft" />
        {TOP_ITEMS.map((item) => (
          <NavIconButton
            key={item.key}
            navKey={item.key}
            icon={item.icon}
            active={active === item.key}
            dot={item.dot}
            onClick={() => onSelect(item.key)}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <hr className="w-9 border-t border-border" />
        <NavIconButton navKey="Search" icon={Search} active={false} />
        <NavIconButton
          navKey="settings"
          icon={Settings}
          active={active === "settings"}
          onClick={() => onSelect("settings")}
        />
        <div className="relative size-8 rounded-full border-2 border-card bg-border" title="Your profile">
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full border border-card bg-success" />
        </div>
      </div>
    </div>
  )
}

export { IconRail }
