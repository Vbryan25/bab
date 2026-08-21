import { useState } from "react"
import { Check, Clock, Hourglass, Target } from "lucide-react"
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
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORTS_NAV_ENTRIES, REPORT_WEEKS } from "@/data/reportsNav"

const ROLES = ["Student", "Instructor", "Administrator"]

function notWiredUp() {
  toast("This is a prototype — this screen hasn't been ported yet")
}

interface ReportsResponseTimePageProps {
  onSelectNav?: (key: string) => void
}

function ReportsResponseTimePage({ onSelectNav }: ReportsResponseTimePageProps) {
  const [role, setRole] = useState<string | null>(null)

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Reports"
        entries={REPORTS_NAV_ENTRIES}
        active="reports-response-time"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : notWiredUp())}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title="Response Time"
            subtitle="Track how quickly conversations get a first reply, and whether that meets your response-time target."
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
              placeholder="Search conversations"
              className="h-8 w-45 rounded-full bg-pill"
              onKeyDown={(e) => e.key === "Enter" && notWiredUp()}
            />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="secondary" className="rounded-full" />}>
                {role ?? "All roles"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setRole(null)}>
                  All roles
                  {role === null && <Check className="ml-auto size-3.5" />}
                </DropdownMenuItem>
                {ROLES.map((r) => (
                  <DropdownMenuItem key={r} onSelect={() => setRole(r)}>
                    {r}
                    {role === r && <Check className="ml-auto size-3.5" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="flex-1" />
            <span className="text-[13px] text-muted-foreground">Updated 3 minutes ago</span>
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
            <StatGrid columns={3}>
              <StatTile
                label="Median time to first response"
                icon={<Clock className="size-3.5" />}
                value="2.1 hrs"
                delta={{ text: "-0.2 hrs", direction: "down" }}
                highlight
              />
              <StatTile
                label="SLA compliance"
                icon={<Target className="size-3.5" />}
                value="92%"
                delta={{ text: "+3pt", direction: "up" }}
              />
              <StatTile
                label="Longest outstanding wait"
                icon={<Hourglass className="size-3.5" />}
                value="6.4 hrs"
              />
            </StatGrid>

            <div className="flex gap-1.5 border-t border-border pt-2.5 text-xs text-muted-foreground">
              <span className="shrink-0 italic">ƒ</span>
              <span>
                Method: SLA target is 4 hours during business hours. Compliance = replies sent within target ÷ total
                conversations.
              </span>
            </div>

            <div className="rounded-xl bg-surface-nested p-5">
              <h3 className="mb-3.5 text-base font-semibold tracking-tight">Median time to first response, last 12 weeks</h3>
              <TrendChart
                categories={REPORT_WEEKS}
                series={[{ key: "response", label: "Median time to first response", color: "var(--series-all)" }]}
                values={{ response: [3.4, 3.2, 3.1, 2.9, 2.8, 2.9, 2.6, 2.5, 2.4, 2.2, 2.3, 2.1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReportsResponseTimePage }
