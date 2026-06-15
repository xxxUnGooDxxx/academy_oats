import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Block from './pages/Block.jsx'
import Exam from './pages/Exam.jsx'

// Яндекс.Метрика: засчитываем просмотр при каждой смене маршрута (SPA).
function useMetrikaPageviews() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.ym === 'function') {
      window.ym(109856375, 'hit', window.location.href)
    }
  }, [location])
}

export default function App() {
  useMetrikaPageviews()
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block/:slug" element={<Block />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </Layout>
  )
}
