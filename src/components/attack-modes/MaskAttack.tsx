import { useState } from 'react'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { InfoTooltip } from "../InfoTooltip"
import type { MaskConfig } from "@/lib/types"

interface Props {
  value: MaskConfig
  onChange: (config: MaskConfig) => void
}

export function MaskAttack({ value, onChange }: Props) {
  const [newCharset, setNewCharset] = useState({ digit: '', chars: '' })

  const handleAddCharset = () => {
    if (!newCharset.digit || !newCharset.chars) return
    
    onChange({
      ...value,
      customCharsets: {
        ...value.customCharsets,
        [newCharset.digit]: newCharset.chars
      }
    })
    setNewCharset({ digit: '', chars: '' })
  }

  const handleRemoveCharset = (digit: string) => {
    const { [digit]: removed, ...rest } = value.customCharsets
    onChange({
      ...value,
      customCharsets: rest
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="pattern">Mask Pattern</Label>
          <InfoTooltip text="Define the password pattern using placeholders. Use ?d for digits, ?l for lowercase, ?u for uppercase, ?s for special chars, or ?1-?9 for custom charsets." />
        </div>
        <Input
          id="pattern"
          placeholder="?u?l?l?l?d?d"
          value={value.pattern}
          onChange={(e) => onChange({ ...value, pattern: e.target.value })}
          className="font-mono"
        />
        <p className="text-sm text-muted-foreground">
          Example: ?u?l?l?l?d?d = Password like "Pass12"
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Custom Character Sets</h3>
          <InfoTooltip text="Define your own character sets to use with ?1 through ?9 in the mask pattern." />
        </div>

        <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-end">
          <div className="space-y-2">
            <Label htmlFor="charset-digit">Digit (1-9)</Label>
            <Input
              id="charset-digit"
              placeholder="1"
              value={newCharset.digit}
              onChange={(e) => setNewCharset({ ...newCharset, digit: e.target.value })}
              className="w-16"
              maxLength={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="charset-chars">Characters</Label>
            <Input
              id="charset-chars"
              placeholder="abc123!@#"
              value={newCharset.chars}
              onChange={(e) => setNewCharset({ ...newCharset, chars: e.target.value })}
            />
          </div>
          <Button 
            onClick={handleAddCharset}
            disabled={!newCharset.digit || !newCharset.chars}
          >
            Add
          </Button>
        </div>

        {Object.entries(value.customCharsets).length > 0 && (
          <div className="space-y-2 border rounded-lg p-4">
            <Label>Defined Character Sets:</Label>
            <div className="space-y-2">
              {Object.entries(value.customCharsets).map(([digit, chars]) => (
                <div key={digit} className="flex items-center justify-between">
                  <code className="text-sm">
                    ?{digit} = {chars}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCharset(digit)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}