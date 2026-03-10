<template>
  <section id="about" class="about">
    <h2 ref="title">À propos</h2>
    <div class="about__content">
      <div ref="text" class="about__text">
        <p>
          Développeur de 22 ans en 3ème année de BUT Informatique à l'IUT de Calais,
          parcours Conception et Développement d'Applications. En alternance chez EDF
          au CNPE de Gravelines, je crée des outils numériques pour simplifier le
          travail des équipes.
        </p>
        <p>
          Je m'intéresse à tout ce qui touche au code, du web à la VR
          en passant par le game dev.
        </p>
      </div>
      <div ref="infosEl" class="about__infos">
        <div class="about__info" v-for="info in infos" :key="info.label">
          <span class="about__info-label">{{ info.label }}</span>
          <span class="about__info-value">{{ info.value }}</span>
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
const text = ref(null)
const infosEl = ref(null)

const infos = [
  { label: 'Formation', value: 'BUT Informatique 3ème année, IUT de Calais' },
  { label: 'Parcours', value: 'Conception et Développement d\'Applications' },
  { label: 'Alternance', value: 'EDF, CNPE de Gravelines' },
  { label: 'Diplômes', value: 'BTS SN option IR, Bac général' },
  { label: 'Candidature', value: 'IMT Nord Europe, cycle ingénieur' },
  { label: 'Localisation', value: 'Polincove, Hauts-de-France' }
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

  gsap.from(text.value, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: text.value,
      start: 'top 80%'
    }
  })

  gsap.from('.about__info', {
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    scrollTrigger: {
      trigger: infosEl.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about__content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about__text p {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.about__infos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about__info {
  background: var(--bg-light);
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border-left: 3px solid var(--accent);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.about__info-label {
  font-size: 0.8rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about__info-value {
  font-size: 1rem;
  color: var(--text);
  font-weight: 500;
}

@media (max-width: 768px) {
  .about__content {
    grid-template-columns: 1fr;
  }
}
</style>