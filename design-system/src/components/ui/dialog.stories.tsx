import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Close conversation?</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close this conversation?</DialogTitle>
          <DialogDescription>
            You can still find it afterward under the Closed filter.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Close conversation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
