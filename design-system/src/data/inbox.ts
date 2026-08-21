export type Role = "student" | "instructor" | "admin" | "unknown" | "system"

export interface Message {
  mine: boolean
  text: string
  time: string
  /** Welcome message only — renders wider than the usual bubble max-width. */
  wide?: boolean
}

export interface FieldRow {
  label: string
  value: string
}

export interface AccordionSection {
  icon: "appWindow" | "cpu" | "puzzle" | "user" | "settings2"
  title: string
  rows: { label: string; value: string }[]
  /** Starts expanded. */
  open?: boolean
}

export interface Conversation {
  key: string
  name: string
  role: Role
  initials: string
  canvas?: boolean
  started?: string
  pinned?: boolean
  thread: Message[]
  fields?: FieldRow[]
  accordion?: AccordionSection[]
}

export interface ArrivalItem {
  key: string
  role: Role
  label: string
  preview: string
  /** 'now' ticks a live relative timestamp; omit for a live in-attempt badge; anything else is a fixed label. */
  time?: string
  live?: boolean
}

export interface InboxRowState {
  key: string
  role: Role
  label: string
  preview: string
  timeMode: "fixed" | "ticking" | "badge"
  fixedTime: string | null
  arrivedAt: number
  activityAt: number
  live: boolean
  unread: boolean
  replied: boolean
  closed: boolean
}

/**
 * Flagship conversations — full thread/fields/accordion content. Trimmed to
 * three for this first port (vs. the prototype's six): welcome (pinned, no
 * accordion), jordan (rich 4-section accordion), aisha (simple 1-section
 * accordion) — between them they cover every side-panel shape the screen has.
 */
export const CONVERSATIONS: Record<string, Conversation> = {
  welcome: {
    key: "welcome",
    name: "Integrity Console",
    role: "system",
    initials: "IC",
    started: "Just now",
    pinned: true,
    thread: [
      {
        mine: false,
        wide: true,
        time: "Just now",
        text: "This is a fully interactive front-end prototype — a proctoring and academic-integrity support console, designed and built to showcase product and UX work. Every screen is clickable; all data is fictional and no backend is connected.",
      },
    ],
  },
  jordan: {
    key: "jordan",
    name: "Jordan Lee",
    role: "student",
    initials: "JL",
    canvas: true,
    started: "2:44 PM",
    thread: [
      { mine: false, text: "The lockdown browser closed mid-exam. What do I do?", time: "2:44 PM" },
      { mine: true, text: "Reopen it from your desktop shortcut — your progress is saved automatically.", time: "2:45 PM" },
    ],
    fields: [
      { label: "Student Name", value: "Jordan Lee" },
      { label: "Student ID", value: "e6a0c4f2b8d6e0a4" },
      { label: "Course", value: "BIO 201 · Cell Biology" },
      { label: "Exam", value: "Midterm — Ch. 4-7" },
      { label: "Institution", value: "Cascade State University" },
    ],
    accordion: [
      {
        icon: "user",
        title: "User Data",
        rows: [
          { label: "Email", value: "jordan.lee@cascadestate.edu" },
          { label: "Enrollment Status", value: "Active — Fall 2026" },
          { label: "Accommodations", value: "None on file" },
          { label: "Time Zone", value: "Pacific Time (UTC-7)" },
        ],
      },
      {
        icon: "cpu",
        title: "Hardware & System",
        rows: [
          { label: "Operating System", value: "Windows 11 Home" },
          { label: "Browser", value: "Chrome 128.0.6613" },
          { label: "Lockdown Browser Version", value: "2.1.4 — up to date" },
          { label: "Webcam", value: "Logitech C920 — Connected" },
          { label: "Microphone", value: "Built-in — Connected" },
          { label: "Displays Detected", value: "1 monitor" },
        ],
      },
      {
        icon: "puzzle",
        title: "Extensions",
        rows: [
          { label: "Grammarly", value: "Disabled during exam" },
          { label: "1Password", value: "Disabled during exam" },
          { label: "Honey", value: "Not detected running" },
        ],
      },
      {
        icon: "settings2",
        title: "Exam Settings",
        rows: [
          { label: "Time Limit", value: "90 minutes" },
          { label: "Attempts Allowed", value: "1" },
          { label: "Webcam Required", value: "Yes" },
          { label: "Allowed Materials", value: "None — closed book" },
          { label: "Extra Time Granted", value: "None" },
        ],
      },
      {
        icon: "appWindow",
        title: "Environment",
        open: true,
        rows: [
          { label: "Canvas — BIO 201 Exam", value: "chat.theproctoring.com" },
          { label: "Chegg — Homework Help", value: "May conflict with lockdown browser" },
          { label: "Access status", value: "Identity re-verification required before re-entry" },
        ],
      },
    ],
  },
  aisha: {
    key: "aisha",
    name: "Aisha Patel",
    role: "student",
    initials: "AP",
    started: "1:12 PM",
    thread: [
      { mine: false, text: "I keep getting a black screen after the proctoring loads", time: "1:12 PM" },
      { mine: true, text: "Let's try clearing the app's cache — go to Settings > Privacy > Clear browsing data, then relaunch.", time: "1:13 PM" },
      { mine: false, text: "That worked, thank you!", time: "1:16 PM" },
    ],
    fields: [
      { label: "Student Name", value: "Aisha Patel" },
      { label: "Student ID", value: "8f1c2d4e6a0b3f9c" },
      { label: "Course", value: "PSYC 210 · Intro Psychology" },
      { label: "Exam", value: "Quiz 4" },
      { label: "Institution", value: "Cascade State University" },
    ],
    accordion: [
      {
        icon: "appWindow",
        title: "Environment",
        open: true,
        rows: [
          { label: "Canvas — PSYC 210 Exam", value: "chat.theproctoring.com" },
          { label: "Access status", value: "Cleared — session resumed" },
        ],
      },
    ],
  },
}

/**
 * The inbox starts with only the pinned Welcome row. Everything else
 * trickles in at randomized intervals (see useInboxTrickle) rather than
 * appearing all at once. Trimmed from the prototype's 17 arrivals to a
 * representative handful: the two remaining flagship conversations plus a
 * few auto-generated minimal ones, covering ticking/fixed/live-badge states.
 */
export const INBOX_ARRIVALS: ArrivalItem[] = [
  { key: "aisha", role: "student", label: "Student", preview: "I keep getting a black screen after the proctoring loads", live: true },
  { key: "jordan", role: "student", label: "Student", time: "now", preview: "The lockdown browser closed mid-exam. What do I do?" },
  { key: "filler-verify", role: "unknown", label: "Unknown", time: "now", preview: "It's asking me to verify my identity again and I don't know why" },
  { key: "filler-instructor", role: "admin", label: "Administrator", time: "now", preview: "One of my instructors can't see a student's exam submission" },
]

/** A couple of late arrivals once the main queue finishes, so the list still feels live for a bit. */
export const INBOX_TAIL_ARRIVALS: ArrivalItem[] = [
  { key: "filler-timer", role: "student", label: "Student", preview: "My exam timer looks wrong, is that normal?", live: true },
  { key: "filler-report", role: "admin", label: "Administrator", preview: "Can I get a report of today's flagged sessions?", live: true },
]

// Auto-generate a minimal conversation for every arrival that isn't already
// a flagship one above — a one-message thread using the row's own preview
// text, so every row in the list is openable.
for (const item of [...INBOX_ARRIVALS, ...INBOX_TAIL_ARRIVALS]) {
  if (CONVERSATIONS[item.key]) continue
  CONVERSATIONS[item.key] = {
    key: item.key,
    name: item.label,
    role: item.role,
    initials: item.label[0],
    thread: [{ mine: false, text: item.preview, time: "Just now" }],
  }
}

export const PEOPLE_COLORS: Record<Role, { color: string; bg: string }> = {
  student: { color: "var(--student-foreground)", bg: "var(--student-background)" },
  instructor: { color: "var(--instructor-foreground)", bg: "var(--instructor-background)" },
  admin: { color: "var(--admin-foreground)", bg: "var(--admin-background)" },
  unknown: { color: "var(--muted-foreground)", bg: "var(--border)" },
  system: { color: "#ffffff", bg: "var(--primary)" },
}

export const COMMAND_TEXTS: Record<string, string> = {
  restart: "Let's get your lockdown browser restarted — go ahead and reopen it from your desktop shortcut.",
  verifyid: "Before we continue, I need to verify your student ID on file.",
  greeting: "Hi! Thanks for reaching out — I'm here to help.",
}

export const EMOJIS = [
  "😀", "😊", "🙂", "👍", "🙏", "✅", "❌", "⚠️",
  "🎉", "👀", "💬", "📎", "🕐", "📌", "🙌", "🤝",
  "😅", "😬", "🔧", "💡", "📸", "🖥️", "🔒", "✨",
]

export const AI_SUGGESTIONS = [
  "Glad that worked! Let me know if the browser closes again during the exam.",
  "I can also verify your student ID now, just to be safe — want me to do that?",
  "You're all set. Go ahead and continue with the exam whenever you're ready.",
]

export const SORT_LABELS: Record<string, string> = {
  "last-activity": "Last activity",
  "date-started": "Date started",
  "waiting-since": "Waiting since",
}
