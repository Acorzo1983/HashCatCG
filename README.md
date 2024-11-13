# HashCat Command Generator
A modern web application for generating HashCat commands with an intuitive user interface. This tool helps security professionals and penetration testers generate proper HashCat commands without memorizing all the options and switches.

<img alt="HashCat Command Generator" src="/imgs/thumb_image.png"> </img>

## Features
https://acorzo1983.github.io/HashCatCG/

### Hash Detection
- Automatically detects hash types based on pattern and length
- Supports multiple hash formats including:
  - MD Family (MD4, MD5, MD6)
  - SHA Family (SHA1, SHA2, SHA3)
  - RIPEMD Family
  - Unix Crypt Formats
  - Common Web Formats
  - Modern Formats
  - Memory-Hard Functions

### Attack Configuration
- Brute Force Attack settings
  - Configurable minimum and maximum length
  - Predefined character sets (numeric, lowercase, uppercase, special, hex)
  - Custom character set support
  - Advanced options:
    - Optimized kernel support
    - Markov threshold configuration

### User Interface
- Dark/Light theme support
- Responsive design
- Copy-to-clipboard functionality
- Real-time command generation
- Tooltips for better understanding of options

## Usage

1. **Input Hash**
   - Paste your hash in the input field
   - The tool will automatically detect possible hash types

2. **Configure Attack**
   - Select character set or define custom characters
   - Set minimum and maximum length
   - Configure advanced options if needed

3. **Generate Command**
   - Click "Generate Command" to create the HashCat command
   - Use "Copy Command" to copy to clipboard

## Advanced Options

### Optimized Kernel
- Enables HashCat's optimized kernels
- Can improve performance but may increase initialization time
- Use `--optimized-kernel-enable` flag

### Markov Threshold
- Configure Markov chain threshold
- Higher values = more combinations
- Set to 0 to disable Markov chains
- Uses `--markov-threshold` flag

## Important Notes

1. This tool only generates commands and does not perform actual hash cracking
2. Always verify the generated command before use
3. Some options might need adjustment based on your specific use case
4. Ensure proper hash format for accurate type detection

## Security Notice

This is a command generator only and does not perform any actual password cracking. Always ensure you have proper authorization before attempting to crack password hashes.

---

Made with ❤️ by Albert C (2024)
