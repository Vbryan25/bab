import { Check, Monitor, ShieldAlert } from "lucide-react"

import { ReportMetricLayout } from "@/components/dashboard/ReportMetricLayout"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORT_WEEKS } from "@/data/reportsNav"

interface PageProps {
  onSelectNav?: (key: string) => void
}

function ReportsExamCompletionPage({ onSelectNav }: PageProps) {
  return (
    <ReportMetricLayout
      navActiveKey="reports-exam-completion"
      title="Exam Completion Rate"
      subtitle="Track how often proctored exam sessions complete without a technical or integrity interruption."
      searchPlaceholder="Search sessions"
      filterLabel="All institutions"
      filterOptions={["Cascade State University", "Northfield College"]}
      showCompareToggle
      onSelectNav={onSelectNav}
      stats={[
        { label: "Completed without interruption", icon: <Check className="size-3.5" />, value: "93.4%", delta: { text: "+0.7pt", direction: "up" }, highlight: true },
        { label: "Terminated early — technical", icon: <Monitor className="size-3.5" />, value: "142", delta: { text: "-18", direction: "down" } },
        { label: "Terminated early — integrity flag", icon: <ShieldAlert className="size-3.5" />, value: "31", delta: { text: "+4", direction: "up" } },
      ]}
      chartTitle="Sessions terminated early, by week"
      chart={
        <TrendChart
          categories={REPORT_WEEKS}
          showLegend
          series={[
            { key: "technical", label: "Technical", color: "var(--bar-idle)", emphasis: true },
            { key: "integrity", label: "Integrity flag", color: "var(--red-text)" },
          ]}
          values={{
            technical: [16, 15, 17, 14, 13, 15, 12, 13, 11, 10, 12, 9],
            integrity: [2, 3, 2, 3, 2, 4, 2, 3, 3, 4, 3, 4],
          }}
        />
      }
    />
  )
}

export { ReportsExamCompletionPage }
