<template>
  <div class="loader" ref="loaderRef" v-show="!done">
    <div class="loader__inner">
      <div class="loader__mark">Q.</div>
      <div class="loader__name">QUENTIN DOUILLY</div>
      <div class="loader__bar">
        <div class="loader__bar-fill" ref="barRef"></div>
      </div>
      <div class="loader__count">
        <span ref="countRef">0</span><span class="loader__percent">%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const loaderRef = ref(null)
const barRef = ref(null)
const countRef = ref(null)
const done = ref(false)

// Signale au reste du site (hero) que le chargement est termine.
// Via window : robuste, independant de la reactivite Vue.
const signalLoaded = () => {
  if (window.__appLoaded) return
  window.__appLoaded = true
  window.dispatchEvent(new Event('app:loaded'))
}

onMounted(() => {
  // Respecte la preference reduced-motion : pas d'intro
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    done.value = true
    signalLoaded()
    return
  }

  // Bloque le scroll pendant le chargement
  document.body.style.overflow = 'hidden'
  window.scrollTo(0, 0)

  // Filet de securite : devoile le site meme si l'animation est interrompue
  // (ex : onglet ouvert en arriere-plan ou rAF mis en pause)
  const safety = setTimeout(() => {
    if (!done.value) {
      done.value = true
      signalLoaded()
      document.body.style.overflow = ''
    }
  }, 5000)

  // Intro : apparition du contenu du loader
  gsap.from('.loader__inner > *', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out'
  })

  // Compteur 0 -> 100
  const counter = { val: 0 }
  gsap.to(counter, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    delay: 0.3,
    onUpdate: () => {
      if (countRef.value) countRef.value.textContent = Math.round(counter.val)
      if (barRef.value) barRef.value.style.width = counter.val + '%'
    },
    onComplete: () => {
      // Chargement termine : on declenche l'intro du hero
      signalLoaded()
      // Reveal : le loader remonte pour devoiler le site
      gsap.to(loaderRef.value, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.25,
        onComplete: () => {
          done.value = true
          document.body.style.overflow = ''
        }
      })
    }
  })
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg, #0b1220);
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: min(420px, 80vw);
}

.loader__mark {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}

.loader__name {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.loader__bar {
  width: 100%;
  height: 2px;
  background: rgba(232, 213, 181, 0.12);
  border-radius: 2px;
  overflow: hidden;
}

.loader__bar-fill {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #d4a853);
}

.loader__count {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text);
}

.loader__percent {
  color: var(--accent);
  margin-left: 0.1em;
}
</style>
