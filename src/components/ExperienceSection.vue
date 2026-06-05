<template>
  <section id="experience" class="experience" ref="sectionRef">
    <!-- Titre fixe en haut -->
    <div class="experience__header" ref="headerRef">
      <span class="experience__label">Parcours</span>
      <h2 class="experience__title" ref="titleRef">
        <span class="experience__title-line" ref="titleLine1">MON</span>
        <span class="experience__title-line experience__title-line--accent" ref="titleLine2">PARCOURS</span>
      </h2>
      <p class="experience__subtitle">Formation & Expérience professionnelle</p>
    </div>

    <!-- Container horizontal -->
    <div class="experience__track-wrapper" ref="trackWrapper">
      <div class="experience__track" ref="trackRef">
        <!-- Chaque carte -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="experience__card"
          :class="[
            'experience__card--' + item.type,
            { 'experience__card--active': activeCard === i, 'experience__card--upcoming': item.upcoming }
          ]"
          @mouseenter="activeCard = i"
          @mouseleave="activeCard = null"
        >
          <div class="experience__card-inner">
            <!-- Tag A venir -->
            <span v-if="item.upcoming" class="experience__card-upcoming">À venir</span>

            <!-- Badge type -->
            <div class="experience__card-badge">
              <span class="experience__card-badge-dot"></span>
              {{ item.type === 'formation' ? 'Formation' : 'Expérience' }}
            </div>

            <!-- Logo -->
            <div class="experience__card-logo-wrap">
              <img :src="item.logo" :alt="item.company" class="experience__card-logo" />
            </div>

            <!-- Date -->
            <span class="experience__card-date">{{ item.date }}</span>

            <!-- Titre -->
            <h3 class="experience__card-title">{{ item.title }}</h3>

            <!-- Company -->
            <p class="experience__card-company">{{ item.company }}</p>

            <!-- Description -->
            <p class="experience__card-desc">{{ item.description }}</p>

            <!-- Techs -->
            <div v-if="item.techs && item.techs.length" class="experience__card-techs">
              <span
                v-for="tech in item.techs"
                :key="tech"
                class="experience__card-tech"
              >{{ tech }}</span>
            </div>

            <!-- Index -->
            <span class="experience__card-index">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline bar en bas -->
    <div class="experience__timeline" ref="timelineBar">
      <div class="experience__timeline-line">
        <div class="experience__timeline-progress" ref="timelineProgress"></div>
      </div>
      <div class="experience__timeline-years">
        <span
          v-for="year in years"
          :key="year"
          class="experience__timeline-year"
        >{{ year }}</span>
      </div>
    </div>

    <!-- Drag hint -->
    <div class="experience__hint" ref="hintRef">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      <span>Scrollez pour explorer</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

import edfLogo from '../assets/images/edf.png'
import iutLogo from '../assets/images/iut.png'
import blaisePascalLogo from '../assets/images/blaise-pascal.png'
import sophieBerthelotLogo from '../assets/images/sophie-berthelot.png'

const { gsap, ScrollTrigger } = useScrollAnimation()

const sectionRef = ref(null)
const headerRef = ref(null)
const titleRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const trackWrapper = ref(null)
const trackRef = ref(null)
const timelineBar = ref(null)
const timelineProgress = ref(null)
const hintRef = ref(null)
const activeCard = ref(null)

const years = ['2022', '2024', '2026', '2029']

// Logo IMT (placeholder icone ecole : a remplacer par le vrai logo IMT Nord Europe)
const imtLogo = 'https://api.iconify.design/mdi/school.svg?color=%230b1220'

// Fusionner formations et expériences en une seule liste chronologique
const items = [
  {
    type: 'formation',
    date: 'Juin 2022',
    title: 'Baccalauréat général',
    company: 'Lycée Sophie Berthelot, Calais',
    description: 'Spécialités : NSI et Mathématiques. Mention Assez Bien.',
    techs: [],
    logo: sophieBerthelotLogo
  },
  {
    type: 'formation',
    date: '2022 - 2024',
    title: 'BTS SN option IR',
    company: 'Lycée Blaise Pascal, Longuenesse',
    description: 'Systèmes Numériques, option Informatique et Réseaux. Projet : application web du cimetière de Longuenesse sous Vue.js.',
    techs: ['Vue.js', 'HTML/CSS', 'PHP'],
    logo: blaisePascalLogo
  },
  {
    type: 'experience',
    date: 'Mai - Juin 2023',
    title: 'Stagiaire développeur',
    company: 'EDF, CNPE de Gravelines',
    description: 'Participation au développement d\'un logiciel de gestion des ordonnances médicales. Stage de 6 semaines.',
    techs: ['Développement logiciel'],
    logo: edfLogo
  },
  {
    type: 'formation',
    date: '2024 - En cours',
    title: 'BUT Informatique 3ème année',
    company: 'IUT du Littoral Côte d\'Opale, Calais',
    description: 'Parcours Conception et Développement d\'Applications. Formation en alternance couvrant le développement web, logiciel, mobile, la gestion de bases de données et la 3D.',
    techs: ['Java', 'Python', 'C/C++', 'Vue.js', 'PHP', 'SQL', 'Docker', 'Flutter'],
    logo: iutLogo
  },
  {
    type: 'experience',
    date: 'Avril - Juin 2024',
    title: 'Stagiaire développeur',
    company: 'EDF, CNPE de Gravelines',
    description: 'Migration d\'un suivi Excel vers SharePoint et création d\'une application Power Apps. Automatisation des imports avec Power Automate.',
    techs: ['PowerApps', 'Power Automate', 'SharePoint'],
    logo: edfLogo
  },
  {
    type: 'experience',
    date: '2024 - Présent',
    title: 'Développeur Power Platform',
    company: 'EDF, CNPE de Gravelines',
    description: 'Création d\'applications internes avec PowerApps, automatisation avec Power Automate et tableaux de bord Power BI. Alternance.',
    techs: ['PowerApps', 'Power Automate', 'Power BI', 'SharePoint'],
    logo: edfLogo
  },
  {
    type: 'formation',
    date: '2026 - 2029',
    title: 'Cycle ingénieur en informatique',
    company: 'IMT Nord Europe',
    description: 'Diplôme d\'ingénieur en informatique, en alternance. La prochaine grande étape de mon parcours pour approfondir la conception et l\'architecture logicielle.',
    techs: [],
    logo: imtLogo,
    upcoming: true
  },
  {
    type: 'experience',
    date: '2026 - 2029',
    title: 'Apprenti ingénieur',
    company: 'EDF DIGIT',
    description: 'Alternance au sein de la DIGIT, l\'entité numérique et informatique du groupe EDF, dans le cadre de mon cycle ingénieur.',
    techs: [],
    logo: edfLogo,
    upcoming: true
  }
]

onMounted(() => {
  // Titre animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%'
    }
  })

  tl.from(titleLine1.value, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out'
  })
  .from(titleLine2.value, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out'
  }, '-=0.5')

  // Horizontal scroll
  const track = trackRef.value
  const wrapper = trackWrapper.value

  // Calculer la distance à scroller
  const getScrollAmount = () => {
    return track.scrollWidth - wrapper.offsetWidth
  }

  // Pin la section et scroll horizontal
  const horizontalScroll = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Update progress bar
        if (timelineProgress.value) {
          gsap.set(timelineProgress.value, { scaleX: self.progress })
        }
      }
    }
  })

  // Animer les cartes au passage
  gsap.utils.toArray('.experience__card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        containerAnimation: horizontalScroll,
        start: 'left 85%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // Hint fade out
  gsap.to(hintRef.value, {
    opacity: 0,
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=200',
      scrub: true
    }
  })
})
</script>

<style scoped>
.experience {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  max-width: none;
  margin: 0;
}

/* Header */
.experience__header {
  position: absolute;
  top: 6rem;
  left: 4rem;
  z-index: 2;
}

.experience__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.experience__title {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 0.9;
  margin: 0;
}

.experience__title-line {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
}

.experience__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.experience__subtitle {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.8rem;
  letter-spacing: 0.05em;
}

/* Track wrapper */
.experience__track-wrapper {
  width: 100%;
  overflow: visible;
  padding-top: 10rem;
}

.experience__track {
  display: flex;
  gap: 2rem;
  padding: 2rem 4rem 6rem calc(4rem + 250px);
  will-change: transform;
}

/* Cards */
.experience__card {
  flex-shrink: 0;
  width: 380px;
  perspective: 800px;
}

.experience__card-inner {
  position: relative;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.08);
  border-radius: 16px;
  padding: 2rem;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.4s ease,
              box-shadow 0.4s ease;
  overflow: hidden;
}

.experience__card:hover .experience__card-inner {
  transform: translateY(-8px);
  border-color: rgba(232, 213, 181, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* Formation vs Experience styling */
.experience__card--formation .experience__card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
}

.experience__card--experience .experience__card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #d4a853, transparent);
}

/* Carte a venir (futur) */
.experience__card--upcoming .experience__card-inner {
  border-style: dashed;
  border-color: rgba(232, 213, 181, 0.3);
  background: linear-gradient(160deg, rgba(232, 213, 181, 0.04), var(--bg-light));
}

.experience__card--upcoming .experience__card-inner::before {
  background: repeating-linear-gradient(
    90deg,
    var(--accent),
    var(--accent) 8px,
    transparent 8px,
    transparent 16px
  ) !important;
  opacity: 0.7;
}

.experience__card-upcoming {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(232, 213, 181, 0.35);
  border-radius: 20px;
  background: rgba(232, 213, 181, 0.06);
  z-index: 2;
  animation: upcomingPulse 2.5s ease-in-out infinite;
}

@keyframes upcomingPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* Badge */
.experience__card-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.2rem;
}

.experience__card-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.experience__card--experience .experience__card-badge-dot {
  background: #d4a853;
}

.experience__card--experience .experience__card-badge {
  color: #d4a853;
}

/* Logo */
.experience__card-logo-wrap {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-bottom: 1.2rem;
  transition: transform 0.3s;
}

.experience__card:hover .experience__card-logo-wrap {
  transform: scale(1.05);
}

.experience__card-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Date */
.experience__card-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.6rem;
}

/* Title */
.experience__card-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.4rem;
  line-height: 1.3;
}

/* Company */
.experience__card-company {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
}

/* Description */
.experience__card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* Techs */
.experience__card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.experience__card-tech {
  background: rgba(232, 213, 181, 0.08);
  color: var(--accent);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: background 0.3s;
}

.experience__card:hover .experience__card-tech {
  background: rgba(232, 213, 181, 0.15);
}

/* Index number */
.experience__card-index {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 900;
  color: rgba(232, 213, 181, 0.04);
  line-height: 1;
  pointer-events: none;
  transition: color 0.4s;
}

.experience__card:hover .experience__card-index {
  color: rgba(232, 213, 181, 0.1);
}

/* Timeline bar */
.experience__timeline {
  position: absolute;
  bottom: 3rem;
  left: 4rem;
  right: 4rem;
  z-index: 2;
}

.experience__timeline-line {
  height: 2px;
  background: rgba(232, 213, 181, 0.1);
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 0.8rem;
}

.experience__timeline-progress {
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
}

.experience__timeline-years {
  display: flex;
  justify-content: space-between;
}

.experience__timeline-year {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  opacity: 0.6;
}

/* Hint */
.experience__hint {
  position: absolute;
  bottom: 6.5rem;
  right: 4rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-muted);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  z-index: 2;
}

.experience__hint svg {
  animation: hintSlide 1.5s ease-in-out infinite;
}

@keyframes hintSlide {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

/* Responsive */
@media (max-width: 768px) {
  .experience__header {
    position: relative;
    top: auto;
    left: auto;
    padding: 2rem 1.5rem;
  }

  .experience__track {
    padding: 1rem 1.5rem 6rem 1.5rem;
  }

  .experience__card {
    width: 300px;
  }

  .experience__timeline {
    left: 1.5rem;
    right: 1.5rem;
  }

  .experience__hint {
    right: 1.5rem;
  }
}
</style>
