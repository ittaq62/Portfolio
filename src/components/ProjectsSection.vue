<template>
  <section id="projets" class="projects" ref="sectionRef">
    <!-- Header -->
    <div class="projects__header" ref="headerRef">
      <span class="projects__label">Realisations</span>
      <h2 class="projects__title">
        <span class="projects__title-line" ref="titleLine1">MES</span>
        <span class="projects__title-line projects__title-line--accent" ref="titleLine2">PROJETS</span>
      </h2>
      <p class="projects__subtitle">Une selection de projets perso, scolaires et professionnels</p>
    </div>

    <!-- Filtres -->
    <div class="projects__filters" ref="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        class="projects__filter"
        :class="{ 'projects__filter--active': activeFilter === cat }"
        @click="activeFilter = cat"
      >
        <span class="projects__filter-text">{{ cat }}</span>
        <span class="projects__filter-count">{{ getCategoryCount(cat) }}</span>
      </button>
    </div>

    <!-- Grid -->
    <div class="projects__grid" ref="grid">
      <article
        v-for="(project, i) in filteredProjects"
        :key="project.title"
        class="project-card"
        :ref="el => cardRefs[i] = el"
        @mousemove="handleTilt($event, i)"
        @mouseleave="resetTilt(i)"
      >
        <div class="project-card__inner">
          <!-- Background number -->
          <span class="project-card__number">{{ String(i + 1).padStart(2, '0') }}</span>

          <!-- Top : icon + category badge -->
          <div class="project-card__top">
            <div class="project-card__icon">{{ project.icon }}</div>
            <span class="project-card__category">{{ project.category }}</span>
          </div>

          <!-- Title -->
          <h3 class="project-card__title">{{ project.title }}</h3>

          <!-- Description -->
          <p class="project-card__desc">{{ project.description }}</p>

          <!-- Techs -->
          <div class="project-card__techs">
            <span class="project-card__tech" v-for="tech in project.techs" :key="tech">{{ tech }}</span>
          </div>

          <!-- Links -->
          <div class="project-card__links" v-if="project.github || project.demo">
            <a v-if="project.github" :href="project.github" target="_blank" class="project-card__link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank" class="project-card__link project-card__link--demo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span>Demo</span>
            </a>
          </div>

          <!-- Hover overlay glow -->
          <div class="project-card__glow"></div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const sectionRef = ref(null)
const headerRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const filters = ref(null)
const grid = ref(null)
const cardRefs = ref([])
const activeFilter = ref('Tous')

const categories = ['Tous', 'Web', 'Game Dev', 'VR', '3D']

const projects = [
  {
    title: 'APPESSAIS',
    description: 'Application PowerApps developpee pour EDF permettant aux equipes de suivre l\'avancement des tests de requalification des equipements de la centrale nucleaire de Gravelines. Tableaux de bord Power BI integres.',
    techs: ['PowerApps', 'Power Automate', 'Power BI', 'SharePoint'],
    icon: '⚡',
    category: 'Web',
    github: null,
    demo: null
  },
  {
    title: 'CS2 Case Tracker',
    description: 'Tracker d\'ouvertures de caisses CS2 avec roue de tirage, statistiques et recuperation des prix Steam Market via Google Sheets.',
    techs: ['Vue.js', 'PHP', 'Docker', 'Google Sheets API'],
    icon: '🎮',
    category: 'Web',
    github: 'https://github.com/ittaq62/cs2-toolbox',
    demo: null
  },
  {
    title: 'Application cimetiere',
    description: 'Application web deployee sur borne interactive pour la gestion du cimetiere de Longuenesse. Developpement de l\'interface graphique (projet BTS).',
    techs: ['Vue.js', 'JavaScript', 'HTML', 'CSS'],
    icon: '🌐',
    category: 'Web',
    github: null,
    demo: null
  },
  {
    title: 'Antique War',
    description: 'Jeu RTS en Python/Pygame avec theme egyptien. Architecture ECS, 3 types d\'unites avec IA, pathfinding A*, audio procedural.',
    techs: ['Python', 'Pygame', 'ECS', 'esper'],
    icon: '🏛️',
    category: 'Game Dev',
    github: 'https://github.com/ittaq62/SAE_Jeux_video_IA',
    demo: null
  },
  {
    title: 'BioEchecVR',
    description: 'Puzzle game en realite virtuelle sous Unreal Engine 5. Menu interactif VR, interactions manettes, mecaniques de portes avec carte d\'acces.',
    techs: ['Unreal Engine 5', 'Blueprint', 'VR', 'C++'],
    icon: '🥽',
    category: 'VR',
    github: null,
    demo: null
  },
  {
    title: 'Ray Tracing Engine',
    description: 'Moteur de ray tracing en C++ : Moller-Trumbore, antialiasing, materiaux diffus et parallelisation OpenMP.',
    techs: ['C++', 'OpenMP', 'Maths 3D'],
    icon: '🔮',
    category: '3D',
    github: 'https://github.com/ittaq62/TP-RayTracing',
    demo: null
  },
  {
    title: 'Modelisation 3D',
    description: 'Creations en Blender : bougies avec textures de cire realistes, bouteille de champagne, meubles (chaises, tables) avec materiaux bois.',
    techs: ['Blender', '3D', 'Texturing'],
    icon: '🕯️',
    category: '3D',
    github: null,
    demo: null
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'Tous') return projects
  return projects.filter(p => p.category === activeFilter.value)
})

const getCategoryCount = (cat) => {
  if (cat === 'Tous') return projects.length
  return projects.filter(p => p.category === cat).length
}

// Tilt 3D effect
const handleTilt = (e, i) => {
  const card = cardRefs.value[i]
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card.querySelector('.project-card__inner'), {
    rotationY: x * 8,
    rotationX: -y * 8,
    transformPerspective: 1000,
    duration: 0.5,
    ease: 'power2.out'
  })

  // Update glow position
  const glow = card.querySelector('.project-card__glow')
  if (glow) {
    glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(232, 213, 181, 0.15), transparent 60%)`
  }
}

const resetTilt = (i) => {
  const card = cardRefs.value[i]
  if (!card) return
  gsap.to(card.querySelector('.project-card__inner'), {
    rotationY: 0,
    rotationX: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
}

const animateCards = () => {
  nextTick(() => {
    gsap.fromTo('.project-card', {
      y: 60,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    })
  })
}

watch(activeFilter, () => {
  animateCards()
})

onMounted(() => {
  // Title reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%'
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
  .from('.projects__subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5')

  // Filters
  gsap.from('.projects__filter', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: filters.value,
      start: 'top 90%'
    }
  })

  // Cards reveal
  gsap.from('.project-card', {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: grid.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.projects {
  position: relative;
  padding: 6rem 4rem;
  min-height: 100vh;
  max-width: none;
  margin: 0;
}

/* Header */
.projects__header {
  margin-bottom: 3rem;
}

.projects__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.projects__title {
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

.projects__title-line {
  display: inline-block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
  padding: 0.05em 0.1em 0.05em 0;
  will-change: clip-path;
}

.projects__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.projects__subtitle {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* Filters */
.projects__filters {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.projects__filter {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid rgba(232, 213, 181, 0.15);
  padding: 0.6rem 1.4rem;
  border-radius: 30px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}

.projects__filter::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;
}

.projects__filter:hover {
  color: var(--text);
  border-color: var(--accent);
}

.projects__filter:hover::before {
  transform: scaleX(1);
  transform-origin: left;
  opacity: 0.1;
}

.projects__filter--active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.projects__filter--active::before {
  display: none;
}

.projects__filter-text {
  position: relative;
  z-index: 1;
}

.projects__filter-count {
  position: relative;
  z-index: 1;
  font-size: 0.65rem;
  opacity: 0.6;
  font-weight: 700;
}

/* Grid */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
}

/* Project card */
.project-card {
  perspective: 1200px;
  will-change: transform;
}

.project-card__inner {
  position: relative;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.06);
  border-radius: 20px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: border-color 0.4s, box-shadow 0.4s;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
}

.project-card:hover .project-card__inner {
  border-color: rgba(232, 213, 181, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* Number en filigrane */
.project-card__number {
  position: absolute;
  bottom: -1rem;
  right: 0.5rem;
  font-family: var(--font-serif);
  font-size: 8rem;
  font-weight: 900;
  color: rgba(232, 213, 181, 0.03);
  line-height: 1;
  pointer-events: none;
  font-style: italic;
  transition: color 0.4s;
}

.project-card:hover .project-card__number {
  color: rgba(232, 213, 181, 0.07);
}

/* Glow at hover */
.project-card__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s;
  border-radius: 20px;
}

.project-card:hover .project-card__glow {
  opacity: 1;
}

/* Top */
.project-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.project-card__icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.project-card__category {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(232, 213, 181, 0.2);
  border-radius: 20px;
}

/* Title */
.project-card__title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.01em;
}

/* Desc */
.project-card__desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.7;
  flex-grow: 1;
}

/* Techs */
.project-card__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.project-card__tech {
  background: rgba(232, 213, 181, 0.08);
  color: var(--accent);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: background 0.3s;
}

.project-card:hover .project-card__tech {
  background: rgba(232, 213, 181, 0.15);
}

/* Links */
.project-card__links {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
  position: relative;
  z-index: 2;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(232, 213, 181, 0.2);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
}

.project-card__link:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  transform: translateY(-2px);
}

.project-card__link--demo {
  background: rgba(232, 213, 181, 0.1);
  border-color: rgba(232, 213, 181, 0.3);
}

.project-card__link svg {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .projects {
    padding: 4rem 1.5rem;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }

  .project-card__inner {
    padding: 1.5rem;
  }

  /* Disable tilt on touch */
  .project-card__inner {
    transform: none !important;
  }
}
</style>
