import { useState } from "react"
import { Check, Clock, MessageSquare, Target, UserCheck } from "lucide-react"
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
import { REPORTS_NAV_ENTRIES, REPORT_CATEGORIES, REPORT_WEEKS } from "@/data/reportsNav"

function notWiredUp() {
  toast("This is a prototype — this screen hasn't been ported yet")
}

interface ReportsOverviewPageProps {
  onSelectNav?: (key: string) => void
}

function ReportsOverviewPage({ onSelectNav }: ReportsOverviewPageProps) {
  const [category, setCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Reports"
        entries={REPORTS_NAV_ENTRIES}
        active="reports-overview"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : notWiredUp())}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title="Overview"
            actions={
              <>
                <Button variant="secondary" onClick={notWiredUp}>
                  Date range
                </Button>
                <Button variant="secondary" onClick={notWiredUp}>
                  Export
                </Button>
              </>
            }
          />
          <div className="flex items-center gap-2 border-b border-border px-6 pb-3.5">
            <Input
              placeholder="Search reports"
              className="h-8 w-45 rounded-full bg-pill"
              onKeyDown={(e) => e.key === "Enter" && notWiredUp()}
            />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="secondary" className="rounded-full" />}>
                {category ?? "All categories"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setCategory(null)}>
                  All categories
                  {category === null && <Check className="ml-auto size-3.5" />}
                </DropdownMenuItem>
                {REPORT_CATEGORIES.map((c) => (
                  <DropdownMenuItem key={c} onSelect={() => setCategory(c)}>
                    {c}
                    {category === c && <Check className="ml-auto size-3.5" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
            <StatGrid>
              <StatTile
                label="Total conversations this week"
                icon={<MessageSquare className="size-3.5" />}
                value="24"
                delta={{ text: "+3", direction: "up" }}
                highlight
              />
              <StatTile
                label="Median time to first response"
                icon={<Clock className="size-3.5" />}
                value="2.1 hrs"
                delta={{ text: "-0.2 hrs", direction: "down" }}
              />
              <StatTile
                label="Flag precision"
                icon={<Target className="size-3.5" />}
                value="77%"
                caption="See Flagged Sessions for detail"
              />
              <StatTile
                label="Deflected by AI Assist"
                icon={<UserCheck className="size-3.5" />}
                value="68%"
                delta={{ text: "+4pt", direction: "up" }}
              />
            </StatGrid>

            <div className="rounded-xl bg-surface-nested p-5">
              <h3 className="mb-3.5 text-base font-semibold tracking-tight">Overall volume growth</h3>
              <TrendChart
                categories={REPORT_WEEKS}
                showLegend
                series={[
                  { key: "all", label: "All conversations", color: "var(--series-all)", emphasis: true },
                  { key: "student", label: "Student", color: "var(--series-student)" },
                  { key: "instructor", label: "Instructor", color: "var(--series-instructor)" },
                  { key: "admin", label: "Administrator", color: "var(--series-admin)" },
                ]}
                values={{
                  all: [9, 10, 11, 10, 12, 13, 14, 15, 17, 19, 21, 24],
                  student: [5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13],
                  instructor: [3, 3, 4, 3, 4, 4, 4, 5, 5, 6, 6, 7],
                  admin: [1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3],
                }}
              />
            </div>

            <div className="rounded-xl bg-surface-nested p-5">
              <h3 className="mb-3.5 text-base font-semibold tracking-tight">
                Median time to first response, last 12 weeks
              </h3>
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

export { ReportsOverviewPage }
