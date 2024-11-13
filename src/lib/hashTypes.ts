export interface HashType {
  id: number
  name: string
  example: string
  length: number
  regex?: RegExp
}

export const hashTypes: HashType[] = [
  // MD Family
  { id: 0, name: 'MD5', length: 32, example: '8743b52063cd84097a65d1633f5c74f5' },
  { id: 1, name: 'MD4', length: 32, example: '866437cb7a794bce2b727acc0362ee27' },
  { id: 5100, name: 'MD6-128', length: 32, example: '5d6aed6833d0dbcc991f39c9e7b6c1a7' },
  { id: 5200, name: 'MD6-256', length: 64, example: '5d6aed6833d0dbcc991f39c9e7b6c1a7b83751c5f89c903aa12b6e27a' },
  { id: 5300, name: 'MD6-512', length: 128, example: '5d6aed6833d0dbcc991f39c9e7b6c1a7b83751c5f89c903aa12b6e27a' },

  // SHA Family
  { id: 100, name: 'SHA1', length: 40, example: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8' },
  { id: 1400, name: 'SHA2-256', length: 64, example: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5' },
  { id: 1700, name: 'SHA2-512', length: 128, example: '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79' },
  { id: 17400, name: 'SHA3-256', length: 64, example: 'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a' },
  { id: 17500, name: 'SHA3-384', length: 96, example: 'ec01498288516fc926459f58e2c6ad8df9b473cb0fc08c2596da7cf0e49be4b298d88cea927ac7f539f1edf228376d25' },
  { id: 17600, name: 'SHA3-512', length: 128, example: 'a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26' },

  // RIPEMD Family
  { id: 6000, name: 'RIPEMD-160', length: 40, example: '108f07b8382412612c048d07d13f814118445acd' },
  { id: 6100, name: 'Whirlpool', length: 128, example: '4f8f5cb531e3d49a61cf417cd133792ccfa501fd8da53ee368f' },

  // Unix Crypt Formats
  { id: 500, name: 'MD5 Unix', regex: /^\$1\$.{8}\$.{22}$/, example: '$1$38652870$DUjsu4TTlTsOe/xxZ05uf/' },
  { id: 1800, name: 'SHA-512 Unix', regex: /^\$6\$.{8}\$.{86}$/, example: '$6$52450745$k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX/' },
  { id: 3200, name: 'bcrypt', regex: /^\$2[abxy]\$\d+\$.{53}$/, example: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LffqmoEFjbxUVB58.' },

  // Common Web Formats
  { id: 12500, name: 'RAR5', regex: /^\$rar5\$[a-zA-Z0-9/.]+$/, example: '$rar5$16$74575567518807622265582327' },
  { id: 13600, name: 'ZIP2 AES-256', regex: /^\$zip2\$[a-zA-Z0-9/.]+$/, example: '$zip2$*0*1*128*0*b5d2b7bf57ad5e86a4c5*$/zip2$' },
  
  // Modern Formats
  { id: 14700, name: 'iTunes Backup', regex: /^[a-f0-9]{40}:[a-f0-9]{40}$/, example: '0123456789abcdef0123456789abcdef01234567:0123456789abcdef0123456789abcdef01234567' },
  { id: 18700, name: 'Java KeyStore', regex: /^[a-zA-Z0-9+/]{32,}={0,2}$/, example: 'keystorepass123456' },
  
  // Memory-Hard Functions
  { id: 8900, name: 'scrypt', regex: /^SCRYPT:[0-9]+:[0-9]+:[0-9]+:[a-zA-Z0-9+/]+$/, example: 'SCRYPT:1024:1:1:aM7Pb7Byuw==' },
  { id: 23700, name: 'Argon2', regex: /^\$argon2[id]\$v=\d+\$m=\d+,t=\d+,p=\d+\$[a-zA-Z0-9+/]+\$[a-zA-Z0-9+/]+$/, example: '$argon2i$v=19$m=65536,t=2,p=1$c29tZXNhbHQ$wWKIMhR9lyDFvRz9YTZweHKfbftvj+qf+YFY4NeBbtA' }
]

export function detectHashType(hash: string): HashType[] {
  const normalizedHash = hash.trim()
  
  return hashTypes.filter(type => {
    if (type.regex) {
      return type.regex.test(normalizedHash)
    }
    return type.length === normalizedHash.length
  })
}