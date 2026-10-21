import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  CheckSquare,
  Code,
  Cpu,
  Leaf,
  Menu,
  Move,
  Package,
  Recycle,
  Terminal,
  X,
} from 'lucide-react'

import './App.css'
import heroArt from './assets/hero-caneca.webp'
import step1Img from './assets/paso-1.webp'
import step2Img from './assets/paso-2.webp'
import step4Img from './assets/paso-4.webp'
import fruitImg from './assets/residuo-fruta.webp'
import bottleImg from './assets/residuo-botella.webp'

/* ---------- Recursos (carpeta public/, compatibles con GitHub Pages) ---------- */
const BASE = import.meta.env.BASE_URL
const assets = {
  logo: `${BASE}logo_transparente.svg`,
}

function ScanEyeIcon({ size = 24, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="1" />
      <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  )
}

/* ---------- Datos ---------- */
const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'nosotros', label: 'Nosotros' },
]

const features = [
  {
    Icon: ScanEyeIcon,
    title: 'Visión artificial',
    text: 'La cámara identifica los residuos mediante un modelo de inteligencia artificial, según el funcionamiento implementado.',
  },
  {
    Icon: Recycle,
    title: 'Clasificación inteligente',
    text: 'El sistema dirige cada residuo a su respectiva categoría, apoyando la separación de forma eficiente.',
  },
  {
    Icon: Leaf,
    title: 'Conciencia ambiental',
    text: 'Fomenta hábitos responsables y contribuye a un entorno más limpio y sostenible para todos.',
  },
]

const technologies = [
  { Icon: Cpu, name: 'ESP32-S3 WROOM', text: 'Microcontrolador que ejecuta la lógica del prototipo.' },
  { Icon: Camera, name: 'Cámara OV3660', text: 'Sensor de imagen que captura los residuos para su análisis.' },
  { Icon: Terminal, name: 'Arduino IDE', text: 'Entorno donde se programa y se carga el código en la placa.' },
  { Icon: Code, name: 'C++', text: 'Lenguaje utilizado para programar el microcontrolador.' },
  { Icon: Move, name: 'Sistema pan-tilt', text: 'Servomotores que orientan la vía de caída hacia el contenedor correspondiente.' },
  { Icon: Code, name: 'React', text: 'Biblioteca utilizada para construir la interfaz web interactiva.' },
  { Icon: Code, name: 'Vite', text: 'Herramienta de desarrollo y compilación de la aplicación web.' },
  { Icon: Code, name: 'HTML5', text: 'Estructura semántica de las páginas y sus contenidos.' },
  { Icon: Code, name: 'CSS3', text: 'Estilos visuales y diseño adaptable de la plataforma.' },
]

const steps = [
  { title: 'Detección del residuo', text: 'El usuario presenta el residuo ante la cámara de la caneca.' },
  { title: 'Captura de imagen', text: 'La cámara registra una imagen del residuo para su análisis.' },
  { title: 'Reconocimiento', text: 'El modelo de inteligencia artificial analiza la imagen y determina la categoría del residuo.' },
  { title: 'Decisión', text: 'El sistema decide la categoría y activa la ruta de clasificación correspondiente.' },
  { title: 'Clasificación', text: 'El residuo se deposita en el contenedor correspondiente, según el avance del prototipo.' },
]

const wasteOptions = [
  { id: 'fruta', name: 'Fruta', category: 'Orgánico', Icon: Leaf, image: fruitImg, alt: 'Cáscara de banano' },
  { id: 'botella', name: 'Botella plástica', category: 'Plástico', Icon: Recycle, image: bottleImg, alt: 'Botella plástica transparente' },
  { id: 'empaque', name: 'Empaque', category: 'Inorgánico', Icon: Package, image: null, alt: '' },
]

const creators = [
  { name: 'Miguel Villegas', role: 'Infraestructura y configuración base', number: '01', image: `${BASE}MiguelV.svg` },
  { name: 'Santiago Betancourt', role: 'Scrum Master y lógica interactiva', number: '02', image: `${BASE}Betancourt.svg` },
  { name: 'Diego Ferrer', role: 'Diseño UI y componentes', number: '03', image: null },
]

const specificObjectives = [
  'Identificar las necesidades relacionadas con el control y monitoreo de los residuos en diferentes espacios del Colegio San Alberto Magno.',
  'Diseñar la estructura del prototipo de la caneca inteligente y seleccionar los sensores y componentes electrónicos necesarios para medir su nivel de llenado.',
  'Desarrollar el sistema de programación encargado de recibir y procesar la información obtenida por los sensores.',
  'Diseñar e implementar una plataforma web que permita visualizar de manera sencilla el registro de los residuos clasificados por la caneca.',
  'Realizar pruebas de funcionamiento del prototipo para comprobar la lectura de los sensores y la transmisión de los datos.',
]

/* ---------- Hooks ---------- */
function useReveal(active) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [active])
}

/* ---------- Componentes ---------- */
function Brand({ className = '', onNavigate }) {
  return (
    <a
      href="#inicio"
      className={`brand ${className}`}
      aria-label="Rein-Vø, ir al inicio"
      onClick={(event) => {
        event.preventDefault()
        onNavigate('inicio')
      }}
    >
      <span className="brand-mark">
        <img src={assets.logo} alt="" width="48" height="48" />
      </span>
      <span className="brand-name">REIN-V<span className="brand-o">Ø</span></span>
    </a>
  )
}

function Navbar({ active, onNavigate }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleTabKeyDown = (event) => {
    const tabs = Array.from(event.currentTarget.parentElement.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(event.currentTarget)
    let nextIndex

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else return

    event.preventDefault()
    tabs[nextIndex].focus()
    onNavigate(navItems[nextIndex].id)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onNavigate={onNavigate} />

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="visually-hidden">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>

        <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Navegación principal">
          <div className="tab-list" role="tablist" aria-label="Secciones del proyecto">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active === item.id}
                aria-controls={`panel-${item.id}`}
                tabIndex={active === item.id ? 0 : -1}
                className={`nav-link${active === item.id ? ' is-active' : ''}`}
                onClick={() => {
                  onNavigate(item.id)
                  setOpen(false)
                }}
                onKeyDown={handleTabKeyDown}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn--primary btn--small nav-cta"
            onClick={() => {
              onNavigate('nosotros')
              setOpen(false)
            }}
          >
            Conoce el proyecto <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  )
}

function Hero({ onNavigate }) {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Tecnología para un futuro sostenible</p>
          <h1 id="hero-title">
            <span>Los residuos no son</span> <span>el final. Son el comienzo.</span>
          </h1>
          <p className="hero-lead">
            Conoce Rein-Vø, nuestra propuesta de caneca inteligente para apoyar la clasificación de residuos.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn--primary" onClick={() => onNavigate('como-funciona')}>
              Descubre cómo funciona <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="link-underline" onClick={() => onNavigate('nosotros')}>
              Nuestro proyecto <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="hero-art">
        <img
          src={heroArt}
          width="832"
          height="508"
          alt="Caneca Rein-Vø: cilindro blanco con base y borde verdes y el logotipo del proyecto, sobre un fondo verde oscuro"
        />
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="caracteristicas" className="section section--light features-section on-light" aria-labelledby="features-title">
      <div className="container">
        <div className="section-heading section-heading--center reveal">
          <h2 id="features-title">Una idea. Tecnología con propósito.</h2>
          <span className="rule" aria-hidden="true" />
        </div>
        <ul className="features-grid">
          {features.map(({ Icon, title, text }, i) => (
            <li className="feature reveal" key={title} style={{ '--delay': `${i * 90}ms` }}>
              <Icon size={56} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Technology() {
  return (
    <section id="tecnologia" className="section section--white on-light" aria-labelledby="tech-title">
      <div className="container tech-layout">
        <div className="tech-intro reveal">
          <p className="eyebrow eyebrow--deep">Tecnología</p>
          <h2 id="tech-title">Tecnología que trabaja detrás de cada decisión.</h2>
          <p>
            Cada componente cumple una función concreta dentro del prototipo: ver, decidir y mover.
          </p>
        </div>
        <ul className="tech-list">
          {technologies.map(({ Icon, name, text }, i) => (
            <li className="tech-item reveal" key={name} style={{ '--delay': `${i * 50}ms` }}>
              <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function StepMedia({ index }) {
  if (index === 0) return <img src={step1Img} alt="Una mano deposita una botella sobre la tapa de la caneca" loading="lazy" />
  if (index === 1) return <img src={step2Img} alt="Cámara de la caneca enmarcada por guías de enfoque" loading="lazy" />
  if (index === 2) {
    return (
      <div className="recog" role="img" aria-label={`Ejemplo de reconocimiento: botella plástica, categoría ${wasteOptions[1].category}`}>
        <div className="recog-frame">
          <img src={bottleImg} alt="" loading="lazy" />
        </div>
        <div className="recog-result">
          <span>Categoría</span>
          <Recycle size={26} strokeWidth={1.6} aria-hidden="true" />
          <strong>{wasteOptions[1].category}</strong>
        </div>
      </div>
    )
  }
  if (index === 3) return <img src={step4Img} alt="Interior de la caneca: ruta de clasificación con la botella en la rampa" loading="lazy" />
  return (
    <div className="step-final">
      <img src={heroArt} alt="Caneca Rein-Vø con el residuo ya clasificado" loading="lazy" />
      <span className="step-check" aria-hidden="true">
        <Check size={18} />
      </span>
    </div>
  )
}

function HowItWorks() {
  const [waste, setWaste] = useState(wasteOptions[0])

  return (
    <section id="como-funciona" className="section section--dark how" aria-labelledby="how-title">
      <div className="container">
        <div className="how-top">
          <div className="how-intro reveal">
            <p className="pill">Cómo funciona</p>
            <h2 id="how-title">
              De reconocer un residuo a <span className="accent">clasificarlo.</span>
            </h2>
            <p>
              Nuestro sistema combina visión artificial y un modelo de reconocimiento para identificar el tipo de residuo
              y apoyar su correcta clasificación.
            </p>
          </div>

          <div className="how-bin" aria-hidden="true">
            <img src={heroArt} alt="" loading="lazy" />
          </div>

          <div className="sim reveal">
            <p className="sim-label">Simulación de clasificación</p>
            <div className="sim-options" role="group" aria-label="Elige un residuo">
              {wasteOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip${waste.id === item.id ? ' is-selected' : ''}`}
                  aria-pressed={waste.id === item.id}
                  onClick={() => setWaste(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="sim-body">
              <div className="sim-tile">
                {waste.image ? (
                  <img src={waste.image} alt={waste.alt} />
                ) : (
                  <Package size={56} strokeWidth={1.3} aria-label={waste.name} role="img" />
                )}
              </div>
              <div className="sim-result" aria-live="polite">
                <span>Resultado</span>
                <strong>
                  <waste.Icon size={26} strokeWidth={1.8} aria-hidden="true" /> {waste.category}
                </strong>
                <small>Ejemplo ilustrativo, no usa el modelo real.</small>
              </div>
            </div>
          </div>
        </div>

        <ol className="steps">
          {steps.map((step, i) => (
            <li className="step reveal" key={step.title} style={{ '--delay': `${i * 70}ms` }}>
              <span className="step-number" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="step-media">
                <StepMedia index={i} />
              </div>
              {i < steps.length - 1 && (
                <span className="step-arrow" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="how-note">Imágenes ilustrativas del funcionamiento previsto del prototipo.</p>
      </div>
    </section>
  )
}

function CreatorCard({ creator }) {
  return (
    <li className="creator reveal">
      <div className="creator-photo">
        {creator.image ? (
          <img src={creator.image} alt={`Retrato de ${creator.name}`} loading="lazy" />
        ) : (
          <span className="creator-empty">
            <Camera size={28} strokeWidth={1.5} aria-hidden="true" />
            <span>Retrato pendiente</span>
          </span>
        )}
      </div>
      <h3>{creator.name}</h3>
      <p>{creator.role}</p>
    </li>
  )
}

function About() {
  return (
    <section id="nosotros" className="section section--white on-light" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow eyebrow--deep">Sobre el proyecto</p>
          <h2 id="about-title">¿Por qué existe Rein-vø?</h2>
          <p className="about-text">
            Rein-vø nace como una respuesta innovadora frente al manejo inadecuado de residuos sólidos en las instituciones
            educativas. A través de la integración de visión artificial, la cámara OV3660, el microcontrolador
            ESP32-S3 WROOM y sensores IoT, el proyecto busca transformar la gestión ambiental escolar en una experiencia tecnológica,
            eficiente y educativa.
          </p>
        </div>

        <h3 className="subhead reveal">El equipo</h3>
        <ul className="team-grid">
          {creators.map((c) => (
            <CreatorCard creator={c} key={c.number} />
          ))}
        </ul>

        <div className="about-columns">
          <div className="reveal">
            <h3 className="subhead">Nuestra meta</h3>
            <p>
              Optimizar la recolección de basura mediante tecnología inteligente y promover la importancia de la sostenibilidad en la comunidad escolar, 
              demostrando el potencial de la visión artificial aplicada a la sostenibilidad institucional.
            </p>
          </div>
          <div className="reveal">
            <h3 className="subhead">Objetivo general</h3>
            <p>
              Desarrollar un prototipo de caneca inteligente que permita monitorear el nivel de residuos mediante visión
              artificial para apoyar la gestión de residuos en el Colegio San Alberto Magno de Barranquilla durante el año 2026.
            </p>
          </div>
        </div>

        <details className="objectives reveal">
          <summary>Consultar los {specificObjectives.length} objetivos específicos</summary>
          <ul>
            {specificObjectives.map((obj, i) => (
              <li key={obj}>
                <CheckSquare size={18} aria-hidden="true" />
                <span>
                  <strong>5.2.{i + 1}</strong> {obj}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}

function Footer({ onNavigate }) {
  const navigate = (event, id) => {
    event.preventDefault()
    onNavigate(id)
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand onNavigate={onNavigate} />
          <p>Caneca inteligente para apoyar la clasificación de residuos mediante visión artificial.</p>
        </div>
        <nav aria-label="Navegación del pie de página">
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(event) => navigate(event, item.id)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>Colegio San Alberto Magno · Barranquilla</p>
        <p>© {new Date().getFullYear()} Rein-vø. Proyecto escolar.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.slice(1)
    return navItems.some((item) => item.id === hash) ? hash : 'inicio'
  })
  useReveal(active)

  const navigate = (id) => {
    setActive(id)
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onHistoryChange = () => {
      const hash = window.location.hash.slice(1)
      if (navItems.some((item) => item.id === hash)) {
        setActive(hash)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    window.addEventListener('popstate', onHistoryChange)
    window.addEventListener('hashchange', onHistoryChange)
    return () => {
      window.removeEventListener('popstate', onHistoryChange)
      window.removeEventListener('hashchange', onHistoryChange)
    }
  }, [])

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Navbar active={active} onNavigate={navigate} />
      <main id="contenido" className="app-main">
        <div
          key={active}
          id={`panel-${active}`}
          className="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          {active === 'inicio' && (
            <>
              <Hero onNavigate={navigate} />
              <Features />
            </>
          )}
          {active === 'tecnologia' && <Technology />}
          {active === 'como-funciona' && <HowItWorks />}
          {active === 'nosotros' && <About />}
        </div>
      </main>
      <Footer onNavigate={navigate} />
    </>
  )
}
