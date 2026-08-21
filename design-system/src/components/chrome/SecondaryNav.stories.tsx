import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart3, LayoutGrid } from "lucide-react"

import { SecondaryNav, type NavEntry } from "./SecondaryNav"

const meta = {
  title: "Chrome/SecondaryNav",
  component: SecondaryNav,
  tags: ["autodocs"],
} satisfies Meta<typeof SecondaryNav>

export default meta
type Story = StoryObj<typeof meta>

const ENTRIES: NavEntry[] = [
  { type: "item", key: "reports-overview", label: "Overview", icon: LayoutGrid },
  { type: "item", key: "reports-all", label: "All reports", icon: BarChart3, count: 31 },
  { type: "divider" },
  {
    type: "folder",
    id: "human-support",
    label: "Human Support",
    children: [
      { key: "reports-topics", label: "Conversation Topics" },
      { key: "reports-response-time", label: "Response Time" },
      { key: "reports-csat", label: "CSAT" },
    ],
  },
  {
    type: "folder",
    id: "proctoring",
    label: "Proctoring",
    children: [
      { key: "reports-room-scan", label: "Room Scan" },
      { key: "reports-lockdown-browser", label: "Lockdown Browser" },
    ],
  },
]

function Demo() {
  const [active, setActive] = useState("reports-topics")
  return <SecondaryNav title="Reports" entries={ENTRIES} active={active} onSelect={setActive} />
}

export const Default: Story = {
  args: { title: "", entries: [], active: "", onSelect: () => {} },
  render: () => <Demo />,
}
