import { useState } from "react"
import { Bot, Plus } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/chrome/Topbar"
import { SecondaryNav } from "@/components/chrome/SecondaryNav"
import { SourceCard, SourceList, SourceListRow } from "@/components/dashboard/SourceCard"
import { KNOWLEDGE_NAV_ENTRIES } from "@/data/knowledgeNav"

const TABS = ["All sources", "AI Agent", "Copilot", "Help Center"] as const

interface KnowledgeSourcesPageProps {
  onSelectNav?: (key: string) => void
}

function KnowledgeSourcesPage({ onSelectNav }: KnowledgeSourcesPageProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All sources")

  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Knowledge"
        entries={KNOWLEDGE_NAV_ENTRIES}
        active="knowledge-sources"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : toast(`This is a prototype — the ${key} screen hasn't been ported yet`))}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar
            title="Sources"
            actions={
              <>
                <Button variant="secondary">Operator</Button>
                <Button variant="secondary">Learn ⌄</Button>
                <Button>
                  <Plus className="size-4" /> New content
                </Button>
              </>
            }
          />
          <div className="flex gap-0 border-b border-border px-6">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  if (t !== "All sources") toast("This is a prototype — this tab isn't wired up yet")
                  setTab(t)
                }}
                className={cn(
                  "border-b-2 px-3 py-4 text-sm font-medium",
                  tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
            <div>
              <h3 className="mb-4 text-base font-semibold tracking-tight">
                Optimize your content for AI Assist, Copilot, and Help Center
              </h3>
              <div className="flex flex-wrap gap-4">
                <SourceCard
                  thumbBg="#bfeacb"
                  thumbContent={<span className="text-[22px] font-bold tracking-wide text-[#2f7549] uppercase">BAB Help</span>}
                  title="Help Center"
                  status="live"
                  description="Students and instructors use your knowledge to find accurate answers themselves."
                />
                <SourceCard
                  thumbBg="#bfe6ea"
                  thumbContent={<Bot className="size-10 text-[#0c4a6e]" />}
                  title="AI Assist"
                  status="not-live"
                  description="AI Assist uses your knowledge to generate accurate answers for students, instructors, and administrators."
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Public articles</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Let AI Assist and Copilot use public articles from your Help Center.
                </p>
              </div>
              <SourceList>
                <SourceListRow
                  mark="EH"
                  title="Company Help Center"
                  meta="1 article"
                  actionLabel="Add article"
                  onAction={() => toast("This is a prototype — adding articles isn't wired up yet")}
                />
                <SourceListRow
                  mark="Z"
                  markBg="#03363d"
                  title="Zendesk"
                  meta="Not set up"
                  actionLabel="Sync or Import"
                  connected={false}
                  onAction={() => toast("This is a prototype — syncing sources isn't wired up yet")}
                />
              </SourceList>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Internal articles</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Give AI Assist and Copilot internal knowledge only available to you and your team.
                </p>
              </div>
              <SourceList>
                <SourceListRow
                  mark=""
                  markBg="#1f2e47"
                  title="Agent Runbooks"
                  meta="1 article"
                  actionLabel="Add article"
                  onAction={() => toast("This is a prototype — adding articles isn't wired up yet")}
                />
              </SourceList>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { KnowledgeSourcesPage }
