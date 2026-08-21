import { useMemo, useState } from "react"
import {
  BarChart3,
  CameraOff,
  Check,
  Clock,
  Flag,
  Monitor,
  MessageSquare,
  Plus,
  Puzzle,
  Smile,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Topbar } from "@/components/chrome/Topbar"
import { SecondaryNav } from "@/components/chrome/SecondaryNav"
import { REPORTS_NAV_ENTRIES, REPORT_CATEGORIES } from "@/data/reportsNav"

interface ReportRow {
  icon: LucideIcon
  name: string
  category: string
  type: string
  viewed: string
  author: string
  page: string
}

const ROWS: ReportRow[] = [
  { icon: MessageSquare, name: "Conversation topics", category: "Human Support", type: "Donut", viewed: "Just now", author: "Victoria Bryan", page: "reports-topics" },
  { icon: BarChart3, name: "Overall volume growth", category: "Human Support", type: "Line", viewed: "2 hours ago", author: "Victoria Bryan", page: "reports-overview" },
  { icon: Users, name: "New conversations by role", category: "Human Support", type: "Line", viewed: "2 hours ago", author: "Victoria Bryan", page: "reports-conversations-by-role" },
  { icon: Clock, name: "Response time", category: "Human Support", type: "Line", viewed: "2 hours ago", author: "Victoria Bryan", page: "reports-response-time" },
  { icon: Smile, name: "Satisfaction (CSAT)", category: "Human Support", type: "Line", viewed: "5 hours ago", author: "Victoria Bryan", page: "reports-csat" },
  { icon: UserCheck, name: "AI Assist deflection rate", category: "AI & Automation", type: "Line", viewed: "2 days ago", author: "Victoria Bryan", page: "reports-ai-assist" },
  { icon: Flag, name: "Flagged sessions by week", category: "Proctoring", type: "Bar", viewed: "3 hours ago", author: "Victoria Bryan", page: "reports-flagged-sessions" },
  { icon: CameraOff, name: "Room scan failure rate", category: "Proctoring", type: "Line", viewed: "1 day ago", author: "Jordan Kim", page: "reports-room-scan" },
  { icon: Monitor, name: "Lockdown browser stability", category: "Proctoring", type: "Line", viewed: "1 day ago", author: "Jordan Kim", page: "reports-lockdown-browser" },
  { icon: Puzzle, name: "Extension violations detected", category: "Proctoring", type: "Bar", viewed: "1 day ago", author: "Jordan Kim", page: "reports-extension-violations" },
  { icon: Monitor, name: "Screen share & multi-monitor issues", category: "Proctoring", type: "Line", viewed: "1 day ago", author: "Jordan Kim", page: "reports-screen-share" },
  { icon: Check, name: "Exam completion rate", category: "Proctoring", type: "Line", viewed: "4 days ago", author: "Jordan Kim", page: "reports-exam-completion" },
]

interface ReportsAllPageProps {
  onSelectNav?: (key: string) => void
  onOpenReport?: (page: string) => void
}

function ReportsAllPage({ onSelectNav, onOpenReport }: ReportsAllPageProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return ROWS.filter((r) => {
      const matchesQ = !q || r.name.toLowerCase().includes(q)
      const matchesCat = !category || r.category === category
      return matchesQ && matchesCat
    })
  }, [search, category])

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Reports"
        entries={REPORTS_NAV_ENTRIES}
        active="reports-all"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : toast(`This is a prototype — the ${key} screen hasn't been ported yet`))}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title="All reports"
            actions={
              <Button onClick={() => toast("This is a prototype — creating reports isn't wired up yet")}>
                <Plus className="size-4" /> New report
              </Button>
            }
          />
          <div className="flex items-center gap-2 border-b border-border px-6 pb-3.5">
            <Input
              placeholder="Search reports"
              className="h-8 w-45 rounded-full bg-pill"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <div className="flex-1 overflow-y-auto p-6">
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last viewed</TableHead>
                    <TableHead>Created by</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                        No reports match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((r) => (
                      <TableRow
                        key={r.name}
                        className="cursor-pointer"
                        onClick={() =>
                          onOpenReport ? onOpenReport(r.page) : toast("This is a prototype — this screen hasn't been ported yet")
                        }
                      >
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-2">
                            <r.icon className="size-4 text-muted-foreground" />
                            {r.name}
                          </span>
                        </TableCell>
                        <TableCell>{r.category}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>{r.viewed}</TableCell>
                        <TableCell>{r.author}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReportsAllPage }
