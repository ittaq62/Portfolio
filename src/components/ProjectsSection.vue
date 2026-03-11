<template>
  <section id="projets" class="projects">
    <h2 ref="title">Projets</h2>
    <div class="projects__filters" ref="filters">
      <button v-for="cat in categories" :key="cat" class="projects__filter" :class="{ active: activeFilter === cat }" @click="activeFilter = cat">
        {{ cat }}
      </button>
    </div>
    <div class="projects__grid" ref="grid">
      <div class="project-card" v-for="project in filteredProjects" :key="project.title">
        <div class="project-card__icon">{{ project.icon }}</div>
        <h3 class="project-card__title">{{ project.title }}</h3>
        <p class="project-card__desc">{{ project.description }}</p>
        <div class="project-card__techs">
          <span class="project-card__tech" v-for="tech in project.techs" :key="tech">{{ tech }}</span>
        </div>
        <div class="project-card__links">
          <a v-if="project.github" :href="project.github" target="_blank" class="project-card__link">GitHub</a>
          <a v-if="project.demo" :href="project.demo" target="_blank" class="project-card__link project-card__link--demo">Demo</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const title = ref(null)
const filters = ref(null)
const grid = ref(null)
const activeFilter = ref('Tous')

const categories = ['Tous', 'Web', 'Game Dev', 'VR', '3D']

const projects = [
{
    title: 'APPESSAIS',
    description: 'Application PowerApps développée pour EDF permettant aux équipes de suivre l\'avancement des tests de requalification des équipements de la centrale nucléaire de Gravelines. Tableaux de bord Power BI intégrés.',
    techs: ['PowerApps', 'Power Automate', 'Power BI', 'SharePoint'],
    icon: '⚡',
    category: 'Web',
    github: null,
    demo: null
  },
{
    title: 'CS2 Case Tracker',
    description: 'Tracker d\'ouvertures de caisses CS2 avec roue de tirage, statistiques et récupération des prix Steam Market via Google Sheets.',
    techs: ['Vue.js', 'PHP', 'Docker', 'Google Sheets API'],
    icon: '🎮',
    category: 'Web',
    github: 'https://github.com/ittaq62/cs2-toolbox',
    demo: null
  },
  {
    title: 'Application cimetière',
    description: 'Application web déployée sur borne interactive pour la gestion du cimetière de Longuenesse. Développement de l\'interface graphique (projet BTS).',
    techs: ['Vue.js', 'JavaScript', 'HTML', 'CSS'],
    icon: '🌐',
    category: 'Web',
    github: null,
    demo: null
  },
  {
    title: 'Antique War',
    description: 'Jeu RTS en Python/Pygame avec thème égyptien. Architecture ECS, 3 types d\'unités avec IA, pathfinding A*, audio procédural.',
    techs: ['Python', 'Pygame', 'ECS', 'esper'],
    icon: '🏛️',
    category: 'Game Dev',
    github: 'https://github.com/ittaq62/SAE_Jeux_video_IA',
    demo: null
  },
  {
    title: 'BioEchecVR',
    description: 'Puzzle game en réalité virtuelle sous Unreal Engine 5. Menu interactif VR, interactions manettes, mécaniques de portes avec carte d\'accès.',
    techs: ['Unreal Engine 5', 'Blueprint', 'VR', 'C++'],
    icon: '🥽',
    category: 'VR',
    github: null,
    demo: null
  },
  {
    title: 'Ray Tracing Engine',
    description: 'Moteur de ray tracing en C++ : Möller-Trumbore, antialiasing, matériaux diffus et parallélisation OpenMP.',
    techs: ['C++', 'OpenMP', 'Maths 3D'],
    icon: '🔮',
    category: '3D',
    github: 'https://github.com/ittaq62/TP-RayTracing',
    demo: null
  },
  {
    title: 'Modélisation 3D',
    description: 'Créations en Blender : bougies avec textures de cire réalistes, bouteille de champagne, meubles (chaises, tables) avec matériaux bois.',
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

const animateCards = () => {
  nextTick(() => {
    gsap.from('.project-card', {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    })
  })
}

watch(activeFilter, () => {
  animateCards()
})

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

  gsap.from(filters.value, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: filters.value,
      start: 'top 90%'
    }
  })

  gsap.from('.project-card', {
    y: 60,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    scrollTrigger: {
      trigger: grid.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.projects__filters {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.projects__filter {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.projects__filter:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.projects__filter.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--bg-light);
  border: 1px solid rgba(56, 189, 248, 0.1);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(56, 189, 248, 0.3);
}

.project-card__icon {
  font-size: 2rem;
}

.project-card__title {
  font-size: 1.15rem;
  color: var(--text);
  font-weight: 700;
}

.project-card__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex-grow: 1;
}

.project-card__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-card__tech {
  background: rgba(56, 189, 248, 0.1);
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-card__links {
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.project-card__link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  padding: 0.4rem 1rem;
  border: 1px solid var(--accent);
  border-radius: 8px;
  transition: all 0.3s;
}

.project-card__link:hover {
  background: var(--accent);
  color: var(--bg);
}

.project-card__link--demo {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.project-card__link--demo:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

@media (max-width: 768px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>