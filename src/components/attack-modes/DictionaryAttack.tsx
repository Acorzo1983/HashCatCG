import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { InfoTooltip } from "../InfoTooltip"
import type { DictionaryConfig } from "@/lib/types"

interface Props {
  value: DictionaryConfig
  onChange: (config: DictionaryConfig) => void
}

export function DictionaryAttack({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="wordlist">Dictionary Path</Label>
          <InfoTooltip text="Enter the path to your dictionary file on your local machine" />
        </div>
        <Input
          id="wordlist"
          placeholder="/path/to/your/wordlist.txt"
          value={value.wordlist}
          onChange={(e) => onChange({ ...value, wordlist: e.target.value })}
          className="font-mono"
        />
        <p className="text-sm text-muted-foreground">
          Example: /home/user/wordlists/mylist.txt
        </p>
      </div>
    </div>
  )
}