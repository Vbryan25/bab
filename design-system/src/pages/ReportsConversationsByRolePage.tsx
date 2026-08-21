import { Shield, User, UserCheck } from "lucide-react"

import { ReportMetricLayout } from "@/components/dashboard/ReportMetricLayout"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { REPORT_WEEKS } from "@/data/reportsNav"

interface PageProps {
  onSelectNav?: (key: string) => void
}

function ReportsConversationsByRolePage({ onSelectNav }: PageProps) {
  return (
    <ReportMetricLayout
      navActiveKey="reports-conversations-by-role"
      title="New Conversations by Role"
      subtitle="See how new conversation volume breaks down by who's asking for help."
      searchPlaceholder="Search conversations"
      filterLabel="All roles"
      filterOptions={["Student", "Instructor", "Administrator"]}
      onSelectNav={onSelectNav}
      stats={[
        { label: "Student conversations", icon: <User className="size-3.5" />, value: "13", delta: { text: "+1", direction: "up" } },
        { label: "Instructor conversations", icon: <UserCheck className="size-3.5" />, value: "7", delta: { text: "+1", direction: "up" } },
        { label: "Administrator conversations", icon: <Shield className="size-3.5" />, value: "3" },
      ]}
      chartTitle="New conversations by role, last 12 weeks"
      chart={
        <TrendChart
          categories={REPORT_WEEKS}
          showLegend
          series={[
            { key: "student", label: "Student", color: "var(--series-student)" },
            { key: "instructor", label: "Instructor", color: "var(--series-instructor)" },
            { key: "admin", label: "Administrator", color: "var(--series-admin)" },
          ]}
          values={{
            student: [5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13],
            instructor: [3, 3, 4, 3, 4, 4, 4, 5, 5, 6, 6, 7],
            admin: [1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3],
          }}
        />
      }
    />
  )
}

export { ReportsConversationsByRolePage }
