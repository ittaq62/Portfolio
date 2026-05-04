<template>
  <section id="about" class="about" ref="sectionRef">
    <!-- Header -->
    <div class="about__header" ref="headerRef">
      <span class="about__label">A propos</span>
      <h2 class="about__title">
        <span class="about__title-line" ref="titleLine1">A</span>
        <span class="about__title-line about__title-line--accent" ref="titleLine2">PROPOS</span>
      </h2>
    </div>

    <div class="about__content">
      <!-- Texte principal -->
      <div class="about__text" ref="textRef">
        <p class="about__intro">
          <span ref="introWord">Developpeur</span> de 22 ans en 3eme annee de BUT Informatique a l'IUT de Calais,
          parcours <span class="about__highlight">Conception et Developpement d'Applications</span>.
          En alternance chez <span class="about__highlight">EDF</span> au CNPE de Gravelines,
          je cree des outils numeriques pour simplifier le travail des equipes.
        </p>
        <p class="about__intro">
          Je m'interesse a tout ce qui touche au code, du <span class="about__highlight">web</span>
          a la <span class="about__highlight">VR</span> en passant par le <span class="about__highlight">game dev</span>.
        </p>
      </div>

      <!-- Stats compteurs animes -->
      <div class="about__stats" ref="statsRef">
        <div class="about__stat" v-for="(stat, i) in stats" :key="i">
          <span class="about__stat-number" :ref="el => statRefs[i] = el" :data-target="stat.value">0</span>
          <span class="about__stat-suffix">{{ stat.suffix }}</span>
          <span class="about__stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Infos cards en grille -->
    <div class="about__infos" ref="infosRef">
      <div
        v-for="(info, i) in infos"
        :key="info.label"
        class="about__info"
        :ref="el => infoRefs[i] = el"
      >
        <span class="about__info-index">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="about__info-label">{{ info.label }}</span>
        <span class="about__info-value">{{ info.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const sectionRef = ref(null)
const headerRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const textRef = ref(null)
const introWord = ref(null)
const statsRef = ref(null)
const infosRef = ref(null)
const statRefs = ref([])
const infoRefs = ref([])

const stats = [
  { value: 5, suffix: '+', label: 'Annees de code' },
  { value: 15, suffix: '+', label: 'Projets realises' },
  { value: 8, suffix: '', label: 'Pays visites' },
  { value: 3, suffix: '', label: 'Langues parlees' }
]

const infos = [
  { label: 'Formation', value: 'BUT Informatique 3eme annee, IUT de Calais' },
  { label: 'Parcours', value: 'Conception et Developpement d\'Applications' },
  { label: 'Alternance', value: 'EDF, CNPE de Gravelines' },
  { label: 'Diplomes', value: 'BTS SN option IR, Bac general' },
  { label: 'Candidature', value: 'IMT Nord Europe, cycle ingenieur' },
  { label: 'Localisation', value: 'Polincove, Hauts-de-France' }
]

onMounted(() => {
  // Titre - reveal clip path
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

  // Texte fade up paragraphes
  gsap.from(textRef.value.querySelectorAll('p'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: textRef.value,
      start: 'top 80%'
    }
  })

  // Highlights qui se colorent au scroll
  gsap.fromTo(textRef.value.querySelectorAll('.about__highlight'), {
    backgroundSize: '0% 100%'
  }, {
    backgroundSize: '100% 100%',
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: textRef.value,
      start: 'top 70%'
    }
  })

  // Compteurs animes
  statRefs.value.forEach((el) => {
    if (!el) return
    const target = parseInt(el.dataset.target)
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val)
      },
      scrollTrigger: {
        trigger: statsRef.value,
        start: 'top 80%'
      }
    })
  })

  // Stats fade up stagger
  gsap.from('.about__stat', {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: statsRef.value,
      start: 'top 85%'
    }
  })

  // Info cards
  gsap.from(infoRefs.value.filter(Boolean), {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: infosRef.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.about {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 6rem 4rem;
  min-height: 100vh;
  max-width: none;
  margin: 0;
}

/* Header */
.about__header {
  margin-bottom: 4rem;
}

.about__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.about__title {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 0.9;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.4em;
  flex-wrap: wrap;
}

.about__title-line {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
  overflow: hidden;
  will-change: clip-path;
}

.about__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Content layout */
.about__content {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 5rem;
  align-items: start;
  margin-bottom: 4rem;
}

/* Text */
.about__intro {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 1.8vw, 1.5rem);
  color: var(--text);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.about__highlight {
  background-image: linear-gradient(120deg, rgba(232, 213, 181, 0.18) 0%, rgba(212, 168, 83, 0.15) 100%);
  background-repeat: no-repeat;
  background-position: 0 88%;
  background-size: 0% 60%;
  padding: 0 0.15em;
  color: var(--accent);
  font-weight: 600;
  font-style: italic;
}

/* Stats */
.about__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2.5rem;
}

.about__stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 1.2rem 0;
  border-top: 1px solid rgba(232, 213, 181, 0.1);
}

.about__stat-number {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  color: var(--accent);
  font-style: italic;
}

.about__stat-suffix {
  position: absolute;
  top: 1.2rem;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--accent);
  margin-left: 0.1em;
  font-weight: 700;
  transform: translateX(0.1em);
}

.about__stat-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 0.3rem;
}

/* Info cards */
.about__infos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}

.about__info {
  position: relative;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.06);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.3s,
              box-shadow 0.4s;
  overflow: hidden;
}

.about__info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.about__info:hover {
  transform: translateY(-4px);
  border-color: rgba(232, 213, 181, 0.18);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.about__info:hover::before {
  transform: scaleX(1);
}

.about__info-index {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-family: var(--font-serif);
  font-size: 0.75rem;
  color: rgba(232, 213, 181, 0.3);
  letter-spacing: 0.05em;
}

.about__info-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
}

.about__info-value {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--text);
  font-weight: 500;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 968px) {
  .about__content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 1.5rem;
  }

  .about__stats {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .about__infos {
    grid-template-columns: 1fr;
  }
}
</style>
