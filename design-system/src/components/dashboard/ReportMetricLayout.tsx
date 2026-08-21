import type { ReactNode } from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Topbar } from "@/components/chrome/Topbar"
import { SecondaryNav } from "@/components/chrome/SecondaryNav"
import { StatGrid, StatTile } from "@/components/dashboard/StatTile"
import { CompareToggle } from "@/components/dashboard/CompareToggle"
import { REPORTS_NAV_ENTRIES } from "@/data/reportsNav"

interface StatTileConfig {
  label: string
  icon: ReactNode
  value: string
  delta?: { text: string; direction: "up" | "down" | "warn" }
  caption?: string
  highlight?: boolean
}

interface ReportMetricLayoutProps {
  navActiveKey: string
  title: string
  subtitle: string
  searchPlaceholder: string
  filterLabel: string
  filterOptions: string[]
  showCompareToggle?: boolean
  stats: StatTileConfig[]
  chartTitle: string
  chart: ReactNode
  onSelectNav?: (key: string) => void
}

function notWiredUp() {
  toast("This is a prototype — this screen hasn't been ported yet")
}

function ReportMetricLayout({
  navActiveKey,
  title,
  subtitle,
  searchPlaceholder,
  filterLabel,
  filterOptions,
  showCompareToggle,
  stats,
  chartTitle,
  chart,
  onSelectNav,
}: ReportMetricLayoutProps) {
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Reports"
        entries={REPORTS_NAV_ENTRIES}
        active={navActiveKey}
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : notWiredUp())}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title={title}
            subtitle={subtitle}
            actions={
              <>
                <Button variant="secondary" onClick={notWiredUp}>
                  Date range
                </Button>
                <Button variant="secondary" onClick={notWiredUp}>
                  Export
                </Button>
                <Button variant="secondary" onClick={notWiredUp}>
                  Share
                </Button>
                <Button onClick={notWiredUp}>Save</Button>
              </>
            }
          />
          <div className="flex items-center gap-2 border-b border-border px-6 pb-3.5">
            <Input
              placeholder={searchPlaceholder}
              className="h-8 w-45 rounded-full bg-pill"
              onKeyDown={(e) => e.key === "Enter" && notWiredUp()}
            />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="secondary" className="rounded-full" />}>
                {filter ?? filterLabel}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setFilter(null)}>
                  {filterLabel}
                  {filter === null && <Check className="ml-auto size-3.5" />}
                </DropdownMenuItem>
                {filterOptions.map((o) => (
                  <DropdownMenuItem key={o} onSelect={() => setFilter(o)}>
                    {o}
                    {filter === o && <Check className="ml-auto size-3.5" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {showCompareToggle && (
              <>
                <span className="flex-1" />
                <CompareToggle onClick={notWiredUp} />
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
            <StatGrid columns={3}>
              {stats.map((s) => (
                <StatTile key={s.label} {...s} />
              ))}
            </StatGrid>
            <div className="rounded-xl bg-surface-nested p-5">
              <h3 className="mb-3.5 text-base font-semibold tracking-tight">{chartTitle}</h3>
              {chart}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReportMetricLayout }
