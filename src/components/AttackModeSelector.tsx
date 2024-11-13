import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { InfoTooltip } from "./InfoTooltip"
import type { AttackMode } from "@/lib/types"

interface Props {
  value: AttackMode
  onChange: (value: AttackMode) => void
}

export function AttackModeSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Label>Attack Mode</Label>
        <InfoTooltip text="Choose the type of attack to perform" />
      </div>
      
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as AttackMode)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="flex items-start space-x-3 space-y-0">
          <RadioGroupItem value="bruteforce" id="attack-bruteforce" />
          <div className="space-y-1">
            <Label htmlFor="attack-bruteforce" className="font-medium">
              Brute Force
            </Label>
            <p className="text-sm text-muted-foreground">
              Try all possible combinations of characters
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 space-y-0">
          <RadioGroupItem value="dictionary" id="attack-dictionary" />
          <div className="space-y-1">
            <Label htmlFor="attack-dictionary" className="font-medium">
              Dictionary
            </Label>
            <p className="text-sm text-muted-foreground">
              Use a wordlist to try common passwords
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 space-y-0">
          <RadioGroupItem value="mask" id="attack-mask" />
          <div className="space-y-1">
            <Label htmlFor="attack-mask" className="font-medium">
              Mask
            </Label>
            <p className="text-sm text-muted-foreground">
              Use patterns to define password structure
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 space-y-0">
          <RadioGroupItem value="hybrid" id="attack-hybrid" />
          <div className="space-y-1">
            <Label htmlFor="attack-hybrid" className="font-medium">
              Hybrid
            </Label>
            <p className="text-sm text-muted-foreground">
              Combine dictionary words with patterns
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}