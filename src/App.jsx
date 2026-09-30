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
  Apple,
  Box,
  Target,
  Compass,
  CheckSquare,
  ImagePlus,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'caracteristicas', label: 'Características' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'impacto', label: 'Galería' },
  { id: 'nosotros', label: 'Nosotros' },
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

const wasteOptions = [
  { id: 'plastico', name: 'Botella Plástica', type: 'Reciclable', targetTone: 'blue', Icon: Wine },
  { id: 'organico', name: 'Manzana / Fruta', type: 'Orgánico', targetTone: 'green', Icon: Apple },
  { id: 'inorganico', name: 'Empaque No Reciclable', type: 'Inorgánico', targetTone: 'gray', Icon: Box },
]

const specificObjectives = [
  'Identificar las necesidades relacionadas con el control y monitoreo de los residuos en diferentes espacios del Colegio San Alberto Magno.',
  'Diseñar la estructura del prototipo de la caneca inteligente y seleccionar los sensores y componentes electrónicos necesarios para medir su nivel de llenado.',
  'Desarrollar el sistema de programación encargado de recibir y procesar la información obtenida por los sensores.',
  'Diseñar e implementar una plataforma web que permita visualizar el estado y nivel de llenado de la caneca de una manera sencilla.',
  'Realizar pruebas de funcionamiento del prototipo para comprobar la lectura de los sensores y la transmisión de los datos.',
]

// Guarda las imágenes en public/creadores y asigna aquí sus rutas.
const creators = [
  { name: 'Miguel Villegas', role: 'Equipo Rein-vø', number: '01', image: 'Miguel.jpeg' },
  { name: 'Santiago Betancourt', role: 'Equipo Rein-vø', number: '02', image: 'Santiago.jfif' },
  { name: 'Diego Ferrer', role: 'Equipo Rein-vø', number: '03', image: 'diego.jfif' },
]

function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      <div className="creator-photo">
        {creator.image ? (
          <img src={creator.image} alt={`Retrato de ${creator.name}`} />
        ) : (
          <span className="creator-photo-prompt">
            <ImagePlus size={28} aria-hidden="true" />
            <span>Retrato</span>
          </span>
        )}
        <span className="creator-number">{creator.number}</span>
      </div>
      <div className="creator-info">
        <h3>{creator.name}</h3>
        <p>{creator.role}</p>
      </div>
    </article>
  )
}

function BinCard({ tone, label, Icon, compact = false, highlight = false }) {
  return (
    <div className={`bin-card bin-${tone}${compact ? ' small-card' : ''}${highlight ? ' is-active-bin' : ''}`}>
      <Icon className="bin-icon" size={compact ? 20 : 24} aria-hidden="true" />
      <span className="bin-label">{label}</span>
    </div>
  )
}

function BinPreview({ compact = false, activeTone = null }) {
  return (
    <div className={`bins-grid${compact ? ' small-grid' : ''}`}>
      <BinCard tone="green" label="Orgánico" Icon={Leaf} compact={compact} highlight={activeTone === 'green'} />
      <BinCard tone="blue" label="Reciclable" Icon={RefreshCw} compact={compact} highlight={activeTone === 'blue'} />
      <BinCard tone="gray" label="Inorgánico" Icon={Trash2} compact={compact} highlight={activeTone === 'gray'} />
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('inicio')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedWaste, setSelectedWaste] = useState(wasteOptions[0])
  const [isScanning, setIsScanning] = useState(false)

  const navigateTo = (id) => {
    if (id === activeNav) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveNav(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsTransitioning(false)
    }, 250)
  }

  const handleSimulateScan = (waste) => {
    setIsScanning(true)
    setSelectedWaste(waste)
    setTimeout(() => {
      setIsScanning(false)
    }, 600)
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

        <button type="button" className="header-action" onClick={() => navigateTo('nosotros')}>
          Conoce más <ArrowRight size={16} aria-hidden="true" />
        </button>
      </header>

      <div className={`page-content-wrapper ${isTransitioning ? 'page-transition-exit' : 'page-transition-enter'}`}>
        {activeNav === 'inicio' && (
          <main id="inicio" className="hero-section screen-page hero-enter">
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
                  <button type="button" className="btn-secondary" onClick={() => navigateTo('como-funciona')}>
                    <span className="play-icon"><Play size={12} fill="currentColor" aria-hidden="true" /></span>
                    <span>Probar demostración</span>
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
            <div className="features-heading">
              <span className="features-kicker">TECNOLOGÍA INTEGRADA</span>
              <h1>Diseñada para separar mejor.</h1>
              <p>Cada componente cumple una función dentro del proceso inteligente de clasificación.</p>
            </div>
            <div className="features-container">
              {features.map(({ Icon, title, description }, index) => (
                <article
                  className="feature-card"
                  key={title}
                  style={{ '--card-index': index }}
                >
                  <span className="feature-index">0{index + 1}</span>
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
                  Selecciona un objeto para simular el reconocimiento por IA en tiempo real:
                </p>
                
                <div className="waste-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {wasteOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`btn-secondary${selectedWaste.id === item.id ? ' is-selected' : ''}`}
                      onClick={() => handleSimulateScan(item)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

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
                      <span>{isScanning ? 'Escaneando...' : `Objeto detectado: ${selectedWaste.type}`}</span>
                    </div>
                    <div className="detected-icon">
                      <selectedWaste.Icon size={64} aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="how-bin-preview">
                  <div className="bin-brand-header">
                    <Recycle size={16} className="recycle-mini-icon" aria-hidden="true" />
                    <span>REIN-VØ</span>
                  </div>
                  <BinPreview compact activeTone={selectedWaste.targetTone} />
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
                <button type="button" className="btn-impact" onClick={() => navigateTo('nosotros')}>
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

        {activeNav === 'nosotros' && (
          <main id="nosotros" className="about-section screen-page">
            <div className="about-container">
              {/* Encabezado y Por Qué Existe */}
              <div className="about-hero">
                <span className="about-tag">SOBRE EL PROYECTO</span>
                <h1 className="about-title">¿Por qué existe Rein-vø?</h1>
                <p className="about-description">
                  Rein-vø nace como una respuesta innovadora frente al manejo inadecuado de residuos sólidos
                  en las instituciones educativas. A través de la integración de Internet de las Cosas (IoT) y visión
                  artificial, el proyecto busca transformar la gestión ambiental escolar en una experiencia
                  tecnológica, eficiente y educativa.
                </p>
              </div>

              <section className="creators-section" aria-labelledby="creators-title">
                <div className="creators-heading">
                  <span className="about-tag">EL EQUIPO</span>
                  <h2 id="creators-title">Las personas detrás de la idea.</h2>
                  <p>Selecciona una imagen para cada integrante del proyecto.</p>
                </div>
                <div className="creator-grid">
                  {creators.map((creator) => (
                    <CreatorCard creator={creator} key={creator.number} />
                  ))}
                </div>
              </section>

              {/* Nuestra Meta */}
              <div className="about-card meta-card">
                <div className="about-card-icon">
                  <Compass size={28} aria-hidden="true" />
                </div>
                <div className="about-card-content">
                  <h2>Nuestra Meta</h2>
                  <p>
                    Optimizar la recolección de basura mediante tecnología inteligente y promover una cultura
                    de reciclaje activo en la comunidad escolar, demostrando el potencial del IoT aplicado a la
                    sostenibilidad urbana e institucional.
                  </p>
                </div>
              </div>

              {/* Objetivos */}
              <div className="objectives-section">
                <div className="about-card objective-general">
                  <div className="about-card-icon">
                    <Target size={28} aria-hidden="true" />
                  </div>
                  <div className="about-card-content">
                    <h2>OBJETIVOS</h2>
                    <h3> Objetivo General</h3>
                    <p>
                      Desarrollar un prototipo de caneca inteligente que permita monitorear el nivel de residuos
                      mediante sensores IoT para apoyar la gestión de residuos en el Colegio San Alberto Magno
                      de Barranquilla durante el año 2026.
                    </p>
                  </div>
                </div>

                <div className="objectives-specific-container">
                  <h3>Objetivos Específicos</h3>
                  <details className="specific-details">
                    <summary>Consultar los {specificObjectives.length} objetivos del proyecto</summary>
                    <div className="specific-list">
                      {specificObjectives.map((obj, idx) => (
                        <div className="specific-item" key={idx}>
                          <span className="specific-number">5.2.{idx + 1}</span>
                          <div className="specific-text">
                            <CheckSquare size={18} className="check-icon" aria-hidden="true" />
                            <p>{obj}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Footer Integrado */}
            <footer className="site-footer">
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
                <p>© {new Date().getFullYear()} Rein-vø. Colegio San Alberto Magno. Todos los derechos reservados.</p>
                <p>Innovación • Educación • Sostenibilidad</p>
              </div>
            </footer>
          </main>
        )}
      </div>
    </div>
  )
}