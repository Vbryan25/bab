import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

function CompareToggle({ onClick }: { onClick?: () => void }) {
  return (
    <Button variant="secondary" onClick={onClick}>
      <ArrowUpRight className="size-3.5" /> Compare to last period
    </Button>
  )
}

export { CompareToggle }
