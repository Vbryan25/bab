import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="user" className="w-80">
      <TabsList>
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      <TabsContent value="user" className="text-sm text-muted-foreground">
        Jordan Lee — BIO 201, Cascade State University
      </TabsContent>
      <TabsContent value="history" className="text-sm text-muted-foreground">
        3 prior conversations
      </TabsContent>
      <TabsContent value="resources" className="text-sm text-muted-foreground">
        No linked resources
      </TabsContent>
    </Tabs>
  ),
}
