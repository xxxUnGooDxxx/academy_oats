import { SHEETS_ENDPOINT } from '../config.js'

// Отправка результата экзамена в Google Таблицы (через Apps Script Web App).
//
// Используем mode: 'no-cors' и Content-Type: text/plain — это позволяет
// браузеру отправить запрос без CORS-preflight (Apps Script не возвращает
// CORS-заголовки). Ответ при этом прочитать нельзя — отправляем «вслепую».
export async function submitExamResult({ name, score, total, blocks }) {
  if (!SHEETS_ENDPOINT) return { sent: false, reason: 'no-endpoint' }

  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  // сводка по блокам: "slug:pct%" через запятую
  const blocksSummary = Object.entries(blocks || {})
    .map(([slug, b]) => `${slug}:${b.total ? Math.round((b.score / b.total) * 100) : 0}%`)
    .join(', ')

  const payload = {
    name: name || '',
    date: new Date().toISOString(),
    examScore: score,
    examTotal: total,
    examPct: pct,
    passed: total > 0 && score / total >= 0.8,
    blocksPassed: Object.values(blocks || {}).filter((b) => b.passed).length,
    blocksSummary,
    userAgent: navigator.userAgent,
  }

  try {
    await fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    return { sent: true }
  } catch (e) {
    return { sent: false, reason: String(e) }
  }
}
