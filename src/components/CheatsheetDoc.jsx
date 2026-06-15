import './CheatsheetDoc.css'

// Печатный макет шпаргалки блока. На экране скрыт (display:none),
// показывается только при печати — через правила в Block.css (@media print).
export default function CheatsheetDoc({ block }) {
  const { cheatsheet: cs, title, num } = block
  return (
    <div className="cheat-doc" id="cheat-doc">
      <div className="cheat-doc-head">
        <img src="./assets/beeline_business_logo.png" alt="билайн бизнес" />
        <span className="cheat-doc-badge">Шпаргалка · Академия ОАТС</span>
      </div>

      <h1 className="cheat-doc-title">
        <span className="cheat-doc-num">Блок {num}</span>
        {title}
      </h1>

      <div className="cheat-doc-section">
        <h2>Главное</h2>
        <ul className="cheat-doc-points">
          {cs.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {cs.prices?.length > 0 && (
        <div className="cheat-doc-section">
          <h2>Цены (прайс 2026)</h2>
          <div className="cheat-doc-prices">
            {cs.prices.map((p, i) => (
              <div className="cheat-doc-price" key={i}>
                <span>{p.label}</span>
                <b>{p.value}</b>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="cheat-doc-section">
        <h2>Вопросы клиенту</h2>
        <ul className="cheat-doc-questions">
          {cs.questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      <div className="cheat-doc-footer">
        Академия ОАТС · обучающий материал. Цены — из прайс-листа «Облачная АТС» 2026, информационные,
        с НДС (кроме Голосового робота и Колл-центра PRO), без надбавки 1,2%.
      </div>
    </div>
  )
}
