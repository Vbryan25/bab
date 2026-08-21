import { Bot, MessageCircle, Reply } from "lucide-react"

import { cn } from "@/lib/utils"
import { PEOPLE_COLORS, type Role } from "@/data/inbox"

function RoleAvatar({ role, replied, className }: { role: Role; replied?: boolean; className?: string }) {
  const { color, bg } = PEOPLE_COLORS[role]
  const Icon = role === "system" ? Bot : replied ? Reply : MessageCircle
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,.1)]",
        className
      )}
      style={{ backgroundColor: bg, color }}
    >
      <Icon className={cn("size-4", role === "system" && "fill-current")} strokeWidth={1.5} />
    </div>
  )
}

export { RoleAvatar }
