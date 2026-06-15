// Цены из прайс-листа «Облачная АТС» билайн 2026 (01-26).
// Все цены — с НДС, кроме помеченных noVat (Голосовой робот, Колл-центр PRO),
// без надбавки 1,2%. Источник: «Прайс лист ОАТС 2026.pptx».

export const PLANS = [
  { id: 'min', name: 'Минимальный', price: 965.83, numbers: 2, employees: 4, channels: 10 },
  { id: 'base', name: 'Базовый', price: 1819.83, numbers: 3, employees: 10, channels: 20 },
  { id: 'std', name: 'Стандартный', price: 3548.17, numbers: 5, employees: 20, channels: 40 },
  { id: 'pro', name: 'Профессиональный', price: 8123.17, numbers: 10, employees: 50, channels: 100 },
]

// Доплаты сверх пакета
export const EXTRA = {
  number: 152.5, // многоканальный номер сверх пакета, ₽/мес
  employee: 203.33, // сотрудник сверх пакета, ₽/мес
  channelMin: 101.67, // доп. канал на тарифе Минимальный
  channelOther: 50.83, // доп. канал на остальных тарифах
  smartForward: 305.0, // «умная» переадресация
  callCenter5: 508.33, // +5 лицензий оператора call-центра
}

// Запись и хранение
export const RECORDING = {
  record: 1525, // запись разговоров, ₽/мес
  storage5gb: 305, // +5 Гб хранилища, ₽/мес
  includedStorage: '1 Гб',
}

// Интеграции
export const INTEGRATIONS = {
  crmConnector: 904.83, // коннектор CRM, ₽/мес
  api: 508.33, // API, ₽/мес
}

// Прочие платные сервисы
export const OTHER = {
  missedReport: 410, // отчёт по пропущенным, ₽/мес
  softphone: 101.67, // софтфон за абонента, ₽/мес
}

// Коллтрекинг
export const CALLTRACKING = {
  staticCity: 870, // статический коллтрекинг, городской номер, ₽/мес
  static800: 900, // 8-800/8-804, ₽/мес
  static800min: 5, // ₽/мин для 8-800/8-804
  callback: 12, // обратный звонок, ₽/мин
}

// МультиТрекинг (помесячно, без скидок за срок)
export const MULTITRACKING = [
  { pack: 'S', price: 1950, numbers: 1, emails: 1, minutes: 250 },
  { pack: 'S+', price: 3150, numbers: 2, emails: 2, minutes: 400 },
  { pack: 'M', price: 6750, numbers: 5, emails: 10, minutes: 800 },
  { pack: 'L', price: 16200, numbers: 15, emails: 30, minutes: 2000 },
]

// МультиЧат
export const MULTICHAT = [
  { pack: 'S', price: 1000, visitors: '2 000' },
  { pack: 'M', price: 2000, visitors: '10 000' },
  { pack: 'L', price: 5000, visitors: '30 000' },
  { pack: 'XL', price: 7000, visitors: '70 000' },
  { pack: '2XL', price: 13000, visitors: '120 000' },
  { pack: '3XL', price: 20000, visitors: '300 000' },
]
export const MULTICHAT_WHATSAPP = 1000 // интеграция с WhatsApp, ₽/мес

// SMS-визитка (разово за пакет)
export const SMS = [
  { count: 100, price: 355.83 },
  { count: 500, price: 1525.0 },
  { count: 1000, price: 2948.33 },
  { count: 2000, price: 5795.0 },
  { count: 5000, price: 13725.0 },
]

// Речевая аналитика — основной пакет (транскрибация + анализ)
export const SPEECH_ANALYTICS = [
  { minutes: 500, price: 762.5 },
  { minutes: 1000, price: 1423.33 },
  { minutes: 2000, price: 2643.33 },
  { minutes: 5000, price: 6354.17 },
  { minutes: 10000, price: 12200.0 },
  { minutes: 20000, price: 22366.67 },
]

// Голосовые кампании (автоинформатор) — основной пакет
export const VOICE_CAMPAIGNS = [
  { minutes: 1000, perMin: 0.61, price: 610.0 },
  { minutes: 5000, perMin: 0.55, price: 2745.0 },
  { minutes: 10000, perMin: 0.49, price: 4880.0 },
]

// Голосовой робот (НДС не облагается)
export const VOICE_ROBOT = [
  { minutes: 2000, robots: 2, price: 7000, perMin: 3.5, noVat: true },
  { minutes: 5000, robots: 5, price: 17000, perMin: 3.4, noVat: true },
  { minutes: 10000, robots: 10, price: 33000, perMin: 3.3, noVat: true },
  { minutes: 15000, robots: 10, price: 48000, perMin: 3.2, noVat: true },
  { minutes: 20000, robots: 15, price: 62000, perMin: 3.1, noVat: true },
  { minutes: 40000, robots: 20, price: 120000, perMin: 3.0, noVat: true },
  { minutes: 50000, robots: 20, price: 150000, perMin: 3.0, noVat: true },
]

// Колл-центр PRO (лицензия на 1 пользователя, НДС не облагается)
export const CALLCENTER_PRO = [
  { period: '1 день', price: 150, billing: 'ежедневно' },
  { period: '3 месяца', price: 8700, billing: 'разово / 3 мес.' },
  { period: '6 месяцев', price: 15600, billing: 'разово / 6 мес.' },
  { period: '12 месяцев', price: 28800, billing: 'ежегодно' },
]

// Формат «1 234,56 ₽»
export function rub(value) {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽'
}
