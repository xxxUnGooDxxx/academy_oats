// Настройки интеграций.
//
// SHEETS_ENDPOINT — URL веб-приложения Google Apps Script, куда отправляются
// результаты экзамена. Пока пусто — отправка отключена (результаты только
// в localStorage). Как получить URL — см. docs/google-apps-script.md.
//
// Можно задать и через переменную окружения VITE_SHEETS_ENDPOINT (файл .env).
export const SHEETS_ENDPOINT =
  import.meta.env.VITE_SHEETS_ENDPOINT || ''
