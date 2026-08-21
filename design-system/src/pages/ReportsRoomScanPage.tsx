import { CameraOff, RotateCcw, Scan } from "lucide-react"

import { ReportMetricLayout } from "@/components/dashboard/ReportMetricLayout"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORT_WEEKS } from "@/data/reportsNav"

interface PageProps {
  onSelectNav?: (key: string) => void
}

function ReportsRoomScanPage({ onSelectNav }: PageProps) {
  return (
    <ReportMetricLayout
      navActiveKey="reports-room-scan"
      title="Room Scan Failures"
      subtitle="Track how often students fail the initial room scan before an exam can begin."
      searchPlaceholder="Search sessions"
      filterLabel="All institutions"
      filterOptions={["Cascade State University", "Northfield College"]}
      showCompareToggle
      onSelectNav={onSelectNav}
      stats={[
        { label: "Room scans failed", icon: <CameraOff className="size-3.5" />, value: "6.8%", delta: { text: "-1.2pt", direction: "down" } },
        { label: "Room scans attempted", icon: <Scan className="size-3.5" />, value: "2,914", delta: { text: "+8%", direction: "up" } },
        { label: "Retry success rate", icon: <RotateCcw className="size-3.5" />, value: "91%" },
      ]}
      chartTitle="Failure rate by week"
      chart={
        <TrendChart
          categories={REPORT_WEEKS}
          series={[{ key: "rate", label: "Failure rate", color: "var(--series-all)" }]}
          values={{ rate: [9.4, 8.8, 9.1, 8.2, 7.9, 8.4, 7.6, 7.1, 7.4, 6.9, 7.2, 6.8] }}
        />
      }
    />
  )
}

export { ReportsRoomScanPage }
