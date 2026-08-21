import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onValueChange: (value: T) => void
  className?: string
}

function SegmentedControl<T extends string>({ options, value, onValueChange, className }: SegmentedControlProps<T>) {
  return (
    <ToggleGroup
      spacing={0}
      value={[value]}
      onValueChange={(vals) => {
        const next = vals[0]
        if (next) onValueChange(next as T)
      }}
      className={cn("gap-0.5 rounded-full bg-sel p-0.5", className)}
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          className="h-auto min-w-0 rounded-full! border-none! bg-transparent! px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-none! aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-sm!"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { SegmentedControl }
