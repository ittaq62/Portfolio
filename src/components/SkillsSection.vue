<template>
  <section id="skills" class="skills">
    <h2 ref="title">Compétences</h2>
    <div class="skills__grid">
      <div ref="barsEl" class="skills__bars">
        <div class="skill-bar" v-for="skill in techSkills" :key="skill.name">
          <div class="skill-bar__header">
            <span class="skill-bar__name">{{ skill.name }}</span>
            <span class="skill-bar__level">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar__track">
            <div class="skill-bar__fill" :data-level="skill.level"></div>
          </div>
        </div>
      </div>
      <div ref="tagsEl" class="skills__tags">
        <h3>Outils et Technologies</h3>
        <div class="skills__tag-list">
          <span class="tag" v-for="tag in tools" :key="tag">{{ tag }}</span>
        </div>
        <h3>Langues</h3>
        <div class="skills__tag-list">
          <span class="tag tag--lang" v-for="tag in langues" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const title = ref(null)
const barsEl = ref(null)
const tagsEl = ref(null)

const techSkills = [
  { name: 'HTML / CSS / JavaScript', level: 90 },
  { name: 'Vue.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'C / C++', level: 70 },
  { name: 'Java', level: 70 },
  { name: 'PHP / Symfony', level: 65 },
  { name: 'SQL (MySQL, PostgreSQL, MariaDB)', level: 80 },
  { name: 'PowerApps / Power Automate', level: 90 },
  { name: 'Flutter', level: 55 }
]

const tools = [
  'Git / GitHub', 'VS Code', 'Power BI', 'SharePoint',
  'Suite Microsoft 365', 'MongoDB', 'AngularJS',
  'Docker', 'Blender', 'Unreal Engine 5'
]

const langues = [
  'Français : Natif',
  'Anglais : B2',
  'Allemand : A2'
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

  gsap.utils.toArray('.skill-bar').forEach((bar, i) => {
    const fill = bar.querySelector('.skill-bar__fill')
    gsap.from(bar, {
      x: -40,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%'
      }
    })
    gsap.to(fill, {
      width: fill.dataset.level + '%',
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%'
      }
    })
  })

  gsap.from('.tag', {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: tagsEl.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.skills__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.skill-bar {
  margin-bottom: 1.2rem;
}

.skill-bar__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.skill-bar__name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
}

.skill-bar__level {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
}

.skill-bar__track {
  height: 10px;
  background: var(--bg-light);
  border-radius: 10px;
  overflow: hidden;
}

.skill-bar__fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 10px;
  transition: none;
}

.skills__tags h3 {
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 0.8rem;
  margin-top: 1.5rem;
}

.skills__tags h3:first-child {
  margin-top: 0;
}

.skills__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--bg-light);
  color: var(--accent);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.tag--lang {
  color: var(--text);
  border-color: rgba(148, 163, 184, 0.2);
}

@media (max-width: 768px) {
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>