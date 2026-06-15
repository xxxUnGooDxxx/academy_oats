import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Block from './pages/Block.jsx'
import Exam from './pages/Exam.jsx'

export default function App() {
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
