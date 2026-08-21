import { useEffect, useRef, useState } from "react"
import { useInbox } from "@/components/inbox/useInbox"
import { ConversationList } from "@/components/inbox/ConversationList"
import { ChatHeader } from "@/components/inbox/ChatHeader"
import { MessageThread } from "@/components/inbox/MessageThread"
import { Composer, type ComposerHandle } from "@/components/inbox/Composer"
import { SidePanel } from "@/components/inbox/SidePanel"
import { CloseConversationDialogs } from "@/components/inbox/CloseConversationDialogs"
import { CommandPalette } from "@/components/inbox/CommandPalette"

function InboxPage() {
  const inbox = useInbox()
  const composerRef = useRef<ComposerHandle>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return
      e.preventDefault()
      setPaletteOpen((v) => !v)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="flex flex-1">
      <ConversationList {...inbox} />
      <div className="flex flex-1 gap-2 p-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-card shadow-card">
          <ChatHeader {...inbox} />
          <MessageThread conversation={inbox.conversation} />
          <Composer
            ref={composerRef}
            activeConvo={inbox.activeConvo}
            sendMessage={inbox.sendMessage}
          />
        </div>
        <SidePanel {...inbox} />
      </div>
      <CloseConversationDialogs {...inbox} />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onRunCommand={(cmd) => {
          if (cmd.insertText) composerRef.current?.insertText(cmd.insertText)
        }}
      />
    </div>
  )
}

export { InboxPage }
