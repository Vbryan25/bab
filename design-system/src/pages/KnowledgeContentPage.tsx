import { useMemo, useState } from "react"
import { Check, FileText, Folder, MessageSquare, Plus, type LucideIcon } from "lucide-react"
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
import { KNOWLEDGE_NAV_ENTRIES } from "@/data/knowledgeNav"

const TYPES = ["Folder", "Article", "Snippet"]

interface ContentRow {
  icon: LucideIcon
  name: string
  type: string
  usedIn: string
  edited: string
  author: string
}

const ROWS: ContentRow[] = [
  { icon: Folder, name: "Restart Lockdown Browser", type: "Folder", usedIn: "AI Assist, Copilot", edited: "Aug 12, 2026", author: "Victoria Bryan" },
  { icon: FileText, name: "Camera & mic permissions", type: "Article", usedIn: "Help Center, AI Assist", edited: "Aug 10, 2026", author: "Victoria Bryan" },
  { icon: FileText, name: "Room scan troubleshooting", type: "Article", usedIn: "Help Center, Copilot", edited: "Aug 9, 2026", author: "Jordan Kim" },
  { icon: Folder, name: "Exam accommodation policy", type: "Folder", usedIn: "AI Assist, Help Center", edited: "Aug 5, 2026", author: "Victoria Bryan" },
  { icon: MessageSquare, name: "Standard greeting", type: "Snippet", usedIn: "AI Assist, Copilot", edited: "Jul 30, 2026", author: "Jordan Kim" },
  { icon: FileText, name: "Extension conflict checklist", type: "Article", usedIn: "Copilot", edited: "Jul 22, 2026", author: "Victoria Bryan" },
]

interface KnowledgeContentPageProps {
  onSelectNav?: (key: string) => void
}

function KnowledgeContentPage({ onSelectNav }: KnowledgeContentPageProps) {
  const [search, setSearch] = useState("")
  const [type, setType] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return ROWS.filter((r) => {
      const matchesQ = !q || r.name.toLowerCase().includes(q)
      const matchesType = !type || r.type === type
      return matchesQ && matchesType
    })
  }, [search, type])

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Knowledge"
        entries={KNOWLEDGE_NAV_ENTRIES}
        active="knowledge-content"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : toast(`This is a prototype — the ${key} screen hasn't been ported yet`))}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title="Content"
            actions={
              <Button onClick={() => toast("This is a prototype — creating content isn't wired up yet")}>
                <Plus className="size-4" /> Create content
              </Button>
            }
          />
          <div className="flex items-center gap-2 border-b border-border px-6 pb-3.5">
            <Input
              placeholder="Search content"
              className="h-8 w-45 rounded-full bg-pill"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="secondary" className="rounded-full" />}>
                {type ?? "All types"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setType(null)}>
                  All types
                  {type === null && <Check className="ml-auto size-3.5" />}
                </DropdownMenuItem>
                {TYPES.map((t) => (
                  <DropdownMenuItem key={t} onSelect={() => setType(t)}>
                    {t}
                    {type === t && <Check className="ml-auto size-3.5" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => toast("This is a prototype — folder view isn't wired up yet")}
            >
              <Folder className="size-3.5" /> Folders
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Used in</TableHead>
                    <TableHead>Last edited</TableHead>
                    <TableHead>Author</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                        No content matches your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((r) => (
                      <TableRow key={r.name}>
                        <TableCell className="font-medium">
                          <span className="flex items-center gap-2">
                            <r.icon className="size-4 text-muted-foreground" />
                            {r.name}
                          </span>
                        </TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>{r.usedIn}</TableCell>
                        <TableCell>{r.edited}</TableCell>
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

export { KnowledgeContentPage }
