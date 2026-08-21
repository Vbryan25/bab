import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Escalated conversations</CardTitle>
        <CardDescription>Last 7 days across all institutions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          14 conversations were escalated, up 3 from the prior period.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View report</Button>
      </CardFooter>
    </Card>
  ),
}
