<template>
  <section id="cv" class="cv" ref="sectionRef">
    <!-- Header -->
    <div class="cv__header" ref="headerRef">
      <span class="cv__label">Curriculum Vitae</span>
      <h2 class="cv__title">
        <span class="cv__title-line" ref="titleLine1">MON</span>
        <span class="cv__title-line cv__title-line--accent" ref="titleLine2">CV</span>
      </h2>
      <p class="cv__subtitle">Consultez mon CV directement, ou téléchargez-le en PDF.</p>
    </div>

    <div class="cv__layout" ref="layoutRef">
      <!-- Liseuse PDF -->
      <div class="cv__viewer">
        <div class="cv__viewer-bar">
          <span class="cv__viewer-dots">
            <span class="cv__viewer-dot"></span>
            <span class="cv__viewer-dot"></span>
            <span class="cv__viewer-dot"></span>
          </span>
          <span class="cv__viewer-name">CV-Quentin-Douilly.pdf</span>
        </div>
        <div class="cv__frame-wrap">
          <iframe
            :src="cvUrl + '#toolbar=0&navpanes=0&view=FitH'"
            title="CV de Quentin Douilly"
            class="cv__frame"
            loading="lazy"
          ></iframe>
          <!-- Fallback (mobile / navigateurs sans visionneuse PDF) -->
          <div class="cv__fallback">
            <p>L'aperçu n'est pas disponible sur votre appareil.</p>
            <a :href="cvUrl" target="_blank" rel="noopener" class="cv__btn cv__btn--primary">
              Ouvrir le CV
            </a>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <aside class="cv__aside">
        <h3 class="cv__aside-title">Mon parcours, en un document</h3>
        <p class="cv__aside-text">
          Formation, expériences, compétences et projets réunis dans un CV à jour.
        </p>

        <div class="cv__actions">
          <a :href="cvUrl" download="CV-Quentin-Douilly.pdf" class="cv__btn cv__btn--primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Télécharger le PDF</span>
          </a>

          <a :href="cvUrl" target="_blank" rel="noopener" class="cv__btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Ouvrir en plein écran</span>
          </a>
        </div>

        <div class="cv__meta">
          <span class="cv__meta-item">PDF</span>
          <span class="cv__meta-sep">·</span>
          <span class="cv__meta-item">Mis à jour récemment</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

// Le CV est servi depuis public/cv.pdf -> accessible a la racine du site
const cvUrl = '/cv.pdf'

const sectionRef = ref(null)
const headerRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const layoutRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  tl.fromTo(titleLine1.value, {
    clipPath: 'inset(0 100% 0 0)',
    y: 30
  }, {
    clipPath: 'inset(0 0% 0 0)',
    y: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .fromTo(titleLine2.value, {
    clipPath: 'inset(0 0 0 100%)',
    y: 30
  }, {
    clipPath: 'inset(0 0 0 0%)',
    y: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.7')
  .fromTo('.cv__subtitle', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')

  gsap.fromTo(layoutRef.value, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: layoutRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
})
</script>

<style scoped>
.cv {
  position: relative;
  padding: 6rem 4rem;
  min-height: 100vh;
  max-width: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Header */
.cv__header {
  margin-bottom: 3rem;
}

.cv__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.cv__title {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 1.05;
  margin: 0 0 1rem;
  display: flex;
  align-items: baseline;
  gap: 0.4em;
  flex-wrap: wrap;
  padding-right: 0.3em;
}

.cv__title-line {
  display: inline-block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
  padding: 0.05em 0.1em 0.05em 0;
  will-change: clip-path;
}

.cv__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cv__subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  color: var(--text-muted);
  max-width: 600px;
}

/* Layout */
.cv__layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 3rem;
  align-items: stretch;
}

/* Viewer */
.cv__viewer {
  display: flex;
  flex-direction: column;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.cv__viewer-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid rgba(232, 213, 181, 0.08);
  background: rgba(0, 0, 0, 0.2);
}

.cv__viewer-dots {
  display: flex;
  gap: 0.4rem;
}

.cv__viewer-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(232, 213, 181, 0.25);
}

.cv__viewer-dot:first-child {
  background: rgba(224, 108, 108, 0.6);
}

.cv__viewer-dot:nth-child(2) {
  background: rgba(232, 196, 104, 0.6);
}

.cv__viewer-dot:nth-child(3) {
  background: rgba(108, 196, 124, 0.6);
}

.cv__viewer-name {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.cv__frame-wrap {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 500px;
}

.cv__frame {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border: none;
  background: #2a2a2a;
}

.cv__fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

/* Aside */
.cv__aside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
}

.cv__aside-title {
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.8rem;
  line-height: 1.2;
}

.cv__aside-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Actions */
.cv__actions {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 1.5rem;
}

.cv__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  border: 1px solid rgba(232, 213, 181, 0.2);
  color: var(--text);
}

.cv__btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.cv__btn--primary {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
  position: relative;
  overflow: hidden;
}

.cv__btn--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.cv__btn--primary:hover::before {
  transform: translateX(100%);
}

.cv__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(232, 213, 181, 0.25);
}

.cv__btn:not(.cv__btn--primary):hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* Meta */
.cv__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 968px) {
  .cv__layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cv__aside {
    order: -1;
  }

  .cv__frame-wrap {
    height: 60vh;
  }
}

@media (max-width: 768px) {
  .cv {
    padding: 4rem 1.5rem;
  }
}
</style>
