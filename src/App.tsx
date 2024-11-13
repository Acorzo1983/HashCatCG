import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Card, CardContent } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ScrollArea } from "./components/ui/scroll-area"
import { ModeToggle } from './components/mode-toggle'
import { HashInput } from './components/HashInput'
import { AttackModeSelector } from './components/AttackModeSelector'
import { BruteForceAttack } from './components/attack-modes/BruteForceAttack'
import { DictionaryAttack } from './components/attack-modes/DictionaryAttack'
import { MaskAttack } from './components/attack-modes/MaskAttack'
import { HybridAttack } from './components/attack-modes/HybridAttack'
import { detectHashType } from './lib/hashTypes'
import { buildHashcatCommand } from './lib/commandBuilder'
import type { AttackConfig, AttackMode, HashInput as HashInputType } from './lib/types'

function App() {
  const [hashInput, setHashInput] = useState<HashInputType>({
    type: 'text',
    value: ''
  })
  const [detectedTypes, setDetectedTypes] = useState([])
  const [selectedHashType, setSelectedHashType] = useState<number | null>(null)
  const [attackMode, setAttackMode] = useState<AttackMode>('bruteforce')
  const [attackConfig, setAttackConfig] = useState<AttackConfig>({
    mode: 'bruteforce',
    bruteForce: {
      minLength: 1,
      maxLength: 8,
      charset: 'numeric',
      optimizedKernel: false,
      markovThreshold: 0
    },
    dictionary: {
      wordlist: ''
    },
    mask: {
      pattern: '?u?l?l?l?d?d',
      customCharsets: {}
    },
    hybrid: {
      wordlist: '',
      pattern: '?d?d?d',
      customCharsets: {}
    }
  })
  const [generatedCommand, setGeneratedCommand] = useState('')
  const [activeTab, setActiveTab] = useState('hash')

  const handleHashInput = (input: HashInputType) => {
    setHashInput(input)
    if (input.type === 'text' && input.value.trim()) {
      const detected = detectHashType(input.value)
      setDetectedTypes(detected)
      setSelectedHashType(detected[0]?.id ?? null)
      
      // Auto-advance to attack tab if hash is valid
      if (detected.length > 0) {
        setActiveTab('attack')
      }
    }
  }

  const handleAttackModeChange = (mode: AttackMode) => {
    setAttackMode(mode)
    setAttackConfig(prev => ({ ...prev, mode }))
  }

  const handleConfigChange = (key: keyof AttackConfig, value: any) => {
    setAttackConfig(prev => ({ ...prev, [key]: value }))
  }

  const generateCommand = () => {
    if (!hashInput.value || !selectedHashType) return

    const command = buildHashcatCommand({
      hashInput,
      hashType: selectedHashType,
      attack: attackConfig
    })

    setGeneratedCommand(command)
    setActiveTab('command')
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">HashCat Command Generator</h1>
          <ModeToggle />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hash">1. Hash Input</TabsTrigger>
            <TabsTrigger value="attack">2. Attack Configuration</TabsTrigger>
            <TabsTrigger value="command">3. Generated Command</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-6">
              <TabsContent value="hash" className="space-y-4">
                <HashInput
                  value={hashInput}
                  onChange={handleHashInput}
                  detectedTypes={detectedTypes}
                />
              </TabsContent>

              <TabsContent value="attack" className="space-y-6">
                <AttackModeSelector
                  value={attackMode}
                  onChange={handleAttackModeChange}
                />

                {attackMode === 'bruteforce' && (
                  <BruteForceAttack
                    value={attackConfig.bruteForce!}
                    onChange={(config) => handleConfigChange('bruteForce', config)}
                  />
                )}

                {attackMode === 'dictionary' && (
                  <DictionaryAttack
                    value={attackConfig.dictionary!}
                    onChange={(config) => handleConfigChange('dictionary', config)}
                  />
                )}

                {attackMode === 'mask' && (
                  <MaskAttack
                    value={attackConfig.mask!}
                    onChange={(config) => handleConfigChange('mask', config)}
                  />
                )}

                {attackMode === 'hybrid' && (
                  <HybridAttack
                    value={attackConfig.hybrid!}
                    onChange={(config) => handleConfigChange('hybrid', config)}
                  />
                )}

                <Button 
                  onClick={generateCommand}
                  className="w-full"
                  disabled={!hashInput.value || !selectedHashType}
                >
                  Generate Command
                </Button>
              </TabsContent>

              <TabsContent value="command">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Generated Command</h3>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <code className="text-sm whitespace-pre-wrap font-mono">
                      {generatedCommand || 'Command will appear here...'}
                    </code>
                  </ScrollArea>
                  <Button
                    onClick={() => navigator.clipboard.writeText(generatedCommand)}
                    disabled={!generatedCommand}
                    className="w-full"
                  >
                    Copy Command
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>HashCat Command Generator with ❤️ by Albert C</p>
          <p className="text-xs">Version 1.0.0</p>
        </footer>
      </div>
    </div>
  )
}