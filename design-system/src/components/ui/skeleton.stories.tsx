import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "./skeleton"

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const StatGrid: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-4 gap-3">
      <Skeleton className="h-22 rounded-xl" />
      <Skeleton className="h-22 rounded-xl" />
      <Skeleton className="h-22 rounded-xl" />
      <Skeleton className="h-22 rounded-xl" />
    </div>
  ),
}

export const ListRow: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  ),
}
