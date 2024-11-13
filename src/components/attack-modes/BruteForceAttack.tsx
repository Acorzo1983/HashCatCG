import { useState } from 'react'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { Slider } from "../ui/slider"
import { InfoTooltip } from "../InfoTooltip"

export type BruteForceConfig = {
  minLength: number
  maxLength: number
  charset: string
  customCharset?: string
  optimizedKernel: boolean
  markovThreshold: number
}

type Props = {
  onChange: (config: BruteForceConfig) => void
}

const CHARSETS = {
  numeric: '0123456789',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  special: '!@#$%^&*()-_+=[]{}|;:,.<>?',
  hex: '0123456789abcdef',
  custom: 'custom'
}

export function BruteForceAttack({ onChange }: Props) {
  const [config, setConfig] = useState<BruteForceConfig>({
    minLength: 1,
    maxLength: 8,
    charset: 'numeric',
    customCharset: '',
    optimizedKernel: false,
    markovThreshold: 0
  })

  const handleChange = (updates: Partial<BruteForceConfig>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    onChange(newConfig)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="minLength">Minimum Length</Label>
            <InfoTooltip text="The shortest password length to try. A smaller minimum length means faster initial results but more combinations to test." />
          </div>
          <Input
            id="minLength"
            type="number"
            min={1}
            max={config.maxLength}
            value={config.minLength}
            onChange={(e) => handleChange({ minLength: parseInt(e.target.value) || 1 })}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="maxLength">Maximum Length</Label>
            <InfoTooltip text="The longest password length to try. Longer maximum lengths exponentially increase the number of combinations to test." />
          </div>
          <Input
            id="maxLength"
            type="number"
            min={config.minLength}
            value={config.maxLength}
            onChange={(e) => handleChange({ maxLength: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="charset">Character Set</Label>
          <InfoTooltip text="Choose which types of characters to include in the attack. More character types increase the number of possibilities but may be necessary for complex passwords." />
        </div>
        <Select
          value={config.charset}
          onValueChange={(value) => handleChange({ charset: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select character set" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="numeric">Numeric (0-9)</SelectItem>
            <SelectItem value="lowercase">Lowercase (a-z)</SelectItem>
            <SelectItem value="uppercase">Uppercase (A-Z)</SelectItem>
            <SelectItem value="special">Special Characters</SelectItem>
            <SelectItem value="hex">Hexadecimal</SelectItem>
            <SelectItem value="custom">Custom Set</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.charset === 'custom' && (
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="customCharset">Custom Character Set</Label>
            <InfoTooltip text="Define your own set of characters to use in the attack. Include only the characters you think might be in the password." />
          </div>
          <Input
            id="customCharset"
            placeholder="Enter custom characters..."
            value={config.customCharset}
            onChange={(e) => handleChange({ customCharset: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Advanced Options</h3>
          <InfoTooltip text="These options can significantly affect the performance and effectiveness of the attack." />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center">
              <Label htmlFor="optimizedKernel">Optimized Kernel</Label>
              <InfoTooltip text="Enable optimized kernels for potentially faster attacks. May increase initialization time but can improve overall performance." />
            </div>
            <p className="text-sm text-muted-foreground">
              Enable optimized kernels for better performance
            </p>
          </div>
          <Switch
            id="optimizedKernel"
            checked={config.optimizedKernel}
            onCheckedChange={(checked) => handleChange({ optimizedKernel: checked })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Label htmlFor="markovThreshold">Markov Threshold</Label>
              <InfoTooltip text="Set the threshold for Markov chain-based attacks. Higher values include more combinations but may find more complex passwords. Set to 0 to disable Markov chains." />
            </div>
            <span className="text-sm text-muted-foreground">{config.markovThreshold}</span>
          </div>
          <Slider
            id="markovThreshold"
            min={0}
            max={1000}
            step={1}
            value={[config.markovThreshold]}
            onValueChange={([value]) => handleChange({ markovThreshold: value })}
          />
          <p className="text-sm text-muted-foreground">
            Set Markov threshold for attack (0 to disable)
          </p>
        </div>
      </div>
    </div>
  )
}