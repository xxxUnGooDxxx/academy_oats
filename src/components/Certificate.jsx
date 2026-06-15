import { Award, Printer, RotateCcw } from 'lucide-react'
import './Certificate.css'

export default function Certificate({ name, score, total, date, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const dateStr = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="cert-screen">
      <div className="cert" id="certificate">
        <div className="cert-border">
          <img className="cert-logo" src="./assets/beeline_business_logo.png" alt="билайн бизнес" />
          <div className="cert-seal">
            <Award size={40} />
          </div>
          <p className="cert-eyebrow">Сертификат о прохождении курса</p>
          <h1 className="cert-course">Академия ОАТС</h1>
          <p className="cert-sub">Обучение по сервисам Облачной АТС</p>
          <p className="cert-given">настоящим подтверждается, что</p>
          <p className="cert-name">{name || 'Участник курса'}</p>
          <p className="cert-text">
            успешно прошёл(а) обучение и сдал(а) финальный экзамен с результатом{' '}
            <b>
              {score} из {total} ({pct}%)
            </b>
          </p>
          <div className="cert-footer">
            <span>{dateStr}</span>
            <span>Академия ОАТС</span>
          </div>
        </div>
      </div>

      <div className="cert-actions">
        <button className="btn btn-dark" onClick={() => window.print()}>
          <Printer size={16} /> Печать / сохранить PDF
        </button>
        <button className="btn btn-ghost" onClick={onRestart}>
          <RotateCcw size={16} /> Пройти экзамен заново
        </button>
      </div>
    </div>
  )
}
