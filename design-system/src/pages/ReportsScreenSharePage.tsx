import { CameraOff, Monitor, RotateCcw } from "lucide-react"

import { ReportMetricLayout } from "@/components/dashboard/ReportMetricLayout"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORT_WEEKS } from "@/data/reportsNav"

interface PageProps {
  onSelectNav?: (key: string) => void
}

function ReportsScreenSharePage({ onSelectNav }: PageProps) {
  return (
    <ReportMetricLayout
      navActiveKey="reports-screen-share"
      title="Screen Share & Multi-Monitor"
      subtitle="Track screen share permission failures and multi-monitor detections during proctored exams."
      searchPlaceholder="Search sessions"
      filterLabel="All institutions"
      filterOptions={["Cascade State University", "Northfield College"]}
      showCompareToggle
      onSelectNav={onSelectNav}
      stats={[
        { label: "Multi-monitor detections", icon: <Monitor className="size-3.5" />, value: "3.2%", delta: { text: "-0.4pt", direction: "down" } },
        { label: "Screen share permission failures", icon: <CameraOff className="size-3.5" />, value: "41", delta: { text: "+5", direction: "up" } },
        { label: "Cleared on retry", icon: <RotateCcw className="size-3.5" />, value: "79%" },
      ]}
      chartTitle="Detection rate by week"
      chart={
        <TrendChart
          categories={REPORT_WEEKS}
          series={[{ key: "rate", label: "Detection rate", color: "var(--series-all)" }]}
          values={{ rate: [4.8, 4.6, 4.9, 4.3, 4.5, 4.1, 4.4, 3.9, 3.7, 3.6, 3.4, 3.2] }}
        />
      }
    />
  )
}

export { ReportsScreenSharePage }
