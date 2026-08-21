import { BookOpen, ExternalLink, FileText, LayoutGrid } from "lucide-react"

import type { NavEntry } from "@/components/chrome/SecondaryNav"

export const KNOWLEDGE_NAV_ENTRIES: NavEntry[] = [
  { type: "item", key: "knowledge-sources", label: "Sources", icon: LayoutGrid },
  { type: "item", key: "knowledge-content", label: "Content", icon: BookOpen },
  { type: "item", key: "knowledge-articles", label: "Articles", icon: FileText },
  { type: "item", key: "help-center", label: "Help Center", icon: ExternalLink, external: true },
]
