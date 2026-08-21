import { CalendarClock, Flag, Hourglass, RotateCcw, Smile, UserCheck, type LucideIcon } from "lucide-react"

export interface CommandDef {
  key: string
  icon: LucideIcon
  name: string
  shortcut: string
  subtext?: string
  /** Text inserted into the composer, if this command just fills text. */
  insertText?: string
  /** If set, this command needs approval / writes to a record — shown as a toast placeholder in this pass. */
  requiresApproval?: boolean
}

export const DIAGNOSTIC_COMMANDS: CommandDef[] = [
  { key: "restart", icon: RotateCcw, name: "Restart lockdown browser", shortcut: "!restart", insertText: "Let's get your lockdown browser restarted — go ahead and reopen it from your desktop shortcut." },
  { key: "verifyid", icon: UserCheck, name: "Verify student ID", shortcut: "!verify-id", insertText: "Before we continue, I need to verify your student ID on file." },
  { key: "greeting", icon: Smile, name: "Insert greeting", shortcut: "!greeting", insertText: "Hi! Thanks for reaching out — I'm here to help." },
]

export const REMEDY_COMMANDS: CommandDef[] = [
  { key: "extra-time", icon: Hourglass, name: "Grant extra time", shortcut: "!extra-time", subtext: "Requires approval · writes to record", requiresApproval: true },
  { key: "reschedule", icon: CalendarClock, name: "Reschedule exam", shortcut: "!reschedule", subtext: "Requires approval · writes to record", requiresApproval: true },
  { key: "escalate", icon: Flag, name: "Escalate to administrator", shortcut: "!escalate", subtext: "Requires approval · writes to record", requiresApproval: true },
]

export const ALL_COMMANDS = [...DIAGNOSTIC_COMMANDS, ...REMEDY_COMMANDS]
