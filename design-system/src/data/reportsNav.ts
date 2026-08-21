import {
  BarChart3,
  CalendarClock,
  Download,
  FileText,
  LayoutGrid,
  ListFilter,
} from "lucide-react"

import type { NavEntry } from "@/components/chrome/SecondaryNav"

export const REPORTS_NAV_ENTRIES: NavEntry[] = [
  { type: "item", key: "reports-overview", label: "Overview", icon: LayoutGrid },
  { type: "item", key: "reports-all", label: "All reports", icon: BarChart3, count: 31 },
  { type: "item", key: "reports-your", label: "Your reports", icon: FileText, count: 0 },
  { type: "item", key: "reports-saved-filters", label: "Saved filters", icon: ListFilter },
  { type: "item", key: "reports-export", label: "Dataset export", icon: Download },
  { type: "item", key: "reports-schedules", label: "Manage schedules", icon: CalendarClock },
  { type: "divider" },
  {
    type: "folder",
    id: "human-support",
    label: "Human Support",
    children: [
      { key: "reports-topics", label: "Conversation Topics" },
      { key: "reports-conversations-by-role", label: "New Conversations by Role" },
      { key: "reports-response-time", label: "Response Time" },
      { key: "reports-csat", label: "Satisfaction (CSAT)" },
    ],
  },
  {
    type: "folder",
    id: "ai-automation",
    label: "AI & Automation",
    children: [{ key: "reports-ai-assist", label: "AI Assist" }],
  },
  {
    type: "folder",
    id: "proctoring",
    label: "Proctoring",
    children: [
      { key: "reports-flagged-sessions", label: "Flagged Sessions" },
      { key: "reports-room-scan", label: "Room Scan Failures" },
      { key: "reports-lockdown-browser", label: "Lockdown Browser" },
      { key: "reports-extension-violations", label: "Extension Violations" },
      { key: "reports-screen-share", label: "Screen Share & Multi-Monitor" },
      { key: "reports-exam-completion", label: "Exam Completion Rate" },
    ],
  },
]

export const REPORT_CATEGORIES = ["Human Support", "AI & Automation", "Proctoring"]

export const REPORT_WEEKS = [
  "May 18", "May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22",
  "Jun 29", "Jul 6", "Jul 13", "Jul 20", "Jul 27", "Aug 3",
]
