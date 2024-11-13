import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { InfoTooltip } from "../InfoTooltip"
import type { HybridConfig } from "@/lib/types"

interface Props {
  value: HybridConfig
  onChange: (config: HybridConfig) => void
}

export function HybridAttack({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="wordlist">Wordlist Path</Label>
          <InfoTooltip text="Specify the path to your dictionary file. Words from this list will be combined with the mask pattern." />
        </div>
        <Input
          id="wordlist"
          placeholder="/path/to/wordlist.txt"
          value={value.wordlist}
          onChange={(e) => onChange({ ...value, wordlist: e.target.value })}
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="pattern">Append Pattern</Label>
          <InfoTooltip text="Define a pattern to append to each dictionary word. Use ?d for digits, ?l for lowercase, ?u for uppercase, ?s for special chars." />
        </div>
        <Input
          id="pattern"
          placeholder="?d?d?d"
          value={value.pattern}
          onChange={(e) => onChange({ ...value, pattern: e.target.value })}
          className="font-mono"
        />
        <p className="text-sm text-muted-foreground">
          Example: password?d?d?d = Tries "password000" through "password999"
        </p>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          This attack mode combines dictionary words with a mask pattern, useful for cracking passwords that combine a word with numbers or special characters.
        </p>
      </div>
    </div>
  )
}