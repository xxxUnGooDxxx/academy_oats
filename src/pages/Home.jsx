import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Award } from 'lucide-react'
import { blocks } from '../data/blocks/index.js'
import { COURSE } from '../data/course.js'
import { getProgress } from '../lib/progress.js'
import Icon from '../components/Icon.jsx'
import './Home.css'

export default function Home() {
  const progress = getProgress()
  const passedCount = blocks.filter((b) => progress.blocks?.[b.slug]?.passed).length
  const allPassed = passedCount === blocks.length
  const pct = Math.round((passedCount / blocks.length) * 100)

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-l">
          <span className="badge">Курс-тренажёр</span>
          <h1>{COURSE.title}</h1>
          <p className="hero-lead">{COURSE.subtitle}</p>
          <p className="hero-desc">{COURSE.description}</p>
          <div className="hero-actions">
            <Link to={`/block/${blocks[0].slug}`} className="btn btn-dark">
              Начать обучение <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-r">
          {COURSE.stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Прогресс */}
      <section className="progress-bar-section">
        <div className="progress-head">
          <span>
            Ваш прогресс: пройдено {passedCount} из {blocks.length}
          </span>
          <span className="muted">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </section>

      {/* Методика */}
      <section className="method">
        <h2 className="section-title">Как устроено обучение</h2>
        <div className="method-grid">
          {COURSE.methodology.map((m) => (
            <div className="method-card" key={m.title}>
              <div className="method-ic">
                <Icon name={m.icon} size={22} />
              </div>
              <h3>{m.title}</h3>
              <p className="muted">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Блоки */}
      <section className="blocks">
        <h2 className="section-title">Программа курса</h2>
        <div className="blocks-grid">
          {blocks.map((b) => {
            const passed = progress.blocks?.[b.slug]?.passed
            // все блоки открыты для свободного просмотра; тест отмечает «пройдено»
            return (
              <Link
                to={`/block/${b.slug}`}
                key={b.slug}
                className={`block-card ${passed ? 'passed' : ''}`}
              >
                <div className="block-num">{b.num}</div>
                <div className="block-body">
                  <div className="block-ic">
                    <Icon name={b.icon} size={20} />
                  </div>
                  <h3>{b.title}</h3>
                  <p className="muted">{b.lead}</p>
                  <span className="block-duration">{b.duration}</span>
                </div>
                <div className="block-status">
                  {passed ? <CheckCircle2 size={22} className="ic-ok" /> : <ArrowRight size={20} />}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Экзамен */}
      <section className="exam-card">
        <div className="exam-ic">
          <Award size={28} />
        </div>
        <div className="exam-body">
          <h3>Финальный экзамен</h3>
          <p className="muted">
            {progress.exam?.passed
              ? `Экзамен сдан на ${Math.round((progress.exam.score / progress.exam.total) * 100)}% — сертификат готов.`
              : allPassed
                ? 'Все блоки пройдены — можно сдавать экзамен и получить сертификат.'
                : 'Вопросы по всем блокам + кейсы. Рекомендуем сначала пройти блоки, но попробовать можно сейчас.'}
          </p>
        </div>
        <Link to="/exam" className="btn btn-primary">
          {progress.exam?.passed ? 'Сертификат' : 'К экзамену'} <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
