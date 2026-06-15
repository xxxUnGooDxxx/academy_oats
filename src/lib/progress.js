// Хранение прогресса обучения в localStorage.
const KEY = 'oats_academy_v1'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getProgress() {
  const d = read()
  return {
    name: d.name || '',
    blocks: d.blocks || {}, // { [slug]: { score, total, passed } }
    exam: d.exam || null, // { score, total, passed, date }
  }
}

export function setName(name) {
  const d = read()
  d.name = name
  write(d)
}

export function saveBlockResult(slug, score, total, passScore = 0.8) {
  const d = read()
  d.blocks = d.blocks || {}
  const passed = total > 0 && score / total >= passScore
  // не понижаем уже достигнутый лучший результат
  const prev = d.blocks[slug]
  if (!prev || score > prev.score) {
    d.blocks[slug] = { score, total, passed }
  }
  write(d)
  return passed
}

export function saveExamResult(score, total, passScore = 0.8) {
  const d = read()
  const passed = total > 0 && score / total >= passScore
  d.exam = { score, total, passed, date: new Date().toISOString() }
  write(d)
  return passed
}

export function isBlockPassed(slug) {
  return !!read().blocks?.[slug]?.passed
}

export function resetProgress() {
  localStorage.removeItem(KEY)
}
