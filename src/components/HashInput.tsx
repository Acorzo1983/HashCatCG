import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { InfoTooltip } from "./InfoTooltip"
import type { HashInput } from "@/lib/types"

interface Props {
  value: HashInput
  onChange: (value: HashInput) => void
  detectedTypes: Array<{ id: number; name: string }>
}

export function HashInput({ value, onChange, detectedTypes }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <Label>Input Type</Label>
          <InfoTooltip text="Choose whether to input a hash directly or specify a file containing multiple hashes" />
        </div>
        <RadioGroup
          value={value.type}
          onValueChange={(type) => onChange({ ...value, type: type as 'text' | 'file' })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="input-text" />
            <Label htmlFor="input-text">Hash Text</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="file" id="input-file" />
            <Label htmlFor="input-file">Hash File</Label>
          </div>
        </RadioGroup>
      </div>

      {value.type === 'text' ? (
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="hash-input">Hash Input</Label>
            <InfoTooltip text="Enter the hash you want to crack. The tool will automatically detect the hash type based on its format." />
          </div>
          <Textarea
            id="hash-input"
            placeholder="Paste your hash here..."
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
            className="min-h-[100px] font-mono"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="hash-file">Hash File Path</Label>
            <InfoTooltip text="Specify the path to a file containing one or more hashes, one per line." />
          </div>
          <Input
            id="hash-file"
            placeholder="/path/to/hashes.txt"
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
            className="font-mono"
          />
        </div>
      )}

      {detectedTypes.length > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center mb-2">
            <p className="text-sm">Detected Hash Types:</p>
            <InfoTooltip text="These are the possible hash types based on the format and length of your input. The first one will be used by default." />
          </div>
          <ul className="list-disc list-inside space-y-1">
            {detectedTypes.map(type => (
              <li key={type.id} className="text-sm">
                {type.name} (Mode: {type.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}