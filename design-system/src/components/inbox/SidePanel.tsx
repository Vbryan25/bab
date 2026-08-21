import { AppWindow, Cpu, ExternalLink, PanelRightClose, Puzzle, Settings2, User } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { AccordionSection } from "@/data/inbox"
import type { UseInboxReturn } from "./useInbox"

const ACCORDION_ICON = { appWindow: AppWindow, cpu: Cpu, puzzle: Puzzle, user: User, settings2: Settings2 }

function SidePanel(inbox: UseInboxReturn) {
  const { conversation, sidePanelCollapsed, setSidePanelCollapsed } = inbox
  const isWelcome = conversation.key === "welcome"

  if (isWelcome) return null

  const defaultOpen = (conversation.accordion ?? [])
    .map((s: AccordionSection, i: number) => (s.open ? `sec-${i}` : null))
    .filter(Boolean) as string[]

  return (
    <div
      className={cn(
        "flex w-80 shrink-0 flex-col overflow-y-auto rounded-2xl bg-card shadow-card transition-[margin-right,opacity] duration-200",
        sidePanelCollapsed && "pointer-events-none -mr-84 opacity-0"
      )}
    >
      <Tabs defaultValue="user">
        <div className="flex items-center justify-between border-b border-border px-2">
          <TabsList className="rounded-none border-none bg-transparent p-0">
            <TabsTrigger value="user" className="rounded-none border-b-2 border-transparent px-3 py-4 data-[selected]:border-foreground data-[selected]:bg-transparent data-[selected]:shadow-none">
              User
            </TabsTrigger>
            <TabsTrigger
              value="history"
              onClick={() => toast("This is a prototype — only the User tab has live data")}
              className="rounded-none border-b-2 border-transparent px-3 py-4 data-[selected]:border-foreground data-[selected]:bg-transparent data-[selected]:shadow-none"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              onClick={() => toast("This is a prototype — only the User tab has live data")}
              className="rounded-none border-b-2 border-transparent px-3 py-4 data-[selected]:border-foreground data-[selected]:bg-transparent data-[selected]:shadow-none"
            >
              Resources
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1 p-2">
            <Button variant="ghost" size="icon-sm" aria-label="Open in new window">
              <ExternalLink className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Collapse context panel"
              title="Collapse context panel"
              onClick={() => setSidePanelCollapsed(true)}
            >
              <PanelRightClose className="size-3.5" />
            </Button>
          </div>
        </div>
        <TabsContent value="user">
          <div className="flex flex-col gap-3.5 p-4">
            {conversation.fields && conversation.fields.length > 0 ? (
              conversation.fields.map((f) => (
                <div key={f.label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                  <strong className="text-sm font-medium">{f.value}</strong>
                </div>
              ))
            ) : (
              <div className="px-1 py-3 text-sm text-muted-foreground">No details to show for this message.</div>
            )}
          </div>
          {conversation.accordion && conversation.accordion.length > 0 && (
            <Accordion multiple defaultValue={defaultOpen}>
              {conversation.accordion.map((section, i) => {
                const Icon = ACCORDION_ICON[section.icon]
                return (
                  <AccordionItem key={i} value={`sec-${i}`} className="px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <span className="flex items-center gap-2.5 font-medium">
                        <Icon className="size-4 text-muted-foreground" />
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2.5">
                        {section.rows.map((r) => (
                          <div key={r.label} className="flex flex-col gap-0.5">
                            <strong className="text-xs font-medium">{r.label}</strong>
                            <span className="text-xs text-muted-foreground">{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { SidePanel }
