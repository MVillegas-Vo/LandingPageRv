import { useState } from 'react'
import './App.css'

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'caracteristicas', label: 'Características' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
]

const pageContent = {
  inicio: {
    eyebrow: 'Rein-vø · Consumo consciente',
    title: 'Dale una nueva vida a lo que ya existe.',
    description:
      'Una plataforma para descubrir alternativas sostenibles y hacer que cada elección cuente.',
    action: 'Conoce cómo funciona',
    nextTab: 'como-funciona',
  },
  caracteristicas: {
    eyebrow: 'La plataforma',
    title: 'Pequeños cambios, impacto real.',
    description:
      'Encuentra opciones reutilizables, explora productos responsables y sigue tus decisiones desde un solo lugar.',
  },
  'como-funciona': {
    eyebrow: 'En tres pasos',
    title: 'Elegir mejor puede ser sencillo.',
    description:
      'Explora alternativas, elige la que se adapta a ti y forma parte de un consumo más circular.',
  },
  nosotros: {
    eyebrow: 'Quiénes somos',
    title: 'Creemos en un futuro que se construye en comunidad.',
    description:
      'Rein-vø nace para acercar opciones sostenibles a la vida cotidiana, con información clara y decisiones al alcance de todos.',
  },
  contacto: {
    eyebrow: 'Hablemos',
    title: '¿Tienes una idea para compartir?',
    description:
      'Nos interesa conectar con personas y proyectos que también buscan darle una vuelta al consumo.',
  },
}

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const page = pageContent[activeTab]

<<<<<<< HEAD
  useEffect(() => {
    document.documentElement.style.margin = '0'
    document.documentElement.style.padding = '0'
    document.documentElement.style.width = '100%'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.width = '100%'
    document.body.style.backgroundColor = '#0b131e'
    document.body.style.overflowX = 'hidden'
  }, [])
  
  return (
    <div
      className="site-shell"
      style={{
        width: '100%',
        minHeight: '100svh',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: '#0b131e',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header className="site-header">
        <button
          type="button"
          className="brand"
          onClick={() => setActiveTab('inicio')}
          aria-label="Rein-vø, ir al inicio"
        >
          <span className="brand-mark" aria-hidden="true">↻</span>
          <span>Rein-vø</span>
        </button>

        <nav className="primary-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link${activeTab === item.id ? ' is-active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="header-action"
          onClick={() => setActiveTab('contacto')}
        >
          Conoce más <span aria-hidden="true">→</span>
        </button>
      </header>
      <main className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <span className="hero-tag">TECNOLOGÍA AL SERVICIO DEL PLANETA</span>
            <h1 className="hero-title">
              Rein-vø <br />
              La caneca inteligente que <br />
              <span className="text-emerald">clasifica por ti</span>
            </h1>
            <p className="hero-description">
              Rein-vø combina visión artificial e inteligencia artificial para
              reconocer y separar los residuos de forma automática,
              promoviendo un entorno más limpio y sostenible.
            </p>
            
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={() => setActiveTab('como-funciona')}>
                <span>Descubre cómo funciona</span>
                <span className="btn-arrow">→</span>
              </button>
              
              <button type="button" className="btn-secondary">
                <span className="play-icon">▶</span>
                <span>Ver video</span>
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="bin-mockup-wrapper">
          
              <div className="camera-module">
                <div className="camera-lens">
                  <div className="camera-dot"></div>
                </div>
              </div>
              <div className="bin-body">
                <div className="bin-brand-header">
                  <span className="recycle-mini-icon">↻</span>
                  <span>REIN-VØ</span>
                </div>

<<<<<<< HEAD
                <div className="bins-grid">
      
                  <div className="bin-card bin-green">
                    <span className="bin-icon">🍃</span>
                    <span className="bin-label">Orgánico</span>
                  </div>
                  <div className="bin-card bin-blue">
                    <span className="bin-icon">↻</span>
                    <span className="bin-label">Reciclable</span>
                  </div>
                  <div className="bin-card bin-gray">
                    <span className="bin-icon">🗑</span>
                    <span className="bin-label">Inorgánico</span>
                  </div>
                </div>
              </div>
              <div className="floating-badge">
                <em>"Un pequeño gesto, un gran cambio"</em>
              </div>

            </div>
          </div>

        </div>
      </main>

=======
      <main
        className="page-content"
        key={activeTab}
        style={{
          flex: 1,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
>>>>>>> d3d69f72602025f59b3f301b494bd25b0392e77c
        <section className="page-intro" aria-labelledby="page-title">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 id="page-title">{page.title}</h1>
          <p className="page-description">{page.description}</p>
          {page.action && (
            <button
              type="button"
              className="page-action"
              onClick={() => setActiveTab(page.nextTab)}
            >
              {page.action} <span aria-hidden="true">→</span>
            </button>
          )}
        </section>

        <aside className="page-index" aria-hidden="true">
          <span>0{navItems.findIndex((item) => item.id === activeTab) + 1}</span>
          <span className="index-rule" />
          <span>05</span>
        </aside>
      </main>
    </div>
  )
}

export default App
