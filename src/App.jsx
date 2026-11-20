import { useEffect, useState } from 'react'
import {
  Database,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Code,
  Cpu,
  Leaf,
  Menu,
  Move,
  Recycle,
  Terminal,
  X,
} from 'lucide-react'
import { initializeApp } from '@firebase/app'
import { getDatabase, onValue, ref } from '@firebase/database'

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

const firebaseConfig = {
  apiKey: 'AIzaSyBwx261jUYsfTbyTnpGBuSPsdrJnDcujI4',
  authDomain: 'rein-31f65.firebaseapp.com',
  databaseURL: 'https://rein-31f65-default-rtdb.firebaseio.com',
  projectId: 'rein-31f65',
  storageBucket: 'rein-31f65.firebasestorage.app',
  messagingSenderId: '24168654179',
  appId: '1:24168654179:web:dc3ccadb020bbc80159f56',
  measurementId: 'G-BW3Q2CS79X',
}
const database = getDatabase(initializeApp(firebaseConfig))

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
  { Icon: Database, name: 'Firebase Realtime Database', text: 'Base de datos que actualiza en vivo el total de residuos registrados.' },
]

const steps = [
  { title: 'Detección del residuo', text: 'El usuario presenta el residuo ante la cámara de la caneca.' },
  { title: 'Captura de imagen', text: 'La cámara registra una imagen del residuo para su análisis.' },
  { title: 'Reconocimiento', text: 'El modelo de inteligencia artificial analiza la imagen y determina la categoría del residuo.' },
  { title: 'Decisión', text: 'El sistema decide la categoría y activa la ruta de clasificación correspondiente.' },
  { title: 'Clasificación', text: 'El residuo se deposita en el contenedor correspondiente, según el avance del prototipo.' },
]

const wasteOptions = [
  { id: 'comida', name: 'Residuo orgánico', category: 'Orgánico', Icon: Leaf, image: fruitImg, alt: 'Residuo orgánico de comida: cáscara de banano' },
  { id: 'botella', name: 'Botella plástica', category: 'Plástico', Icon: Recycle, image: bottleImg, alt: 'Botella plástica transparente' },
]

const copyrightYear = new Date().getFullYear()

const creators = [
  { name: 'Miguel Villegas', role: 'Infraestructura y configuración base', number: '01', image: `${BASE}MiguelV.svg` },
  { name: 'Santiago Betancourt', role: 'Scrum Master y lógica interactiva', number: '02', image: `${BASE}Betancourt.svg` },
    { name: 'Diego Ferrer', role: 'Diseño UI y componentes', number: '03', image: `${BASE}diego.svg` },
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

function LiveRecords() {
  const [total, setTotal] = useState(null)
  const [counts, setCounts] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('loading')

  useEffect(() => {
    const residuosRef = ref(database, 'residuos')
    const unsubscribe = onValue(
      residuosRef,
      (snapshot) => {
        const datos = snapshot.val() || {}
        setTotal(Object.values(datos).length)
        const categoryCounts = { comida: 0, plastico: 0 }
        Object.values(datos).forEach((record) => {
          if (!record || typeof record !== 'object') return

          const type = String(record.tipo || '').trim().toLowerCase()
          if (type !== 'comida' && type !== 'plastico') return

          const quantity = Number(record.cantidad)
          categoryCounts[type] += Number.isFinite(quantity) && quantity > 0 ? quantity : 1
        })
        setCounts(categoryCounts)
        setConnectionStatus('connected')
      },
      (error) => {
        console.error('No se pudo leer el registro de residuos de Firebase:', error)
        setConnectionStatus('error')
      },
    )

    return unsubscribe
  }, [])

  const statusText = {
    loading: 'Conectando con la base de datos…',
    connected: 'Actualizado en tiempo real',
    error: 'No se pudo conectar con la base de datos',
  }[connectionStatus]

  return (
    <section className="live-records" aria-labelledby="live-records-title">
      <div className="container">
        <div className="live-records-card">
          <div className="live-records-copy">
            <p className="eyebrow eyebrow--deep">Registro en vivo</p>
            <h2 id="live-records-title">Residuos registrados</h2>
            <p>Conteo total de registros recibidos por Rein-Vø.</p>
          </div>
          <div className="live-records-total" aria-live="polite" aria-atomic="true">
            <Database size={25} strokeWidth={1.7} aria-hidden="true" />
            <strong>{total === null ? '—' : new Intl.NumberFormat('es-CO').format(total)}</strong>
            <span>registros totales</span>
          </div>
          <div className="live-records-breakdown" aria-live="polite" aria-label="Residuos depositados por categoría">
            <div className="live-records-count">
              <strong>{counts === null ? '—' : new Intl.NumberFormat('es-CO').format(counts.plastico)}</strong>
              <span>Botellas plásticas</span>
            </div>
            <div className="live-records-count">
              <strong>{counts === null ? '—' : new Intl.NumberFormat('es-CO').format(counts.comida)}</strong>
              <span>Residuos orgánicos</span>
            </div>
          </div>
          <p className={`live-records-status is-${connectionStatus}`} role="status">
            <span className="live-records-indicator" aria-hidden="true" />
            {statusText}
          </p>
        </div>
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
                <img src={waste.image} alt={waste.alt} />
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
            educativas. A través de la integración de visión artificial, la cámara OV3660 y el microcontrolador
            ESP32-S3 WROOM, el proyecto busca transformar la gestión ambiental escolar en una experiencia tecnológica,
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

<div className="specific-objectives reveal">
  <h3 className="subhead">Objetivos específicos</h3>

  <div className="objectives-list">
    <article className="objective-item">
      <span className="objective-number">01</span>
      <div>
        <h4>Diagnóstico de residuos</h4>
        <p>
          Diagnosticar los patrones de generación y errores de disposición de residuos durante los descansos escolares,
          definiendo dos categorías clave de clasificación: Botellas Plásticas y Residuos Orgánicos.
        </p>
      </div>
    </article>

    <article className="objective-item">
      <span className="objective-number">02</span>
      <div>
        <h4>Construcción del dataset</h4>
        <p>
          Construir un dataset fotográfico local curado de 300x imágenes distribuidas entre ambas clases,
          capturadas bajo las condiciones de iluminación ambiental del punto de inspección del prototipo.
        </p>
      </div>
    </article>

    <article className="objective-item">
      <span className="objective-number">03</span>
      <div>
        <h4>Entrenamiento de inteligencia artificial</h4>
        <p>
          Entrenar una red neuronal convolucional (MobileNetV2) cuantizada a enteros de 8 bits (INT8)
          mediante la plataforma Edge Impulse, optimizando su inferencia local para el microcontrolador ESP32-S3.
        </p>
      </div>
    </article>

    <article className="objective-item">
      <span className="objective-number">04</span>
      <div>
        <h4>Programación del sistema embebido</h4>
        <p>
          Programar la lógica embebida en C/C++ mediante Arduino IDE para sincronizar la captura de imágenes
          con la cámara OV2640, el filtrado de confianza superior al 85%, el accionamiento PWM de los
          servomotores y el envío de telemetría en tiempo real a la nube.
        </p>
      </div>
    </article>

    <article className="objective-item">
      <span className="objective-number">05</span>
      <div>
        <h4>Construcción del prototipo mecatrónico</h4>
        <p>
          Implementar el chasis físico mecatrónico utilizando una estructura en madera y un cuerpo cilíndrico
          en cartón prensado de alta densidad, integrando un mecanismo de desvío accionado por servomotores
          para distribuir los residuos hacia sus respectivos compartimentos.
        </p>
      </div>
    </article>

    <article className="objective-item">
      <span className="objective-number">06</span>
      <div>
        <h4>Desarrollo de la plataforma web</h4>
        <p>
          Desarrollar una aplicación web interactiva con React.js y Vite, desplegada en GitHub Pages,
          que integre contenido de sensibilización ambiental para la comunidad educativa y un panel
          de monitoreo en tiempo real sobre las métricas de clasificación de la caneca.
        </p>
      </div>
    </article>
  </div>
</div>
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
        <p>© {copyrightYear} Rein-vø. Proyecto escolar.</p>
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
              <LiveRecords />
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
  