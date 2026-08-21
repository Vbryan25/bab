import { toast } from "sonner"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { DIAGNOSTIC_COMMANDS, REMEDY_COMMANDS, type CommandDef } from "./commands"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRunCommand: (cmd: CommandDef) => void
}

function CommandPalette({ open, onOpenChange, onRunCommand }: CommandPaletteProps) {
  function run(cmd: CommandDef) {
    onOpenChange(false)
    if (cmd.requiresApproval) {
      toast(`This is a prototype — ${cmd.name} isn't wired up in this pass`)
      return
    }
    onRunCommand(cmd)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Commands" description="Search commands">
      <Command>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Diagnostics & Utilities">
            {DIAGNOSTIC_COMMANDS.map((cmd) => (
              <CommandItem key={cmd.key} onSelect={() => run(cmd)}>
                <cmd.icon />
                {cmd.name}
                <CommandShortcut>{cmd.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Academic Remedies">
            {REMEDY_COMMANDS.map((cmd) => (
              <CommandItem key={cmd.key} onSelect={() => run(cmd)}>
                <cmd.icon />
                <div className="flex flex-col">
                  <span>{cmd.name}</span>
                  <span className="text-xs text-muted-foreground">{cmd.subtext}</span>
                </div>
                <CommandShortcut>{cmd.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

export { CommandPalette }
