import { useState } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'
import './Quiz.css'

// Универсальный движок теста. Поддерживает одиночный и множественный выбор.
// questions: [{ q, options, correct (number | number[]), multi?, explain }]
// onFinish(score, total) — вызывается при завершении.
function isCorrect(question, selected) {
  if (question.multi) {
    const correct = [...question.correct].sort().join(',')
    const got = [...selected].sort().join(',')
    return correct === got
  }
  return selected[0] === question.correct
}

export default function Quiz({ questions, onFinish, onStatusChange, title = 'Проверка' }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]
  const last = current === questions.length - 1

  function toggle(idx) {
    if (checked) return
    if (q.multi) {
      setSelected((s) => (s.includes(idx) ? s.filter((i) => i !== idx) : [...s, idx]))
    } else {
      setSelected([idx])
    }
  }

  function check() {
    if (selected.length === 0) return
    const ok = isCorrect(q, selected)
    if (ok) setScore((s) => s + 1)
    setChecked(true)
  }

  function next() {
    if (last) {
      setDone(true)
      onFinish?.(score, questions.length)
      const pct = Math.round((score / questions.length) * 100)
      onStatusChange?.({ done: true, passed: pct >= 80 })
    } else {
      setCurrent((c) => c + 1)
      setSelected([])
      setChecked(false)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected([])
    setChecked(false)
    setScore(0)
    setDone(false)
    onStatusChange?.({ done: false, passed: false })
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const passed = pct >= 80
    return (
      <div className="quiz quiz-result">
        <div className={`quiz-score ${passed ? 'ok' : 'fail'}`}>{pct}%</div>
        <h3>
          {score} из {questions.length} верно
        </h3>
        <p className="muted">
          {passed ? 'Блок зачтён! Можно двигаться дальше.' : 'Нужно 80%. Повторите материал и попробуйте снова.'}
        </p>
        <button className="btn btn-ghost" onClick={restart}>
          <RotateCcw size={16} /> Пройти заново
        </button>
      </div>
    )
  }

  const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct]

  return (
    <div className="quiz">
      <div className="quiz-head">
        <span className="badge">{title}</span>
        <span className="quiz-progress">
          {current + 1} / {questions.length}
        </span>
      </div>
      <h3 className="quiz-q">{q.q}</h3>
      {q.multi && <p className="quiz-multi-hint">Можно выбрать несколько вариантов</p>}
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          const sel = selected.includes(i)
          let cls = 'quiz-opt'
          if (checked) {
            if (correctArr.includes(i)) cls += ' correct'
            else if (sel) cls += ' wrong'
          } else if (sel) cls += ' selected'
          return (
            <button key={i} className={cls} onClick={() => toggle(i)} disabled={checked}>
              <span className="quiz-opt-mark">
                {checked && correctArr.includes(i) && <Check size={16} />}
                {checked && sel && !correctArr.includes(i) && <X size={16} />}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
      {checked && <div className="quiz-explain">{q.explain}</div>}
      <div className="quiz-actions">
        {!checked ? (
          <button className="btn btn-primary" onClick={check} disabled={selected.length === 0}>
            Проверить
          </button>
        ) : (
          <button className="btn btn-primary" onClick={next}>
            {last ? 'Завершить' : 'Дальше'}
          </button>
        )}
      </div>
    </div>
  )
}
