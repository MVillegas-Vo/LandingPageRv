import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Crosshair,
  Globe,
  LayoutGrid,
  Leaf,
  Play,
  Recycle,
  RefreshCw,
  Scan,
  Sprout,
  Trash2,
  Wine,
  Zap,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'caracteristicas', label: 'Características' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'impacto', label: 'Galería' },
  { id: 'contacto', label: 'Contacto' },
]

const features = [
  {
    Icon: Scan,
    title: 'Visión Artificial',
    description: 'Detecta y reconoce objetos con alta precisión mediante una cámara ESP32-S3.',
  },
  {
    Icon: Crosshair,
    title: 'Sistema Pan-Tilt',
    description: 'Mueve el brazo mecánico para depositar el residuo en el contenedor correcto.',
  },
  {
    Icon: LayoutGrid,
    title: '3 Contenedores',
    description: 'Clasifica en orgánico, reciclable e inorgánico.',
  },
  {
    Icon: Zap,
    title: 'Carga y Autonomía',
    description: 'Incluye un cargador y batería recargable para su funcionamiento continuo.',
  },
  {
    Icon: Sprout,
    title: 'Impacto Ambiental',
    description: 'Fomenta el reciclaje y contribuye a un entorno más limpio y sostenible.',
  },
]

const steps = [
  'La cámara detecta el objeto.',
  'La IA lo clasifica.',
  'El sistema pan-tilt se posiciona.',
  'El residuo se deposita en el contenedor correcto.',
]

function BinCard({ tone, label, Icon, compact = false }) {
  return (
    <div className={`bin-card bin-${tone}${compact ? ' small-card' : ''}`}>
      <Icon className="bin-icon" size={compact ? 20 : 24} aria-hidden="true" />
      <span className="bin-label">{label}</span>
    </div>
  )
}

function BinPreview({ compact = false }) {
  return (
    <div className={`bins-grid${compact ? ' small-grid' : ''}`}>
      <BinCard tone="green" label="Orgánico" Icon={Leaf} compact={compact} />
      <BinCard tone="blue" label="Reciclable" Icon={RefreshCw} compact={compact} />
      <BinCard tone="gray" label="Inorgánico" Icon={Trash2} compact={compact} />
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('inicio')

  const navigateTo = (id) => {
    setActiveNav(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button type="button" className="brand" onClick={() => navigateTo('inicio')}>
          <Recycle className="brand-mark" size={24} aria-hidden="true" />
          <span>Rein-vø</span>
        </button>

        <nav className="primary-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link${activeNav === item.id ? ' is-active' : ''}`}
              onClick={() => navigateTo(item.id)}
              aria-current={activeNav === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="header-action" onClick={() => navigateTo('contacto')}>
          Conoce más <ArrowRight size={16} aria-hidden="true" />
        </button>
      </header>

      {activeNav === 'inicio' && (
        <main id="inicio" className="hero-section screen-page">
          <div className="hero-container">
            <div className="hero-left">
              <span className="hero-tag">TECNOLOGÍA AL SERVICIO DEL PLANETA</span>
              <h1 className="hero-title">
                Rein-vø <br />
                La caneca inteligente que <br />
                <span className="text-emerald">clasifica por ti</span>
              </h1>
              <p className="hero-description">
                Rein-vø combina visión artificial e inteligencia artificial para reconocer y
                separar los residuos de forma automática, promoviendo un entorno más limpio y
                sostenible.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn-primary" onClick={() => navigateTo('como-funciona')}>
                  <span>Descubre cómo funciona</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <button type="button" className="btn-secondary">
                  <span className="play-icon"><Play size={12} fill="currentColor" aria-hidden="true" /></span>
                  <span>Ver video</span>
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="bin-mockup-wrapper">
                <div className="camera-module">
                  <div className="camera-lens"><div className="camera-dot" /></div>
                </div>
                <div className="bin-body">
                  <div className="bin-brand-header">
                    <Recycle size={16} className="recycle-mini-icon" aria-hidden="true" />
                    <span>REIN-VØ</span>
                  </div>
                  <BinPreview />
                </div>
                <div className="floating-badge">
                  <em>"Un pequeño gesto, un gran cambio"</em>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeNav === 'caracteristicas' && (
        <main id="caracteristicas" className="features-section screen-page">
          <div className="features-container">
            {features.map(({ Icon, title, description }) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon-circle"><Icon size={24} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </main>
      )}

      {activeNav === 'como-funciona' && (
        <main id="como-funciona" className="how-section screen-page">
          <div className="how-container">
            <div className="how-left">
              <span className="how-tag">¿CÓMO FUNCIONA?</span>
              <h1 className="how-title">Tecnología que <br /> hace la diferencia</h1>
              <p className="how-description">
                Rein-vø analiza el residuo, identifica su tipo, se mueve hacia el contenedor
                correspondiente y lo deposita automáticamente.
              </p>
              <div className="how-steps-list">
                {steps.map((step, index) => (
                  <div className="step-card" key={step}>
                    <span className="step-number">{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="how-right">
              <div className="camera-view-box">
                <div className="detection-bounding-box">
                  <div className="detected-badge">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>Objeto detectado: Plástico</span>
                  </div>
                  <div className="detected-icon"><Wine size={64} aria-hidden="true" /></div>
                </div>
              </div>
              <div className="how-bin-preview">
                <div className="bin-brand-header">
                  <Recycle size={16} className="recycle-mini-icon" aria-hidden="true" />
                  <span>REIN-VØ</span>
                </div>
                <BinPreview compact />
              </div>
            </div>
          </div>
        </main>
      )}

      {activeNav === 'impacto' && (
        <main id="impacto" className="impact-section screen-page">
          <div className="impact-container">
            <div className="impact-banner">
              <span className="impact-tag">Juntos por un futuro más verde</span>
              <h2>Tu basura hoy, <br /> un mejor mañana.</h2>
              <p>
                Rein-vø no solo clasifica residuos, también educa, reduce el impacto ambiental
                y construye un mundo más sostenible.
              </p>
              <button type="button" className="btn-impact" onClick={() => navigateTo('contacto')}>
                Conoce más sobre Rein-vø <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
            <div className="impact-list">
              <h3>TECNOLOGÍA QUE CUIDA EL PLANETA</h3>
              <div className="impact-item">
                <div className="impact-icon"><Leaf size={20} aria-hidden="true" /></div>
                <div><h4>Menos residuos</h4><p>Reduce la acumulación de basura en el entorno.</p></div>
              </div>
              <div className="impact-item">
                <div className="impact-icon"><Recycle size={20} aria-hidden="true" /></div>
                <div><h4>Más reciclaje</h4><p>Aumenta la correcta separación de materiales.</p></div>
              </div>
              <div className="impact-item">
                <div className="impact-icon"><Globe size={20} aria-hidden="true" /></div>
                <div><h4>Un planeta mejor</h4><p>Pequeñas acciones, grandes cambios.</p></div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeNav === 'contacto' && (
        <footer id="contacto" className="site-footer screen-page">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand-line">
                <Recycle className="brand-mark" size={22} aria-hidden="true" />
                <span className="brand-text">Rein-vø</span>
              </div>
              <p className="footer-slogan">Tecnología que cuida el planeta</p>
            </div>
            <nav className="footer-links" aria-label="Navegación del pie de página">
              {navItems.map((item) => (
                <button type="button" key={item.id} onClick={() => navigateTo(item.id)}>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="footer-extra">
              <span>Reciclar es inteligente <Leaf size={12} aria-hidden="true" /></span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Rein-vø. Todos los derechos reservados.</p>
            <p>Innovación • Educación • Sostenibilidad</p>
          </div>
        </footer>
      )}
    </div>
  )
}