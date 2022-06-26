
const detect = require('.')

log('abc')
log('שָׁלוֹם')
log('美丽的')
log('ひらがな')
log('कल्पना')
log('قمر')
log('மின்னல்')
log('αποκάλυψη')
log('дружба')
log('རྣམ་ཤེས་')

function log(text) {
  const { system, accuracy } = detect([...text])
  console.log(`${text} => ${system} (${accuracy})`)
}
