import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { UseInboxReturn } from "./useInbox"

function CloseConversationDialogs(inbox: UseInboxReturn) {
  const { closeConfirmOpen, cancelClose, confirmClose, dontAskOpen, closeDontAsk, dontAskAgain } = inbox

  return (
    <>
      <Dialog open={closeConfirmOpen} onOpenChange={(open) => !open && cancelClose()}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Confirm</div>
            <DialogTitle>Close this conversation?</DialogTitle>
            <DialogDescription>You can still find it afterward under the Closed filter.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={cancelClose}>
              Cancel
            </Button>
            <Button onClick={confirmClose}>Close conversation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dontAskOpen} onOpenChange={(open) => !open && closeDontAsk()}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Got it</div>
            <DialogTitle>Skip this confirmation next time?</DialogTitle>
            <DialogDescription>You can close conversations right away, without being asked again.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDontAsk}>
              Keep asking
            </Button>
            <Button onClick={dontAskAgain}>Don't ask again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { CloseConversationDialogs }
