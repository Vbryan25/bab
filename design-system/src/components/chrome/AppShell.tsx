import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { IconRail, type NavKey } from "@/components/chrome/IconRail"

interface AppShellProps {
  active: NavKey
  onSelect: (key: NavKey) => void
  children: ReactNode
}

function AppShell({ active, onSelect, children }: AppShellProps) {
  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      <IconRail active={active} onSelect={onSelect} />
      {children}
      <Toaster position="bottom-center" />
    </div>
  )
}

export { AppShell }
