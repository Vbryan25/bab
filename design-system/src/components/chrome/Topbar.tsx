import type { ReactNode } from "react"

interface TopbarProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <div className="px-6 pt-5 pb-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">{title}</h1>
          {subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export { Topbar }
