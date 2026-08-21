import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

interface StatTileProps {
  label: string
  icon?: ReactNode
  value: string
  delta?: { text: string; direction: "up" | "down" | "warn" }
  caption?: string
  highlight?: boolean
  className?: string
}

function StatTile({ label, icon, value, delta, caption, highlight, className }: StatTileProps) {
  return (
    <div className={cn("rounded-xl p-4 px-5", highlight ? "bg-pink-hi" : "bg-surface-nested", className)}>
      <div className="mb-3.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-[28px] font-semibold tracking-tight">{value}</span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-[13px] text-muted-foreground",
              delta.direction === "up" && "text-success-foreground",
              delta.direction === "down" && "text-red-text",
              delta.direction === "warn" && "text-warning"
            )}
          >
            {delta.direction === "up" && <ArrowUp className="size-3" />}
            {delta.direction === "down" && <ArrowDown className="size-3" />}
            {delta.text}
          </span>
        )}
      </div>
      {caption && <div className="mt-2.5 text-xs text-muted-foreground">{caption}</div>}
    </div>
  )
}

interface StatGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

function StatGrid({ children, columns = 4, className }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export { StatTile, StatGrid }
