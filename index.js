
const CHINESE_UNICODE_BLOCKS = [
  [0x3400, 0x4DB5],
  [0x4E00, 0x62FF],
  [0x6300, 0x77FF],
  [0x7800, 0x8CFF],
  [0x8D00, 0x9FCC],
  [0x2e80, 0x2fd5],
  [0x3190, 0x319f],
  [0x3400, 0x4DBF],
  [0x4E00, 0x9FCC],
  [0xF900, 0xFAAD],
  [0x20000, 0x215FF],
  [0x21600, 0x230FF],
  [0x23100, 0x245FF],
  [0x24600, 0x260FF],
  [0x26100, 0x275FF],
  [0x27600, 0x290FF],
  [0x29100, 0x2A6DF],
  [0x2A700, 0x2B734],
  [0x2B740, 0x2B81D]
]

const JAPANESE_UNICODE_BLOCKS = [
  [0x3041, 0x3096],
  [0x30A0, 0x30FF],
  [0x3400, 0x4DB5],
  [0x4E00, 0x9FCB],
  [0xF900, 0xFA6A],
  [0x2E80, 0x2FD5],
  [0xFF5F, 0xFF9F],
  [0x3000, 0x303F],
  [0x31F0, 0x31FF],
  [0x3220, 0x3243],
  [0x3280, 0x337F],
  [0xFF01, 0xFF5E],
]

const LATIN_UNICODE_BLOCKS = [
  [0x0000, 0x007F],
  [0x0080, 0x00FF],
  [0x0100, 0x017F],
  [0x0180, 0x024F],
  [0x0250, 0x02AF],
  [0x02B0, 0x02FF],
  [0x1D00, 0x1D7F],
  [0x1D80, 0x1DBF],
  [0x1E00, 0x1EFF],
  [0x2070, 0x209F],
  [0x2100, 0x214F],
  [0x2150, 0x218F],
  [0x2C60, 0x2C7F],
  [0xA720, 0xA7FF],
  [0xAB30, 0xAB6F],
  [0xFB00, 0xFB4F],
  [0xFF00, 0xFFEF],
  [0x10780, 0x107BF],
  [0x1DF00, 0x1DFFF],
]

const DEVANAGARI_UNICODE_BLOCKS = [
  [0x0900, 0x097F]
]

const ARABIC_UNICODE_BLOCKS = [
  [0x0600, 0x06FF],
  [0x0750, 0x077F],
  [0x0870, 0x089F],
  [0x08A0, 0x08FF],
  [0xFB50, 0xFDFF],
  [0xFE70, 0xFEFF],
  [0x10E60, 0x10E7F],
  [0x1EC70, 0x1ECBF],
  [0x1ED00, 0x1ED4F],
  [0x1EE00, 0x1EEFF],
]

const TIBETAN_UNICODE_BLOCKS = [
  [0x0F00, 0x0FFF],
]

const GREEK_UNICODE_BLOCKS = [
  [0x0370, 0x03FF],
  [0x1D00, 0x1D7F],
  [0x1D80, 0x1DBF],
  [0x1F00, 0x1FFF],
  [0x2100, 0x214F],
  [0xAB30, 0xAB6F],
  [0x10140, 0x1018F],
  [0x10190, 0x101CF],
  [0x1D200, 0x1D24F],
]

const TAMIL_UNICODE_BLOCKS = [
  [0x0B80, 0x0BFF],
]

const CYRILLIC_UNICODE_BLOCKS = [
  [0x0400, 0x04FF],
  [0x0500, 0x052F],
  [0x2DE0, 0x2DFF],
  [0xA640, 0xA69F],
  [0x1C80, 0x1C8F],
  [0x1D2B, 0x1D78],
  [0xFE2E, 0xFE2F],
]

const HEBREW_UNICODE_BLOCKS = [
  [0x0590, 0x05FF],
]

function detectMostProminentLanguage(characters) {
  const possibilities = detectLanguageProbabilities(characters)

  let maxPair = [null, 0]
  let sum = 0

  Object.keys(possibilities).forEach(system => {
    const value = possibilities[system]

    if (maxPair[1] < value && system !== 'other') {
      sum += value
      maxPair[0] = system
      maxPair[1] = value
    }
  })

  return { system: maxPair[0], accuracy: maxPair[1] / sum }
}

function detectLanguageProbabilities(characters) {
  const possibilities = {}

  for (const character of characters) {
    if (isLatin(character)) {
      add(possibilities, 'latin')
    } else if (isChinese(character)) {
      add(possibilities, 'chinese')
    } else if (isJapanese(character)) {
      add(possibilities, 'japanese')
    } else if (isDevanagari(character)) {
      add(possibilities, 'devanagari')
    } else if (isHebrew(character)) {
      add(possibilities, 'hebrew')
    } else if (isTamil(character)) {
      add(possibilities, 'tamil')
    } else if (isGreek(character)) {
      add(possibilities, 'greek')
    } else if (isTibetan(character)) {
      add(possibilities, 'tibetan')
    } else if (isArabic(character)) {
      add(possibilities, 'arabic')
    } else if (isCyrillic(character)) {
      add(possibilities, 'cyrillic')
    } else {
      add(possibilities, 'other')
    }
  }

  return possibilities
}

function isHebrew(character) {
  return isWithinRange(HEBREW_UNICODE_BLOCKS, character)
}

function isCyrillic(character) {
  return isWithinRange(CYRILLIC_UNICODE_BLOCKS, character)
}

function isArabic(character) {
  return isWithinRange(ARABIC_UNICODE_BLOCKS, character)
}

function isTibetan(character) {
  return isWithinRange(TIBETAN_UNICODE_BLOCKS, character)
}

function isGreek(character) {
  return isWithinRange(GREEK_UNICODE_BLOCKS, character)
}

function isTamil(character) {
  return isWithinRange(TAMIL_UNICODE_BLOCKS, character)
}

function isDevanagari(character) {
  return isWithinRange(DEVANAGARI_UNICODE_BLOCKS, character)
}

function isJapanese(character) {
  return isWithinRange(JAPANESE_UNICODE_BLOCKS, character)
}

function isLatin(character) {
  return isWithinRange(LATIN_UNICODE_BLOCKS, character)
}

function isChinese(character) {
  return isWithinRange(CHINESE_UNICODE_BLOCKS, character)
}

function isWithinRange(blocks, character) {
  return blocks.some(([ start, end ]) => {
    const code = character.codePointAt(0)
    return code >= start && code <= end
  })
}

function add(possibilities, type) {
  possibilities[type] = possibilities[type] ?? 0
  possibilities[type]++
}

module.exports = detectMostProminentLanguage
