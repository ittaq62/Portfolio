<template>
  <section class="hero">
    <p ref="greeting" class="hero__greeting">Bonjour, je suis</p>
    <h1 ref="name" class="hero__name">Quentin</h1>
    <p ref="role" class="hero__role">Développeur Full-Stack</p>
    <div ref="cta" class="hero__cta">
      <a href="#contact" class="btn">Me contacter</a>
      <a href="#projets" class="btn btn--outline">Voir mes projets</a>
    </div>
    <div ref="scrollHint" class="hero__scroll-hint">
      <span>Scroll</span>
      <div class="hero__scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const greeting = ref(null)
const name = ref(null)
const role = ref(null)
const cta = ref(null)
const scrollHint = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(greeting.value, { y: 40, opacity: 0, duration: 0.6 })
    .from(name.value, { y: 80, opacity: 0, duration: 1 }, '-=0.3')
    .from(role.value, { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
    .from(cta.value, { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
    .from(scrollHint.value, { opacity: 0, duration: 0.5 })
})
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
}

.hero__greeting {
  font-size: 1.2rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero__name {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin: 0.2em 0;
  color: var(--text);
}

.hero__role {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.hero__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  background: var(--primary);
  color: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
}

.btn--outline {
  background: transparent;
  border: 2px solid var(--accent);
  color: var(--accent);
}

.btn--outline:hover {
  background: var(--accent);
  color: var(--bg);
}

.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.hero__scroll-arrow {
  animation: bounce 1.5s infinite;
  font-size: 1.2rem;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
</style>