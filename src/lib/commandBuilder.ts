import type { AttackConfig, HashInput } from './types'

interface CommandOptions {
  hashInput: HashInput
  hashType: number
  attack: AttackConfig
}

export function buildHashcatCommand(options: CommandOptions): string {
  const { hashInput, hashType, attack } = options
  const parts = ['hashcat']

  // Hash type
  parts.push(`-m ${hashType}`)

  // Attack mode and specific options
  switch (attack.mode) {
    case 'bruteforce':
      parts.push('-a 3') // Brute-force attack
      if (attack.bruteForce) {
        // Length range
        if (attack.bruteForce.minLength !== attack.bruteForce.maxLength) {
          parts.push('--increment')
          parts.push(`--increment-min ${attack.bruteForce.minLength}`)
          parts.push(`--increment-max ${attack.bruteForce.maxLength}`)
        }

        // Optimized kernel
        if (attack.bruteForce.optimizedKernel) {
          parts.push('--optimized-kernel-enable')
        }

        // Markov threshold
        if (attack.bruteForce.markovThreshold > 0) {
          parts.push('--markov-threshold')
          parts.push(attack.bruteForce.markovThreshold.toString())
        }

        // Character set mask
        const charsetMask = getCharsetMask(attack.bruteForce)
        parts.push(`'${charsetMask}'`)
      }
      break

    case 'dictionary':
      parts.push('-a 0') // Dictionary attack
      if (attack.dictionary) {
        // Add the wordlist path
        parts.push(`'${attack.dictionary.wordlist}'`)
      }
      break

    case 'mask':
      parts.push('-a 3') // Mask attack
      if (attack.mask) {
        // Custom charsets
        Object.entries(attack.mask.customCharsets).forEach(([digit, chars]) => {
          parts.push(`-${digit}`)
          parts.push(`'${chars}'`)
        })
        // Mask pattern
        parts.push(`'${attack.mask.pattern}'`)
      }
      break

    case 'hybrid':
      parts.push('-a 6') // Hybrid attack (dictionary + mask)
      if (attack.hybrid) {
        // Wordlist first, then mask pattern
        parts.push(`'${attack.hybrid.wordlist}'`)
        // Custom charsets if any
        Object.entries(attack.hybrid.customCharsets).forEach(([digit, chars]) => {
          parts.push(`-${digit}`)
          parts.push(`'${chars}'`)
        })
        // Mask pattern
        parts.push(`'${attack.hybrid.pattern}'`)
      }
      break
  }

  // Hash input (must be last)
  if (hashInput.type === 'file') {
    parts.push(`'${hashInput.value}'`)
  } else {
    parts.push(`'${hashInput.value}'`)
  }

  return parts.join(' ')
}

function getCharsetMask(config: CommandOptions['attack']['bruteForce']) {
  if (!config) return ''
  
  const masks: Record<string, string> = {
    numeric: '?d',
    lowercase: '?l',
    uppercase: '?u',
    special: '?s',
    hex: '?h'
  }

  if (config.charset === 'custom' && config.customCharset) {
    return `?1 -1 ${config.customCharset}`
  }

  const mask = masks[config.charset] || '?d'
  return mask.repeat(config.maxLength)
}