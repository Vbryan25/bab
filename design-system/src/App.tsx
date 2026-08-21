import { useState } from "react"
import { toast } from "sonner"

import { AppShell } from "@/components/chrome/AppShell"
import type { NavKey } from "@/components/chrome/IconRail"
import { InboxPage } from "@/pages/InboxPage"
import { KnowledgeSourcesPage } from "@/pages/KnowledgeSourcesPage"
import { KnowledgeContentPage } from "@/pages/KnowledgeContentPage"
import { ReportsOverviewPage } from "@/pages/ReportsOverviewPage"
import { ReportsAllPage } from "@/pages/ReportsAllPage"
import { ReportsResponseTimePage } from "@/pages/ReportsResponseTimePage"
import { ReportsRoomScanPage } from "@/pages/ReportsRoomScanPage"
import { ReportsLockdownBrowserPage } from "@/pages/ReportsLockdownBrowserPage"
import { ReportsScreenSharePage } from "@/pages/ReportsScreenSharePage"
import { ReportsConversationsByRolePage } from "@/pages/ReportsConversationsByRolePage"
import { ReportsExamCompletionPage } from "@/pages/ReportsExamCompletionPage"
import { SettingsIntegrationsPage } from "@/pages/SettingsIntegrationsPage"

const BUILT_PAGES: NavKey[] = ["inbox", "knowledge", "reports", "settings"]

const BUILT_REPORTS_PAGES = [
  "reports-overview",
  "reports-all",
  "reports-response-time",
  "reports-room-scan",
  "reports-lockdown-browser",
  "reports-screen-share",
  "reports-conversations-by-role",
  "reports-exam-completion",
]
const BUILT_KNOWLEDGE_PAGES = ["knowledge-sources", "knowledge-content"]
const BUILT_SETTINGS_PAGES = ["settings-integrations"]

function App() {
  const [page, setPage] = useState<NavKey>("inbox")
  const [reportsSubPage, setReportsSubPage] = useState("reports-overview")
  const [knowledgeSubPage, setKnowledgeSubPage] = useState("knowledge-sources")
  const [settingsSubPage, setSettingsSubPage] = useState("settings-integrations")

  function onSelectReportsNav(key: string) {
    if (BUILT_REPORTS_PAGES.includes(key)) setReportsSubPage(key)
    else toast(`This is a prototype — the ${key} screen hasn't been ported yet`)
  }

  function onSelectKnowledgeNav(key: string) {
    if (BUILT_KNOWLEDGE_PAGES.includes(key)) setKnowledgeSubPage(key)
    else toast(`This is a prototype — the ${key} screen hasn't been ported yet`)
  }

  function onSelectSettingsNav(key: string) {
    if (BUILT_SETTINGS_PAGES.includes(key)) setSettingsSubPage(key)
    else toast(`This is a prototype — the ${key} screen hasn't been ported yet`)
  }

  return (
    <AppShell
      active={page}
      onSelect={(key) => {
        if (BUILT_PAGES.includes(key)) setPage(key)
        else toast(`This is a prototype — the ${key} screen hasn't been ported yet`)
      }}
    >
      {page === "inbox" && <InboxPage />}

      {page === "knowledge" && knowledgeSubPage === "knowledge-sources" && (
        <KnowledgeSourcesPage onSelectNav={onSelectKnowledgeNav} />
      )}
      {page === "knowledge" && knowledgeSubPage === "knowledge-content" && (
        <KnowledgeContentPage onSelectNav={onSelectKnowledgeNav} />
      )}

      {page === "reports" && reportsSubPage === "reports-overview" && (
        <ReportsOverviewPage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-all" && (
        <ReportsAllPage onSelectNav={onSelectReportsNav} onOpenReport={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-response-time" && (
        <ReportsResponseTimePage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-room-scan" && (
        <ReportsRoomScanPage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-lockdown-browser" && (
        <ReportsLockdownBrowserPage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-screen-share" && (
        <ReportsScreenSharePage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-conversations-by-role" && (
        <ReportsConversationsByRolePage onSelectNav={onSelectReportsNav} />
      )}
      {page === "reports" && reportsSubPage === "reports-exam-completion" && (
        <ReportsExamCompletionPage onSelectNav={onSelectReportsNav} />
      )}

      {page === "settings" && settingsSubPage === "settings-integrations" && (
        <SettingsIntegrationsPage onSelectNav={onSelectSettingsNav} />
      )}
    </AppShell>
  )
}

export default App
