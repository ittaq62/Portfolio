<template>
  <section id="experience" class="experience">
    <h2 ref="title">Parcours</h2>
    <div class="timeline" ref="timelineEl">
      <div class="timeline__line" ref="line"></div>
      <div class="timeline__labels">
        <span class="timeline__label timeline__label--left">Formation</span>
        <span class="timeline__label timeline__label--right">Expérience</span>
      </div>
      <div class="timeline__row" v-for="(row, i) in rows" :key="i">
        <div class="timeline__cell timeline__cell--left">
          <div class="timeline__card" v-if="row.formation">
            <img :src="row.formation.logo" :alt="row.formation.company" class="timeline__logo" />
            <span class="timeline__date">{{ row.formation.date }}</span>
            <h3 class="timeline__title">{{ row.formation.title }}</h3>
            <p class="timeline__company">{{ row.formation.company }}</p>
            <p class="timeline__desc">{{ row.formation.description }}</p>
          </div>
        </div>
        <div class="timeline__dot"></div>
        <div class="timeline__cell timeline__cell--right">
          <div class="timeline__card" v-if="row.experience">
            <img :src="row.experience.logo" :alt="row.experience.company" class="timeline__logo" />
            <span class="timeline__date">{{ row.experience.date }}</span>
            <h3 class="timeline__title">{{ row.experience.title }}</h3>
            <p class="timeline__company">{{ row.experience.company }}</p>
            <p class="timeline__desc">{{ row.experience.description }}</p>
            <div class="timeline__techs">
              <span class="timeline__tech" v-for="tech in row.experience.techs" :key="tech">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
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

const { gsap } = useScrollAnimation()

const title = ref(null)
const line = ref(null)
const timelineEl = ref(null)

const rows = [
  {
    formation: {
      date: 'En cours',
      title: 'BUT Informatique 3ème année (alternance)',
      company: 'IUT du Littoral Côte d\'Opale, Calais',
      description: 'Parcours Conception et Développement d\'Applications.',
      logo: iutLogo
    },
    experience: {
      date: '2024 - Présent',
      title: 'Développeur Power Platform (alternance)',
      company: 'EDF, CNPE de Gravelines',
      description: 'Création d\'applications internes avec PowerApps, automatisation avec Power Automate et tableaux de bord Power BI.',
      techs: ['PowerApps', 'Power Automate', 'Power BI', 'SharePoint'],
      logo: edfLogo
    }
  },
  {
    formation: {
      date: 'Juin 2025',
      title: 'BUT Informatique 2ème année',
      company: 'IUT du Littoral Côte d\'Opale, Calais',
      description: 'Parcours Conception et Développement d\'Applications.',
      logo: iutLogo
    },
    experience: {
      date: 'Avril - Juin 2025',
      title: 'Stagiaire développeur (10 semaines)',
      company: 'EDF, CNPE de Gravelines',
      description: 'Migration d\'un suivi Excel vers SharePoint et création d\'une application Power Apps. Automatisation des imports avec Power Automate.',
      techs: ['PowerApps', 'Power Automate', 'SharePoint'],
      logo: edfLogo
    }
  },
  {
    formation: {
      date: 'Juin 2024',
      title: 'BTS SN option IR',
      company: 'Lycée Blaise Pascal, Longuenesse',
      description: 'Systèmes Numériques, option Informatique et Réseaux. Projet : application web du cimetière de Longuenesse sous Vue.js.',
      logo: blaisePascalLogo
    },
    experience: {
      date: 'Mai - Juin 2023',
      title: 'Stagiaire développeur (6 semaines)',
      company: 'EDF, CNPE de Gravelines',
      description: 'Participation au développement d\'un logiciel de gestion des ordonnances médicales.',
      techs: ['Développement logiciel'],
      logo: edfLogo
    }
  },
  {
    formation: {
      date: 'Juin 2022',
      title: 'Baccalauréat général',
      company: 'Lycée Sophie Berthelot, Calais',
      description: 'Spécialités : NSI et Mathématiques. Mention Assez Bien.',
      logo: sophieBerthelotLogo
    },
    experience: null
  }
]

onMounted(() => {
  gsap.from(title.value, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: title.value,
      start: 'top 85%'
    }
  })

  gsap.from(line.value, {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: line.value,
      start: 'top 80%'
    }
  })

  gsap.utils.toArray('.timeline__cell--left .timeline__card').forEach((card) => {
    gsap.from(card, {
      x: -80,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    })
  })

  gsap.utils.toArray('.timeline__cell--right .timeline__card').forEach((card) => {
    gsap.from(card, {
      x: 80,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    })
  })

  gsap.from('.timeline__dot', {
    scale: 0,
    duration: 0.4,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: timelineEl.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.experience {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline__line {
  position: absolute;
  left: 50%;
  top: 4rem;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--primary));
  transform: translateX(-50%);
}

.timeline__labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.timeline__label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline__label--left {
  width: 50%;
  text-align: center;
}

.timeline__label--right {
  width: 50%;
  text-align: center;
}

.timeline__row {
  display: flex;
  align-items: start;
  margin-bottom: 2rem;
  position: relative;
}

.timeline__cell {
  width: 50%;
  padding: 0 2rem;
}

.timeline__dot {
  position: absolute;
  left: 50%;
  top: 1rem;
  width: 16px;
  height: 16px;
  background: var(--accent);
  border: 3px solid var(--bg);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.timeline__card {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.timeline__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.timeline__logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  background: white;
  padding: 4px;
  margin-bottom: 0.8rem;
}

.timeline__date {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline__title {
  font-size: 1.05rem;
  color: var(--text);
  margin: 0.3rem 0;
  font-weight: 700;
}

.timeline__company {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.timeline__desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}

.timeline__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.timeline__tech {
  background: rgba(56, 189, 248, 0.1);
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .timeline__line {
    left: 1rem;
  }

  .timeline__labels {
    display: none;
  }

  .timeline__row {
    flex-direction: column;
    padding-left: 2.5rem;
  }

  .timeline__cell {
    width: 100%;
    padding: 0;
    margin-bottom: 1rem;
  }

  .timeline__dot {
    left: 1rem;
  }
}
</style>