import block0 from './block0.js'
import block1 from './block1.js'
import block2 from './block2.js'
import block3 from './block3.js'
import block4 from './block4.js'
import block5 from './block5.js'
import block6 from './block6.js'
import block7 from './block7.js'

export const blocks = [block0, block1, block2, block3, block4, block5, block6, block7]

export function getBlock(slug) {
  return blocks.find((b) => b.slug === slug)
}
