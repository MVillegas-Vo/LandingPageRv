import { useState, useEffect } from 'react'
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

  // Limpia cualquier margen o padding por defecto de html y body al montar
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
        width: '100vw',
        minHeight: '100vh',
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

      <main 
        className="page-content" 
        key={activeTab}
        style={{
          flex: 1,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
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
