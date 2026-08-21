import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ArrowUp, Mic, Smile, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AI_SUGGESTIONS, EMOJIS } from "@/data/inbox"
import { ALL_COMMANDS, type CommandDef } from "./commands"
import type { UseInboxReturn } from "./useInbox"

const DICTATION_PHRASE = "Sure — I'll walk you through the restart steps now."

function placeCaretAtEnd(el: HTMLElement) {
  el.focus()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

export interface ComposerHandle {
  insertText: (text: string) => void
}

const Composer = forwardRef<ComposerHandle, Pick<UseInboxReturn, "activeConvo" | "sendMessage">>(function Composer(
  { activeConvo, sendMessage },
  ref
) {
  const inputRef = useRef<HTMLDivElement>(null)
  const [hasText, setHasText] = useState(false)
  const [commandQuery, setCommandQuery] = useState<string | null>(null)
  const [micRecording, setMicRecording] = useState(false)
  const micTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Composer is intentionally uncontrolled (a real contenteditable div) so
  // typing never fights React re-rendering the caret position — same reason
  // the prototype reads el.textContent directly instead of using state.
  useEffect(() => {
    const el = inputRef.current
    if (el) el.textContent = ""
    setHasText(false)
    setCommandQuery(null)
  }, [activeConvo])

  function onInput() {
    const el = inputRef.current
    if (!el) return
    const text = el.textContent ?? ""
    setHasText(text.trim().length > 0)
    const trimmed = text.trim()
    setCommandQuery(trimmed.startsWith("!") ? trimmed.slice(1).toLowerCase() : null)
  }

  function insertText(text: string) {
    const el = inputRef.current
    if (!el) return
    el.textContent = text
    placeCaretAtEnd(el)
    setHasText(text.trim().length > 0)
    setCommandQuery(null)
  }

  useImperativeHandle(ref, () => ({ insertText }))

  function send() {
    const el = inputRef.current
    if (!el) return
    const text = (el.textContent ?? "").trim()
    if (!text) return
    sendMessage(text)
    el.textContent = ""
    setHasText(false)
    setCommandQuery(null)
    el.focus()
  }

  function runCommand(cmd: CommandDef) {
    if (cmd.requiresApproval) {
      toast(`This is a prototype — ${cmd.name} isn't wired up in this pass`)
      setCommandQuery(null)
      return
    }
    if (cmd.insertText) insertText(cmd.insertText)
  }

  function toggleMic() {
    if (micRecording) {
      if (micTimer.current) clearTimeout(micTimer.current)
      setMicRecording(false)
      return
    }
    const el = inputRef.current
    const base = el?.textContent?.trim() ? `${el.textContent.trim()} ` : ""
    setMicRecording(true)
    micTimer.current = setTimeout(() => {
      setMicRecording(false)
      if (el) {
        el.textContent = base + DICTATION_PHRASE
        placeCaretAtEnd(el)
      }
      setHasText(true)
    }, 1400)
  }

  const filteredCommands = commandQuery === null
    ? []
    : ALL_COMMANDS.filter((c) => !commandQuery || c.name.toLowerCase().includes(commandQuery) || c.shortcut.toLowerCase().includes(commandQuery))

  return (
    <div className="relative px-4 pt-4.5 pb-4">
      <div className="flex flex-col gap-4 rounded-[10px] border border-transparent bg-background p-2 pl-3.5 transition-colors focus-within:border-muted3 focus-within:bg-card">
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          data-placeholder="Type a message or ! for commands"
          onInput={onInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              send()
            } else if (e.key === "Escape") {
              setCommandQuery(null)
            }
          }}
          className="min-h-6 max-h-30 cursor-text overflow-y-auto text-base break-words whitespace-pre-wrap outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        />
        <div className="flex items-end justify-between">
          <div className="flex gap-0.5 text-muted-foreground">
            <Popover>
              <PopoverTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Emoji" />}>
                <Smile className="size-5" />
              </PopoverTrigger>
              <PopoverContent className="w-66" align="start">
                <div className="grid grid-cols-8 gap-0.5">
                  {EMOJIS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      className="rounded-md p-1 text-lg leading-none hover:bg-background"
                      onClick={() => {
                        const el = inputRef.current
                        if (!el) return
                        el.textContent = (el.textContent ?? "") + em
                        placeCaretAtEnd(el)
                        setHasText(true)
                      }}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Speech to text"
              onClick={toggleMic}
              className={cn(micRecording && "text-primary")}
            >
              <Mic className={cn("size-5", micRecording && "animate-pulse")} />
            </Button>
            <Popover>
              <PopoverTrigger render={<Button variant="ghost" size="icon-sm" aria-label="AI Assist" />}>
                <Sparkles className="size-5" />
              </PopoverTrigger>
              <PopoverContent className="w-95 p-0" align="start">
                <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Sparkles className="size-3.5 text-primary" /> AI Assist · Suggested replies
                </div>
                {AI_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      "block w-full px-3.5 py-2.5 text-left text-[13px] leading-snug hover:bg-background",
                      i > 0 && "border-t border-border-soft"
                    )}
                    onClick={() => insertText(s)}
                  >
                    {s}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          <Button size="icon" aria-label="Send" disabled={!hasText} onClick={send}>
            <ArrowUp className="size-5" />
          </Button>
        </div>
      </div>

      {commandQuery !== null && (
        <div className="absolute bottom-38 left-4 z-20 w-115 max-w-[calc(100%-2rem)] overflow-hidden rounded-xl border border-border bg-card shadow-[0_12px_32px_rgba(0,0,0,.14)]">
          <div className="m-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">!</span> Commands · type to filter
            <span className="ml-auto rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground">⌘K</span>
          </div>
          <div className="max-h-85 overflow-y-auto pb-2">
            {filteredCommands.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">No matching commands</div>
            ) : (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.key}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="mx-1.5 flex w-[calc(100%-0.75rem)] items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-background"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-5.5 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                      <cmd.icon className="size-3.5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm text-foreground">{cmd.name}</span>
                      {cmd.subtext && <span className="mt-0.5 text-xs text-muted-foreground">{cmd.subtext}</span>}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-xs whitespace-nowrap text-muted-foreground">
                    {cmd.shortcut}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export { Composer }
