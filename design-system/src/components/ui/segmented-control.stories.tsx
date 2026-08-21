import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { SegmentedControl } from "./segmented-control"

const meta = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [value, setValue] = useState("week")
  return (
    <SegmentedControl
      value={value}
      onValueChange={setValue}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  )
}

export const Default: Story = {
  args: { options: [], value: "", onValueChange: () => {} },
  render: () => <Demo />,
}
