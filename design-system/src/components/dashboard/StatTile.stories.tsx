import type { Meta, StoryObj } from "@storybook/react-vite"
import { MessageCircle } from "lucide-react"

import { StatGrid, StatTile } from "./StatTile"

const meta = {
  title: "Dashboard/StatTile",
  component: StatTile,
  tags: ["autodocs"],
} satisfies Meta<typeof StatTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Total conversations",
    value: "482",
    delta: { text: "+12% vs last period", direction: "up" },
  },
}

export const Grid: Story = {
  args: { label: "", value: "" },
  render: () => (
    <StatGrid className="w-220">
      <StatTile
        label="Total conversations"
        icon={<MessageCircle className="size-3.5" />}
        value="482"
        delta={{ text: "+12%", direction: "up" }}
        caption="Last 7 days"
      />
      <StatTile label="Escalated" value="14" delta={{ text: "+3", direction: "down" }} highlight caption="Requires review" />
      <StatTile label="Avg. response time" value="2m 14s" delta={{ text: "Above target", direction: "warn" }} />
      <StatTile label="CSAT" value="94%" delta={{ text: "+2 pts", direction: "up" }} />
    </StatGrid>
  ),
}
