import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import {
  CONVERSATIONS,
  INBOX_ARRIVALS,
  INBOX_TAIL_ARRIVALS,
  type ArrivalItem,
  type InboxRowState,
} from "@/data/inbox"

export type StatusFilter = "open" | "closed" | "all"
export type SortBy = "last-activity" | "date-started" | "waiting-since"

function relativeTimeLabel(ms: number) {
  const mins = Math.floor(ms / 60000)
  return mins < 1 ? "Just now" : `${mins}m ago`
}

function formatNowTime() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, "0")
  const ampm = h >= 12 ? "PM" : "AM"
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

function rowFromArrival(item: ArrivalItem): InboxRowState {
  const now = Date.now()
  return {
    key: item.key,
    role: item.role,
    label: item.label,
    preview: item.preview,
    timeMode: item.time === "now" ? "ticking" : item.time ? "fixed" : "badge",
    fixedTime: item.time && item.time !== "now" ? item.time : null,
    arrivedAt: now,
    activityAt: now,
    live: !!item.live,
    unread: true,
    replied: false,
    closed: false,
  }
}

export function useInbox() {
  const [rows, setRows] = useState<InboxRowState[]>([])
  const [activeConvo, setActiveConvo] = useState("welcome")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("open")
  const [sortBy, setSortBy] = useState<SortBy>("last-activity")
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false)
  const [skipCloseConfirm, setSkipCloseConfirm] = useState(false)
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false)
  const [dontAskOpen, setDontAskOpen] = useState(false)
  const [, forceTick] = useState(0)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const cancelDemo = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  // Trickle-in: the list starts with only the pinned Welcome row; every other
  // conversation arrives one at a time on a randomized timer, same idea as
  // the prototype's startInboxTrickle/demoAddChatter.
  useEffect(() => {
    const queue = [...INBOX_ARRIVALS, ...INBOX_TAIL_ARRIVALS]
    let i = 0
    function next() {
      if (i >= queue.length) return
      const item = queue[i++]
      setRows((prev) => [rowFromArrival(item), ...prev])
      const delay = 1400 + Math.random() * 2600
      timersRef.current.push(setTimeout(next, delay))
    }
    timersRef.current.push(setTimeout(next, 1800))
    return cancelDemo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ticking relative timestamps ("3m ago") re-render every 10s.
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 10000)
    return () => clearInterval(id)
  }, [])

  const openCount = useMemo(() => rows.filter((r) => !r.closed).length, [rows])
  const closedCount = rows.length - openCount

  const filterLabel = useMemo(() => {
    if (statusFilter === "open") return `${openCount} Open`
    if (statusFilter === "closed") return `${closedCount} Closed`
    return `${rows.length} Open & Closed`
  }, [statusFilter, openCount, closedCount, rows.length])

  const isRowVisible = useCallback(
    (r: InboxRowState) => {
      if (statusFilter === "open") return !r.closed
      if (statusFilter === "closed") return !!r.closed
      return true
    },
    [statusFilter]
  )

  const sortKeyFor = useCallback(
    (r: InboxRowState, mode: SortBy) => {
      if (mode === "date-started") return r.arrivedAt
      if (mode === "waiting-since") return r.replied ? r.activityAt : r.arrivedAt
      return r.activityAt
    },
    []
  )

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => sortKeyFor(b, sortBy) - sortKeyFor(a, sortBy)),
    [rows, sortBy, sortKeyFor]
  )

  const selectConversation = useCallback(
    (key: string) => {
      if (key === activeConvo) return
      cancelDemo()
      setActiveConvo(key)
      setRows((prev) => prev.map((r) => (r.key === key ? { ...r, unread: false } : r)))
    },
    [activeConvo, cancelDemo]
  )

  const requestCloseActive = useCallback(() => {
    if (activeConvo === "welcome") {
      toast("This is a prototype — the Welcome message can't be closed")
      return
    }
    cancelDemo()
    if (skipCloseConfirm) {
      performClose()
      return
    }
    setCloseConfirmOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConvo, skipCloseConfirm, cancelDemo])

  const performClose = useCallback(() => {
    setRows((prev) => prev.map((r) => (r.key === activeConvo ? { ...r, closed: true, unread: false } : r)))
    toast.success("Conversation closed")
    setActiveConvo("welcome")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConvo])

  const confirmClose = useCallback(() => {
    setCloseConfirmOpen(false)
    performClose()
    setDontAskOpen(true)
  }, [performClose])

  const cancelClose = useCallback(() => setCloseConfirmOpen(false), [])

  const closeDontAsk = useCallback(() => setDontAskOpen(false), [])

  const dontAskAgain = useCallback(() => {
    setSkipCloseConfirm(true)
    setDontAskOpen(false)
    toast.success("Got it — you won't be asked again")
  }, [])

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      const conv = CONVERSATIONS[activeConvo]
      conv.thread = [...conv.thread, { mine: true, text: trimmed, time: formatNowTime() }]
      if (activeConvo !== "welcome") {
        setRows((prev) =>
          prev.map((r) =>
            r.key === activeConvo
              ? { ...r, unread: false, replied: true, activityAt: Date.now(), preview: `You: ${trimmed}` }
              : r
          )
        )
      }
      forceTick((n) => n + 1)
    },
    [activeConvo]
  )

  return {
    rows,
    sortedRows,
    activeConvo,
    conversation: CONVERSATIONS[activeConvo] ?? CONVERSATIONS.welcome,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filterLabel,
    isRowVisible,
    openCount,
    totalCount: rows.length,
    sidePanelCollapsed,
    setSidePanelCollapsed,
    closeConfirmOpen,
    dontAskOpen,
    selectConversation,
    requestCloseActive,
    confirmClose,
    cancelClose,
    closeDontAsk,
    dontAskAgain,
    sendMessage,
    relativeTimeLabel,
  }
}

export type UseInboxReturn = ReturnType<typeof useInbox>
