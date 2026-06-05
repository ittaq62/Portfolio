<template>
  <section class="hero" ref="heroRef" @mousemove="onMouseMove">
    <!-- Background artwork anime -->
    <AnimatedBackground />

    <!-- Gradient animé en fond -->
    <div class="hero__gradient"></div>

    <!-- Particules flottantes -->
    <div class="hero__particles" ref="particlesRef">
      <div
        v-for="n in 20"
        :key="n"
        class="hero__particle"
        :ref="el => particleEls[n-1] = el"
      ></div>
    </div>

    <!-- Lignes decoratives animees -->
    <svg class="hero__lines" viewBox="0 0 1400 900" preserveAspectRatio="none" ref="linesRef">
      <line x1="0" y1="300" x2="1400" y2="300" class="hero__line" />
      <line x1="0" y1="600" x2="1400" y2="600" class="hero__line" />
      <line x1="350" y1="0" x2="350" y2="900" class="hero__line hero__line--v" />
      <line x1="700" y1="0" x2="700" y2="900" class="hero__line hero__line--v" />
      <line x1="1050" y1="0" x2="1050" y2="900" class="hero__line hero__line--v" />
      <circle cx="350" cy="300" r="4" class="hero__node" />
      <circle cx="700" cy="600" r="4" class="hero__node" />
      <circle cx="1050" cy="300" r="4" class="hero__node" />
    </svg>

    <!-- Contenu central avec parallax -->
    <div class="hero__content" ref="contentRef" :style="contentParallax">
      <div class="hero__center">
        <div class="hero__greeting-wrap" ref="greetingWrap">
          <p class="hero__greeting" ref="greeting">
            <span class="hero__greeting-line"></span>
            Portfolio
            <span class="hero__greeting-line"></span>
          </p>
        </div>

        <h1 class="hero__name" ref="nameEl">
          <span class="hero__name-line hero__name-line--reveal" ref="line1">
            <span class="hero__name-inner">QUENTIN</span>
          </span>
          <span class="hero__name-line hero__name-line--reveal hero__name-line--italic" ref="line2">
            <span class="hero__name-inner">DOUILLY</span>
          </span>
        </h1>

        <p ref="roleEl" class="hero__role">
          <span v-for="(char, i) in roleChars" :key="i" class="hero__role-char" :ref="el => roleCharEls[i] = el">{{ char === ' ' ? '\u00A0' : char }}</span>
        </p>

        <p class="hero__tagline" ref="taglineEl">
          <span class="hero__tagline-static">Je crée</span>
          <span class="hero__tagline-rotate">
            <span class="hero__tagline-sizer" aria-hidden="true">{{ longestWord }}</span>
            <Transition name="word" mode="out-in">
              <span :key="currentWordIndex" class="hero__tagline-word">{{ rotatingWords[currentWordIndex] }}</span>
            </Transition>
          </span>
        </p>
      </div>
    </div>

    <!-- Hotspots interactifs avec glow -->
    <div class="hero__hotspots">
      <a
        v-for="(spot, i) in hotspots"
        :key="i"
        :href="'#' + spot.id"
        class="hero__hotspot"
        :class="['hero__hotspot--' + spot.position, { active: activeSpot === i }]"
        :ref="el => hotspotRefs[i] = el"
        @mouseenter="activeSpot = i"
        @mouseleave="activeSpot = null"
        @click.prevent="navigateToSection(spot, i, $event)"
      >
        <span class="hero__hotspot-dot">
          <span class="hero__hotspot-pulse"></span>
        </span>
        <span class="hero__hotspot-content">
          <span class="hero__hotspot-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="hero__hotspot-label">{{ spot.label }}</span>
        </span>
        <span class="hero__hotspot-line"></span>
      </a>
    </div>

    <!-- Explore avec animation -->
    <div ref="exploreHint" class="hero__explore">
      <div class="hero__explore-ring">
        <svg class="hero__explore-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" class="hero__explore-circle-bg" />
          <circle cx="50" cy="50" r="45" class="hero__explore-circle-progress" />
        </svg>
        <div class="hero__explore-inner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
      <span class="hero__explore-text">Explorer</span>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-indicator" ref="scrollIndicator">
      <div class="hero__scroll-mouse">
        <div class="hero__scroll-wheel"></div>
      </div>
    </div>

    <!-- Transition overlay -->
    <div class="hero__transition" ref="transitionOverlay">
      <div class="hero__transition-circle" ref="transitionCircle"></div>
      <div class="hero__transition-content" ref="transitionContent">
        <span class="hero__transition-index" ref="transitionIndex"></span>
        <span class="hero__transition-label" ref="transitionLabel"></span>
        <div class="hero__transition-line" ref="transitionLine"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import AnimatedBackground from './AnimatedBackground.vue'

const heroRef = ref(null)
const contentRef = ref(null)
const greeting = ref(null)
const greetingWrap = ref(null)
const nameEl = ref(null)
const line1 = ref(null)
const line2 = ref(null)
const roleEl = ref(null)
const exploreHint = ref(null)
const scrollIndicator = ref(null)
const linesRef = ref(null)
const particlesRef = ref(null)
const particleEls = ref([])
const hotspotRefs = ref([])
const roleCharEls = ref([])
const activeSpot = ref(null)
const transitionOverlay = ref(null)
const transitionCircle = ref(null)
const transitionContent = ref(null)
const transitionIndex = ref(null)
const transitionLabel = ref(null)
const transitionLine = ref(null)
const isTransitioning = ref(false)

const roleText = 'DÉVELOPPEUR POLYVALENT'
const roleChars = roleText.split('')

// Tagline rotative : montre la polyvalence
const taglineEl = ref(null)
const rotatingWords = [
  'des applications web',
  'des jeux vidéo',
  'des expériences VR',
  'des univers en 3D',
  'des outils métier'
]
const currentWordIndex = ref(0)
const longestWord = computed(() =>
  rotatingWords.reduce((a, b) => (b.length > a.length ? b : a), '')
)
let wordInterval = null

const mouse = reactive({ x: 0, y: 0 })

const contentParallax = computed(() => ({
  transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`
}))

const onMouseMove = (e) => {
  const rect = heroRef.value.getBoundingClientRect()
  mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

  // Parallax particules
  particleEls.value.forEach((el, i) => {
    if (!el) return
    const speed = (i % 5 + 1) * 3
    gsap.to(el, {
      x: mouse.x * speed,
      y: mouse.y * speed,
      duration: 1,
      ease: 'power2.out'
    })
  })
}

const hotspots = [
  { id: 'about', label: 'À propos', position: 'top-left' },
  { id: 'skills', label: 'Compétences', position: 'top-right' },
  { id: 'experience', label: 'Expérience', position: 'bottom-left' },
  { id: 'projets', label: 'Projets', position: 'bottom-right' },
  { id: 'contact', label: 'Contact', position: 'center-right' }
]

const navigateToSection = (spot, index, event) => {
  if (isTransitioning.value) return
  isTransitioning.value = true

  // Get click position for circle origin
  const rect = heroRef.value.getBoundingClientRect()
  const dotEl = hotspotRefs.value[index]?.querySelector('.hero__hotspot-dot')
  const dotRect = dotEl ? dotEl.getBoundingClientRect() : { left: event.clientX, top: event.clientY, width: 0, height: 0 }
  const originX = dotRect.left - rect.left + dotRect.width / 2
  const originY = dotRect.top - rect.top + dotRect.height / 2

  // Set label text
  transitionIndex.value.textContent = String(index + 1).padStart(2, '0')
  transitionLabel.value.textContent = spot.label

  // Position circle at dot
  gsap.set(transitionCircle.value, {
    left: originX,
    top: originY,
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 1
  })
  gsap.set(transitionOverlay.value, { visibility: 'visible', opacity: 1 })
  gsap.set(transitionContent.value, { opacity: 0, y: 30 })
  gsap.set(transitionLine.value, { scaleX: 0 })

  // Calculate scale needed to cover entire viewport
  const maxDim = Math.max(rect.width, rect.height) * 2.5
  const circleSize = 10 // base circle size in px
  const targetScale = maxDim / circleSize

  const tl = gsap.timeline()

  // 1. Circle expands from dot
  tl.to(transitionCircle.value, {
    scale: targetScale,
    duration: 0.7,
    ease: 'power3.inOut'
  })

  // 2. Show section title
  .to(transitionContent.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out'
  }, '-=0.2')

  // 3. Line expands
  .to(transitionLine.value, {
    scaleX: 1,
    duration: 0.5,
    ease: 'power2.inOut'
  }, '-=0.2')

  // 4. Hold briefly
  .to({}, { duration: 0.3 })

  // 5. Fade out & scroll
  .to(transitionContent.value, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in'
  })
  .to(transitionOverlay.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onStart: () => {
      // Scroll to target section
      const target = document.getElementById(spot.id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    },
    onComplete: () => {
      gsap.set(transitionOverlay.value, { visibility: 'hidden' })
      gsap.set(transitionCircle.value, { scale: 0 })
      isTransitioning.value = false
    }
  }, '-=0.1')
}

onMounted(() => {
  // Init particules aléatoires
  particleEls.value.forEach((el, i) => {
    if (!el) return
    gsap.set(el, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.3 + 0.1
    })
    // Animation flottante continue
    gsap.to(el, {
      y: `+=${Math.random() * 100 - 50}`,
      x: `+=${Math.random() * 60 - 30}`,
      duration: Math.random() * 4 + 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 2
    })
  })

  // Timeline d'intro (en pause : les etats de depart "from" s'appliquent
  // immediatement grace a immediateRender, donc tout est cache derriere le
  // loader ; on jouera la timeline a la fin du chargement)
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, paused: true })

  // Lignes SVG apparaissent
  tl.from('.hero__line', {
    strokeDashoffset: 2000,
    duration: 1.5,
    stagger: 0.1,
    ease: 'power2.inOut'
  })
  .from('.hero__node', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.15,
    ease: 'back.out(2)'
  }, '-=0.8')

  // Greeting
  .from(greetingWrap.value, { opacity: 0, duration: 0.5 }, '-=0.6')
  .from('.hero__greeting-line', {
    width: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.inOut'
  }, '-=0.3')

  // Nom - reveal clip
  .fromTo(line1.value, {
    clipPath: 'inset(0 100% 0 0)'
  }, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    ease: 'power4.inOut'
  }, '-=0.3')
  .fromTo(line2.value, {
    clipPath: 'inset(0 0 0 100%)'
  }, {
    clipPath: 'inset(0 0 0 0%)',
    duration: 1,
    ease: 'power4.inOut'
  }, '-=0.7')

  // Role - chaque lettre
  .from(roleCharEls.value.filter(Boolean), {
    y: 30,
    opacity: 0,
    rotateX: -90,
    duration: 0.4,
    stagger: 0.02,
    ease: 'back.out(1.5)'
  }, '-=0.4')

  // Tagline rotative
  .from(taglineEl.value, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.2')

  // Hotspots pop
  .from(hotspotRefs.value.filter(Boolean), {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'back.out(2)'
  }, '-=0.5')

  // Explorer
  .from(exploreHint.value, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')

  // Scroll indicator
  .from(scrollIndicator.value, {
    opacity: 0,
    duration: 0.5
  }, '-=0.2')

  // Animation continue du gradient (fond, peut tourner des le debut)
  gsap.to('.hero__gradient', {
    backgroundPosition: '200% 200%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  // Lance l'intro + la rotation des mots APRES le chargement
  const startIntro = () => {
    tl.play()
    if (!wordInterval) {
      wordInterval = setInterval(() => {
        currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length
      }, 2400)
    }
  }

  // Lance l'intro quand le chargement est termine (evenement window robuste)
  if (window.__appLoaded) {
    startIntro()
  } else {
    window.addEventListener('app:loaded', startIntro, { once: true })
  }
})

onUnmounted(() => {
  if (wordInterval) clearInterval(wordInterval)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0;
  max-width: none;
  margin: 0;
  background: var(--bg);
  cursor: none;
}

/* Gradient animé */
.hero__gradient {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at 20% 50%, rgba(232, 213, 181, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(168, 130, 80, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(232, 213, 181, 0.03) 0%, transparent 40%);
  background-size: 200% 200%;
  pointer-events: none;
  z-index: 0;
}

/* Particules */
.hero__particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  will-change: transform;
}

.hero__particle:nth-child(odd) {
  width: 2px;
  height: 2px;
  background: rgba(232, 213, 181, 0.4);
}

.hero__particle:nth-child(3n) {
  width: 6px;
  height: 6px;
  background: transparent;
  border: 1px solid rgba(232, 213, 181, 0.2);
}

/* Lignes decoratives SVG */
.hero__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.hero__line {
  stroke: rgba(232, 213, 181, 0.05);
  stroke-width: 1;
  stroke-dasharray: 2000;
  stroke-dashoffset: 0;
}

.hero__node {
  fill: rgba(232, 213, 181, 0.15);
}

/* Contenu */
.hero__content {
  position: relative;
  z-index: 2;
  will-change: transform;
  transition: transform 0.3s ease-out;
}

.hero__center {
  text-align: center;
}

.hero__greeting-wrap {
  margin-bottom: 1.5rem;
}

.hero__greeting {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.hero__greeting-line {
  display: inline-block;
  width: 50px;
  height: 1px;
  background: var(--accent);
  opacity: 0.4;
}

.hero__name {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 0.85;
  margin: 0;
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 0.05em;
}

.hero__name-line {
  display: block;
  overflow: hidden;
}

.hero__name-line--reveal {
  will-change: clip-path;
}

.hero__name-inner {
  display: block;
  font-size: clamp(4rem, 12vw, 11rem);
  letter-spacing: -0.02em;
}

.hero__name-line--italic .hero__name-inner {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 50%, var(--accent) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero__role {
  font-family: var(--font-sans);
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  color: var(--text-muted);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-top: 2rem;
  perspective: 600px;
}

.hero__role-char {
  display: inline-block;
  will-change: transform, opacity;
}

/* Tagline rotative */
.hero__tagline {
  margin-top: 1.6rem;
  font-family: var(--font-serif);
  font-size: clamp(0.95rem, 1.7vw, 1.4rem);
  font-style: italic;
  color: var(--text-muted);
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.45em;
  flex-wrap: wrap;
}

.hero__tagline-static {
  white-space: nowrap;
}

.hero__tagline-rotate {
  position: relative;
  display: inline-block;
  text-align: left;
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
}

/* Sizer invisible : reserve la largeur du mot le plus long */
.hero__tagline-sizer {
  visibility: hidden;
  white-space: nowrap;
}

/* Le mot anime est positionne par-dessus le sizer */
.hero__tagline-word {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
}

/* Transition des mots */
.word-enter-active,
.word-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.word-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.word-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Hotspots */
.hero__hotspots {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.hero__hotspot {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: all;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-muted);
  transition: color 0.4s ease;
}

.hero__hotspot:hover {
  color: var(--text);
}

.hero__hotspot--top-left { top: 18%; left: 6%; }
.hero__hotspot--top-right { top: 18%; right: 6%; flex-direction: row-reverse; }
.hero__hotspot--bottom-left { bottom: 22%; left: 6%; }
.hero__hotspot--bottom-right { bottom: 22%; right: 6%; flex-direction: row-reverse; }
.hero__hotspot--center-right { top: 50%; right: 5%; transform: translateY(-50%); flex-direction: row-reverse; }

/* Dot avec pulse */
.hero__hotspot-dot {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  transition: transform 0.3s, box-shadow 0.3s;
}

.hero__hotspot:hover .hero__hotspot-dot {
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(232, 213, 181, 0.5);
}

.hero__hotspot-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0;
  animation: pulse 2.5s ease-out infinite;
}

.hero__hotspot:nth-child(2) .hero__hotspot-pulse { animation-delay: 0.5s; }
.hero__hotspot:nth-child(3) .hero__hotspot-pulse { animation-delay: 1s; }
.hero__hotspot:nth-child(4) .hero__hotspot-pulse { animation-delay: 1.5s; }
.hero__hotspot:nth-child(5) .hero__hotspot-pulse { animation-delay: 2s; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
}

.hero__hotspot-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.hero__hotspot-index {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.hero__hotspot:hover .hero__hotspot-index {
  opacity: 1;
}

.hero__hotspot-label {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.hero__hotspot:hover .hero__hotspot-label {
  transform: translateX(4px);
}

.hero__hotspot--top-right:hover .hero__hotspot-label,
.hero__hotspot--bottom-right:hover .hero__hotspot-label,
.hero__hotspot--center-right:hover .hero__hotspot-label {
  transform: translateX(-4px);
}

.hero__hotspot-line {
  width: 30px;
  height: 1px;
  background: var(--text-muted);
  transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s;
}

.hero__hotspot:hover .hero__hotspot-line {
  width: 60px;
  background: var(--accent);
}

/* Explore ring */
.hero__explore {
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 3;
  cursor: pointer;
}

.hero__explore-ring {
  position: relative;
  width: 56px;
  height: 56px;
}

.hero__explore-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.hero__explore-circle-bg {
  fill: none;
  stroke: rgba(232, 213, 181, 0.1);
  stroke-width: 1;
}

.hero__explore-circle-progress {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: circleProgress 3s ease-in-out infinite;
}

@keyframes circleProgress {
  0% { stroke-dashoffset: 283; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -283; }
}

.hero__explore-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  animation: floatDown 2s ease-in-out infinite;
}

@keyframes floatDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

.hero__explore-text {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Scroll mouse indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 3.5rem;
  right: 2.5rem;
  z-index: 3;
}

.hero__scroll-mouse {
  width: 22px;
  height: 36px;
  border: 1.5px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
  opacity: 0.5;
}

.hero__scroll-wheel {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 7px;
  border-radius: 3px;
  background: var(--accent);
  animation: scrollWheel 2s ease-in-out infinite;
}

@keyframes scrollWheel {
  0% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(12px); opacity: 0; }
}

/* Transition overlay */
.hero__transition {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  visibility: hidden;
}

.hero__transition-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bg);
  transform-origin: center;
}

.hero__transition-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.hero__transition-index {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.hero__transition-label {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero__transition-line {
  width: 80px;
  height: 2px;
  background: var(--accent);
  margin-top: 1.5rem;
  transform-origin: center;
}

/* Responsive */
@media (max-width: 768px) {
  .hero__hotspots {
    display: none;
  }

  .hero__name-inner {
    font-size: clamp(3rem, 15vw, 5rem);
  }

  .hero__scroll-indicator {
    display: none;
  }

  .hero__lines {
    opacity: 0.3;
  }
}
</style>
