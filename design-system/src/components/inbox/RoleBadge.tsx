import { Badge } from "@/components/ui/badge"
import type { Role } from "@/data/inbox"

const ROLE_BADGE: Record<Role, { label: string; variant: "admin" | "student" | "instructor" | "destructive" | "secondary" }> = {
  admin: { label: "Administrator", variant: "admin" },
  instructor: { label: "Instructor", variant: "instructor" },
  student: { label: "Student", variant: "student" },
  system: { label: "System", variant: "destructive" },
  unknown: { label: "Unknown", variant: "secondary" },
}

function RoleBadge({ role }: { role: Role }) {
  const { label, variant } = ROLE_BADGE[role]
  return <Badge variant={variant}>{label}</Badge>
}

export { RoleBadge }
