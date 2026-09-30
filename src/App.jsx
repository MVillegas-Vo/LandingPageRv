import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [activeNav, setActiveNav] = useState('inicio')

  // Smooth scroll manual al hacer clic en los enlaces
  const scrollToSection = (id) => {
    setActiveNav(id)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Detecta en qué sección está el usuario al hacer scroll para pintar la línea verde
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'caracteristicas', 'como-funciona', 'impacto', 'contacto']
      const scrollPosition = window.scrollY + 120

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      {/* ================= BARRA DE NAVEGACIÓN FIJA ================= */}
      <header className="site-header">
        <button
          type="button"
          className="brand"
          onClick={() => scrollToSection('inicio')}
        >
          <span className="brand-mark">↻</span>
          <span>Rein-vø</span>
        </button>

        <nav className="primary-nav">
          <button
            type="button"
            className={`nav-link ${activeNav === 'inicio' ? 'is-active' : ''}`}
            onClick={() => scrollToSection('inicio')}
          >
            Inicio
          </button>
          <button
            type="button"
            className={`nav-link ${activeNav === 'caracteristicas' ? 'is-active' : ''}`}
            onClick={() => scrollToSection('caracteristicas')}
          >
            Características
          </button>
          <button
            type="button"
            className={`nav-link ${activeNav === 'como-funciona' ? 'is-active' : ''}`}
            onClick={() => scrollToSection('como-funciona')}
          >
            Cómo funciona
          </button>
          <button
            type="button"
            className={`nav-link ${activeNav === 'impacto' ? 'is-active' : ''}`}
            onClick={() => scrollToSection('impacto')}
          >
            Galería
          </button>
          <button
            type="button"
            className={`nav-link ${activeNav === 'contacto' ? 'is-active' : ''}`}
            onClick={() => scrollToSection('contacto')}
          >
            Contacto
          </button>
        </nav>

        <button
          type="button"
          className="header-action"
          onClick={() => scrollToSection('contacto')}
        >
          Conoce más <span>→</span>
        </button>
      </header>

      {/* ================= 1. HERO / INICIO ================= */}
      <section id="inicio" className="hero-section">
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
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollToSection('como-funciona')}
              >
                <span>Descubre cómo funciona</span>
                <span>→</span>
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
      </section>

      {/* ================= 2. CARACTERÍSTICAS ================= */}
      <section id="caracteristicas" className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon-circle">⛶</div>
            <h3>Visión Artificial</h3>
            <p>Detecta y reconoce objetos con alta precisión mediante una cámara ESP32-S3.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle">🎯</div>
            <h3>Sistema Pan-Tilt</h3>
            <p>Mueve el brazo mecánico para depositar el residuo en el contenedor correcto.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle">⊞</div>
            <h3>3 Contenedores</h3>
            <p>Clasifica en orgánico, reciclable e inorgánico.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle">⚡</div>
            <h3>Carga y Autonomía</h3>
            <p>Incluye un cargador y batería recargable para su funcionamiento continuo.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle">🌱</div>
            <h3>Impacto Ambiental</h3>
            <p>Fomenta el reciclaje y contribuye a un entorno más limpio y sostenible.</p>
          </div>
        </div>
      </section>

      {/* ================= 3. CÓMO FUNCIONA ================= */}
      <section id="como-funciona" className="how-section">
        <div className="how-container">
          <div className="how-left">
            <span className="how-tag">¿CÓMO FUNCIONA?</span>
            <h2 className="how-title">
              Tecnología que <br />
              hace la diferencia
            </h2>
            <p className="how-description">
              Rein-vø analiza el residuo, identifica su tipo, se mueve hacia el contenedor
              correspondiente y lo deposita automáticamente.
            </p>

            <div className="how-steps-list">
              <div className="step-card">
                <span className="step-number">1</span>
                <p>La cámara detecta el objeto.</p>
              </div>
              <div className="step-card">
                <span className="step-number">2</span>
                <p>La IA lo clasifica.</p>
              </div>
              <div className="step-card">
                <span className="step-number">3</span>
                <p>El sistema pan-tilt se posiciona.</p>
              </div>
              <div className="step-card">
                <span className="step-number">4</span>
                <p>El residuo se deposita en el contenedor correcto.</p>
              </div>
            </div>
          </div>

          <div className="how-right">
            <div className="camera-view-box">
              <div className="detection-bounding-box">
                <div className="detected-badge">
                  <span>✓</span> Objeto detectado: Plástico
                </div>
                <div className="detected-icon">🍷</div>
              </div>
            </div>

            <div className="how-bin-preview">
              <div className="bin-brand-header">
                <span className="recycle-mini-icon">↻</span>
                <span>REIN-VØ</span>
              </div>
              <div className="bins-grid small-grid">
                <div className="bin-card bin-green small-card">
                  <span className="bin-icon">🍃</span>
                  <span className="bin-label">Orgánico</span>
                </div>
                <div className="bin-card bin-blue small-card">
                  <span className="bin-icon">↻</span>
                  <span className="bin-label">Reciclable</span>
                </div>
                <div className="bin-card bin-gray small-card">
                  <span className="bin-icon">🗑</span>
                  <span className="bin-label">Inorgánico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. BANNER DE IMPACTO ================= */}
      <section id="impacto" className="impact-section">
        <div className="impact-container">
          <div className="impact-banner">
            <span className="impact-tag">Juntos por un futuro más verde</span>
            <h2>Tu basura hoy, <br /> un mejor mañana.</h2>
            <p>
              Rein-vø no solo clasifica residuos, también educa, reduce el impacto
              ambiental y construye un mundo más sostenible.
            </p>
            <button
              type="button"
              className="btn-impact"
              onClick={() => scrollToSection('contacto')}
            >
              Conoce más sobre Rein-vø <span>→</span>
            </button>
          </div>

          <div className="impact-list">
            <h3>TECNOLOGÍA QUE CUIDA EL PLANETA</h3>
            <div className="impact-item">
              <div className="impact-icon">🍃</div>
              <div>
                <h4>Menos residuos</h4>
                <p>Reduce la acumulación de basura en el entorno.</p>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon">↻</div>
              <div>
                <h4>Más reciclaje</h4>
                <p>Aumenta la correcta separación de materiales.</p>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon">🌐</div>
              <div>
                <h4>Un planeta mejor</h4>
                <p>Pequeñas acciones, grandes cambios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CONTACTO Y FOOTER ================= */}
      <footer id="contacto" className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-line">
              <span className="brand-mark">↻</span>
              <span className="brand-text">Rein-vø</span>
            </div>
            <p className="footer-slogan">Tecnología que cuida el planeta</p>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => scrollToSection('inicio')}>Inicio</button>
            <button type="button" onClick={() => scrollToSection('caracteristicas')}>Características</button>
            <button type="button" onClick={() => scrollToSection('como-funciona')}>Cómo funciona</button>
            <button type="button" onClick={() => scrollToSection('impacto')}>Galería</button>
            <button type="button" onClick={() => scrollToSection('contacto')}>Contacto</button>
          </div>

          <div className="footer-extra">
            <span>Reciclar es inteligente 🍃</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Rein-vø. Todos los derechos reservados.</p>
          <p>Innovación • Educación • Sostenibilidad</p>
        </div>
      </footer>
    </div>
  )
}
