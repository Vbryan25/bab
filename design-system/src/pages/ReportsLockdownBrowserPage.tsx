import { Monitor, RotateCcw, Scan } from "lucide-react"

import { ReportMetricLayout } from "@/components/dashboard/ReportMetricLayout"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORT_WEEKS } from "@/data/reportsNav"

interface PageProps {
  onSelectNav?: (key: string) => void
}

function ReportsLockdownBrowserPage({ onSelectNav }: PageProps) {
  return (
    <ReportMetricLayout
      navActiveKey="reports-lockdown-browser"
      title="Lockdown Browser"
      subtitle="Track lockdown browser stability during exams — crashes, forced closures, and recovery."
      searchPlaceholder="Search sessions"
      filterLabel="All institutions"
      filterOptions={["Cascade State University", "Northfield College"]}
      showCompareToggle
      onSelectNav={onSelectNav}
      stats={[
        { label: "Sessions with a crash or forced close", icon: <Monitor className="size-3.5" />, value: "4.1%", delta: { text: "-0.6pt", direction: "down" } },
        { label: "Sessions using lockdown browser", icon: <Scan className="size-3.5" />, value: "3,208", delta: { text: "+6%", direction: "up" } },
        { label: "Recovered without support", icon: <RotateCcw className="size-3.5" />, value: "84%" },
      ]}
      chartTitle="Crash rate by week"
      chart={
        <TrendChart
          categories={REPORT_WEEKS}
          series={[{ key: "rate", label: "Crash rate", color: "var(--series-all)" }]}
          values={{ rate: [6.8, 6.5, 6.9, 6.1, 5.8, 6, 5.4, 5.1, 5.3, 4.6, 4.4, 4.1] }}
        />
      }
    />
  )
}

export { ReportsLockdownBrowserPage }
