import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Building,
  MessagesSquare,
  HelpCircle,
  ShieldQuestion,
  ListChecks,
  Tag,
  Target,
  Download,
} from 'lucide-react'
import { getBlock, blocks } from '../data/blocks/index.js'
import { COURSE } from '../data/course.js'
import { saveBlockResult } from '../lib/progress.js'
import Mermaid from '../components/Mermaid.jsx'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import CheatsheetDoc from '../components/CheatsheetDoc.jsx'
import './Block.css'

export default function Block() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const block = getBlock(slug)
  const [step, setStep] = useState(0)

  if (!block) {
    return (
      <div className="container">
        <p>Блок не найден.</p>
        <Link to="/" className="btn btn-ghost">
          На главную
        </Link>
      </div>
    )
  }

  // Шаги: экраны блока + шпаргалка + тест
  const steps = [...block.screens, { type: 'cheatsheet' }, { type: 'quiz' }]
  const cur = steps[step]
  const isLast = step === steps.length - 1
  const idx = blocks.findIndex((b) => b.slug === slug)
  const nextBlock = blocks[idx + 1]

  function go(delta) {
    const n = step + delta
    if (n < 0) return
    if (n >= steps.length) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container block-page">
      {/* Заголовок блока */}
      <div className="block-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Все блоки
        </Link>
        <div className="block-title-row">
          <div className="block-title-ic">
            <Icon name={block.icon} size={24} />
          </div>
          <div>
            <span className="muted block-eyebrow">Блок {block.num}</span>
            <h1>{block.title}</h1>
          </div>
        </div>
        <div className="block-goal">
          <Target size={16} /> <b>Цель блока:</b> {block.goal}
        </div>
      </div>

      {/* Прогресс по экранам */}
      <div className="step-dots">
        {steps.map((s, i) => (
          <button
            key={i}
            className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => setStep(i)}
            aria-label={`Экран ${i + 1}`}
          />
        ))}
      </div>

      {/* Контент шага */}
      <div className="screen">
        {cur.type === 'why' && <WhyScreen data={cur} />}
        {cur.type === 'what' && <WhatScreen data={cur} />}
        {cur.type === 'case' && <CaseScreen data={cur} />}
        {cur.type === 'sell' && <SellScreen data={cur} />}
        {cur.type === 'cheatsheet' && <Cheatsheet data={block.cheatsheet} title={block.title} />}
        {cur.type === 'quiz' && (
          <Quiz
            questions={block.quiz}
            title={`Тест: ${block.title}`}
            onFinish={(score, total) => saveBlockResult(slug, score, total, COURSE.passScore)}
          />
        )}
      </div>

      {/* Навигация */}
      <div className="screen-nav">
        <button className="btn btn-ghost" onClick={() => go(-1)} disabled={step === 0}>
          <ArrowLeft size={16} /> Назад
        </button>
        {!isLast ? (
          <button className="btn btn-primary" onClick={() => go(1)}>
            Дальше <ArrowRight size={16} />
          </button>
        ) : nextBlock ? (
          <button className="btn btn-primary" onClick={() => navigate(`/block/${nextBlock.slug}`)}>
            Следующий блок <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Завершить курс <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Печатный макет шпаргалки (виден только при печати) */}
      <CheatsheetDoc block={block} />
    </div>
  )
}

function ScreenLabel({ icon: I, text, color }) {
  return (
    <div className="screen-label" style={{ '--lbl': color }}>
      <I size={18} /> {text}
    </div>
  )
}

function WhyScreen({ data }) {
  return (
    <div className="card">
      <ScreenLabel icon={AlertTriangle} text="Зачем это" color="var(--red)" />
      <h2>{data.title}</h2>
      <div className="pain-box">
        <AlertTriangle size={18} />
        <p>{data.pain}</p>
      </div>
      {data.body.map((p, i) => (
        <p className="screen-p" key={i}>
          {p}
        </p>
      ))}
    </div>
  )
}

function WhatScreen({ data }) {
  return (
    <div className="card">
      <ScreenLabel icon={Lightbulb} text="Что это" color="var(--yellow-d)" />
      <h2>{data.title}</h2>
      {data.body.map((p, i) => (
        <p className="screen-p" key={i}>
          {p}
        </p>
      ))}
      {data.diagram && (
        <div className="diagram-card">
          <Mermaid chart={data.diagram} />
        </div>
      )}
      {data.table && (
        <table className="data-table">
          <thead>
            <tr>
              {data.table.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.table.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data.terms && (
        <div className="terms">
          {data.terms.map((t) => (
            <div className="term" key={t.term}>
              <b>{t.term}</b>
              <span>{t.def}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CaseScreen({ data }) {
  return (
    <div className="card">
      <ScreenLabel icon={Building} text="Кейс по отрасли" color="var(--blue)" />
      <div className="case-head">
        <div className="case-ic">
          <Icon name={data.icon} size={22} />
        </div>
        <h2>{data.industry}</h2>
      </div>
      {data.story.map((p, i) => (
        <p className="screen-p" key={i}>
          {p}
        </p>
      ))}
      <div className="result-box">
        <b>Результат:</b> {data.result}
      </div>
    </div>
  )
}

function SellScreen({ data }) {
  return (
    <div className="card">
      <ScreenLabel icon={MessagesSquare} text="Как продавать" color="var(--green)" />
      {data.intro && <p className="screen-p">{data.intro}</p>}

      <h3 className="sub-title">
        <HelpCircle size={18} /> Вопросы для выявления потребности
      </h3>
      <ul className="q-list">
        {data.questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

      <h3 className="sub-title">
        <Lightbulb size={18} /> Как сформулировать выгоду
      </h3>
      <div className="benefit-box">{data.benefit}</div>

      {data.objection && (
        <>
          <h3 className="sub-title">
            <ShieldQuestion size={18} /> Работа с возражением
          </h3>
          <div className="objection">
            <p className="obj-q">{data.objection.q}</p>
            <p className="obj-a">{data.objection.a}</p>
          </div>
        </>
      )}
    </div>
  )
}

function Cheatsheet({ data, title }) {
  return (
    <div className="card cheatsheet">
      <ScreenLabel icon={ListChecks} text="Шпаргалка" color="var(--black)" />
      <h2>Памятка: {title}</h2>

      <h3 className="sub-title">
        <ListChecks size={18} /> Главное
      </h3>
      <ul className="cheat-list">
        {data.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      {data.prices?.length > 0 && (
        <>
          <h3 className="sub-title">
            <Tag size={18} /> Цены
          </h3>
          <div className="price-grid">
            {data.prices.map((p, i) => (
              <div className="price-item" key={i}>
                <span>{p.label}</span>
                <b>{p.value}</b>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="sub-title">
        <HelpCircle size={18} /> Вопросы клиенту
      </h3>
      <ul className="q-list">
        {data.questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

      <button className="btn btn-dark cheat-download" onClick={() => window.print()}>
        <Download size={16} /> Скачать PDF
      </button>
      <p className="muted cheat-note">
        В окне печати выберите «Сохранить как PDF» — получите шпаргалку этого блока на одну страницу.
      </p>
    </div>
  )
}
