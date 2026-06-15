import { Link } from 'react-router-dom'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <>
      <header className="top">
        <div className="container top-inner">
          <Link to="/" className="top-logo">
            <img src="./assets/beeline_business_logo.png" alt="билайн бизнес" />
            <span className="top-divider" />
            <span className="top-title">Академия ОАТС</span>
          </Link>
          <span className="top-sub">Обучение по сервисам Облачной АТС</span>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="bottom">
        <div className="container bottom-inner">
          <span>Академия ОАТС · обучающий тренажёр</span>
          <span className="muted">Цены — из прайс-листа «Облачная АТС» 2026. Материал информационный.</span>
        </div>
      </footer>
    </>
  )
}
