import { Globe, LayoutGrid, ListChecks, Puzzle } from "lucide-react"

import type { NavEntry } from "@/components/chrome/SecondaryNav"

export const SETTINGS_NAV_ENTRIES: NavEntry[] = [
  { type: "item", key: "settings-home", label: "Home", icon: LayoutGrid },
  { type: "item", key: "settings-general", label: "General", icon: ListChecks },
  { type: "item", key: "settings-institutions", label: "Institutions", icon: Globe },
  { type: "item", key: "settings-integrations", label: "Integrations", icon: Puzzle },
]
