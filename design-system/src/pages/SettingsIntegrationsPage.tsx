import { AppWindow } from "lucide-react"
import { toast } from "sonner"

import { Topbar } from "@/components/chrome/Topbar"
import { SecondaryNav } from "@/components/chrome/SecondaryNav"
import { SourceCard } from "@/components/dashboard/SourceCard"
import { SETTINGS_NAV_ENTRIES } from "@/data/settingsNav"

interface SettingsIntegrationsPageProps {
  onSelectNav?: (key: string) => void
}

function notWiredUp() {
  toast("This is a prototype — integration settings aren't wired up yet")
}

function SettingsIntegrationsPage({ onSelectNav }: SettingsIntegrationsPageProps) {
  return (
    <div className="flex flex-1">
      <SecondaryNav
        title="Settings"
        entries={SETTINGS_NAV_ENTRIES}
        active="settings-integrations"
        onSelect={(key) => (onSelectNav ? onSelectNav(key) : toast(`This is a prototype — the ${key} screen hasn't been ported yet`))}
      />
      <div className="flex-1 p-4 pl-2">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <Topbar title="Integrations" />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-wrap gap-4">
              <SourceCard
                thumbBg="#ffffff"
                thumbBorder
                thumbContent={<AppWindow className="size-10" style={{ color: "#D64027" }} />}
                title="Canvas LMS"
                status="live"
                liveLabel="Connected"
                description="Powers the exam and course details shown in each conversation's Environment panel."
                actionLabel="Manage"
                onAction={notWiredUp}
              />
              <SourceCard
                thumbBg="#ffffff"
                thumbBorder
                thumbContent={
                  <div
                    className="flex size-10 items-center justify-center rounded-lg text-base font-bold text-white"
                    style={{ backgroundColor: "#03363d" }}
                  >
                    Z
                  </div>
                }
                title="Zendesk"
                status="not-live"
                notLiveLabel="Not connected"
                description="Sync support tickets and Help Center articles into your knowledge sources."
                actionLabel="Connect"
                onAction={notWiredUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SettingsIntegrationsPage }
