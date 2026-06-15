import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import { EXAM } from '../data/exam.js'
import { COURSE } from '../data/course.js'
import { blocks } from '../data/blocks/index.js'
import { getProgress, setName, saveExamResult } from '../lib/progress.js'
import { submitExamResult } from '../lib/submit.js'
import Quiz from '../components/Quiz.jsx'
import Certificate from '../components/Certificate.jsx'
import './Exam.css'

const STAGE = { INTRO: 'intro', QUIZ: 'quiz', RESULT: 'result' }

export default function Exam() {
  const progress = getProgress()
  const passedBlocks = blocks.filter((b) => progress.blocks?.[b.slug]?.passed).length
  const allPassed = passedBlocks === blocks.length

  const [stage, setStage] = useState(STAGE.INTRO)
  const [name, setNameState] = useState(progress.name || '')
  const [result, setResult] = useState(progress.exam)

  function start() {
    setName(name.trim())
    setStage(STAGE.QUIZ)
  }

  function finish(score, total) {
    const passed = saveExamResult(score, total, COURSE.passScore)
    setResult({ score, total, passed, date: new Date().toISOString() })
    setStage(STAGE.RESULT)
    // отправляем результат в Google Таблицы (если настроен endpoint) — «вслепую»
    submitExamResult({ name: name.trim(), score, total, blocks: getProgress().blocks })
  }

  function restart() {
    setStage(STAGE.INTRO)
    setResult(null)
  }

  return (
    <div className="container exam-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> На главную
      </Link>

      {stage === STAGE.INTRO && (
        <div className="card exam-intro">
          <div className="exam-intro-ic">
            <Award size={30} />
          </div>
          <h1>Финальный экзамен</h1>
          <p className="exam-intro-sub">
            {EXAM.length} вопросов по всем блокам курса, включая ситуационные кейсы. Порог сдачи —{' '}
            {Math.round(COURSE.passScore * 100)}%. При успешной сдаче вы получите сертификат.
          </p>

          {!allPassed && (
            <div className="exam-warn">
              <AlertTriangle size={18} />
              <span>
                Пройдено {passedBlocks} из {blocks.length} блоков. Рекомендуем сначала пройти все блоки —
                так экзамен дастся легче. Но попробовать можно уже сейчас.
              </span>
            </div>
          )}

          <label className="exam-name-label">
            Ваше имя (появится в сертификате)
            <input
              className="exam-name-input"
              type="text"
              value={name}
              onChange={(e) => setNameState(e.target.value)}
              placeholder="Например, Иван Петров"
            />
          </label>

          <button className="btn btn-primary exam-start" onClick={start} disabled={!name.trim()}>
            Начать экзамен <ArrowRight size={16} />
          </button>
        </div>
      )}

      {stage === STAGE.QUIZ && (
        <Quiz questions={EXAM} title="Финальный экзамен" onFinish={finish} />
      )}

      {stage === STAGE.RESULT &&
        (result?.passed ? (
          <Certificate
            name={name}
            score={result.score}
            total={result.total}
            date={result.date}
            onRestart={restart}
          />
        ) : (
          <div className="card exam-fail">
            <div className="exam-fail-pct">{Math.round((result.score / result.total) * 100)}%</div>
            <h2>Экзамен не сдан</h2>
            <p className="muted">
              {result.score} из {result.total}. Нужно {Math.round(COURSE.passScore * 100)}%. Повторите
              блоки и попробуйте снова — у вас получится.
            </p>
            <div className="exam-fail-actions">
              <button className="btn btn-primary" onClick={restart}>
                Пройти заново
              </button>
              <Link to="/" className="btn btn-ghost">
                К блокам
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}
