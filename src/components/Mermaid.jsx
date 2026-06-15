import { useEffect, useRef, useState } from 'react'

// mermaid грузится лениго (только на страницах блоков), чтобы не утяжелять
// первоначальную загрузку сайта.
let mermaidPromise = null
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#fffdf0',
          primaryBorderColor: '#ffcc00',
          primaryTextColor: '#1d1d1d',
          lineColor: '#8a8a8a',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
        },
        flowchart: { curve: 'basis', htmlLabels: true },
      })
      return mermaid
    })
  }
  return mermaidPromise
}

let counter = 0

export default function Mermaid({ chart }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let cancelled = false
    const id = `mmd-${counter++}`
    loadMermaid()
      .then((mermaid) => mermaid.render(id, chart))
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg)
      })
      .catch(() => {
        if (!cancelled) setSvg('<p class="muted">Схема временно недоступна</p>')
      })
    return () => {
      cancelled = true
    }
  }, [chart])

  return <div className="mermaid-wrap" ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />
}
