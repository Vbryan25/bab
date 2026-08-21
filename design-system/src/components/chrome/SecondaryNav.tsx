import { useState } from "react"
import { ChevronRight, ExternalLink, Folder, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavEntry =
  | { type: "item"; key: string; label: string; icon: LucideIcon; count?: number; external?: boolean }
  | { type: "folder"; id: string; label: string; children: { key: string; label: string }[] }
  | { type: "divider" }

interface SecondaryNavProps {
  title: string
  entries: NavEntry[]
  active: string
  onSelect: (key: string) => void
  className?: string
}

function itemClass(active: boolean) {
  return cn(
    "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm",
    active ? "bg-sel font-medium" : "hover:bg-sel-hover"
  )
}

function SecondaryNav({ title, entries, active, onSelect, className }: SecondaryNavProps) {
  const [manuallyToggled, setManuallyToggled] = useState<Record<string, boolean>>({})

  return (
    <div className={cn("flex w-55 shrink-0 flex-col overflow-y-auto py-1", className)}>
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      <ul className="flex flex-col gap-0.5 px-3">
        {entries.map((entry, i) => {
          if (entry.type === "divider") {
            return <li key={i} className="my-2 h-px bg-border" />
          }
          if (entry.type === "item") {
            const Icon = entry.icon
            return (
              <li key={entry.key}>
                <button type="button" onClick={() => onSelect(entry.key)} className={itemClass(active === entry.key)}>
                  <span className="flex items-center gap-2">
                    <Icon className="size-4.5 shrink-0 text-muted-foreground" />
                    <span>{entry.label}</span>
                  </span>
                  {entry.count !== undefined && <span className="text-[13px] text-muted-foreground">{entry.count}</span>}
                  {entry.external && <ExternalLink className="size-3.5 text-muted-foreground" />}
                </button>
              </li>
            )
          }
          // folder
          const containsActive = entry.children.some((c) => c.key === active)
          const open = manuallyToggled[entry.id] ?? containsActive
          return (
            <li key={entry.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => setManuallyToggled((prev) => ({ ...prev, [entry.id]: !open }))}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-medium hover:bg-sel-hover"
              >
                <span className="flex items-center gap-2">
                  <Folder className="size-4.5 shrink-0 text-muted-foreground" />
                  {entry.label}
                </span>
                <ChevronRight className={cn("size-2.5 text-muted-foreground transition-transform", open && "rotate-90")} />
              </button>
              {open && (
                <ul className="flex flex-col gap-0.5">
                  {entry.children.map((child) => (
                    <li key={child.key}>
                      <button
                        type="button"
                        onClick={() => onSelect(child.key)}
                        className={cn(
                          "w-full rounded-md py-1.5 pr-2.5 pl-8 text-left text-sm",
                          active === child.key ? "bg-sel font-medium" : "hover:bg-sel-hover"
                        )}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { SecondaryNav }
