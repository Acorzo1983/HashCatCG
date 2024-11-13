export type AttackMode = 'bruteforce' | 'dictionary' | 'mask' | 'hybrid'

export interface HashInput {
  type: 'text' | 'file'
  value: string
}

export interface AttackConfig {
  mode: AttackMode
  bruteForce?: BruteForceConfig
  dictionary?: DictionaryConfig
  mask?: MaskConfig
  hybrid?: HybridConfig
}

export interface BruteForceConfig {
  minLength: number
  maxLength: number
  charset: string
  customCharset?: string
  optimizedKernel: boolean
  markovThreshold: number
}

export interface DictionaryConfig {
  wordlist: string
}

export interface MaskConfig {
  pattern: string
  customCharsets: Record<string, string>
}

export interface HybridConfig {
  wordlist: string
  pattern: string
  customCharsets: Record<string, string>
}