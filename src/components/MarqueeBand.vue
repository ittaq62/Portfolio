<template>
  <div class="marquee" :class="{ 'marquee--reverse': reverse, 'marquee--accent': accent }">
    <div class="marquee__track" ref="trackRef">
      <div class="marquee__group" v-for="n in 4" :key="n">
        <span class="marquee__item" v-for="(item, i) in items" :key="i">
          {{ item }}
          <span class="marquee__dot">●</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  reverse: {
    type: Boolean,
    default: false
  },
  accent: {
    type: Boolean,
    default: false
  },
  speed: {
    type: Number,
    default: 30
  }
})

const trackRef = ref(null)

let loopTween = null

onMounted(() => {
  if (!trackRef.value) return

  // 4 copies identiques : deplacer d'exactement 25% (= une copie) boucle sans saccade.
  // fromTo garantit que le reset (repeat) retombe sur une position visuellement identique.
  const fromX = props.reverse ? -25 : 0
  const toX = props.reverse ? 0 : -25

  loopTween = gsap.fromTo(
    trackRef.value,
    { xPercent: fromX },
    {
      xPercent: toX,
      duration: props.speed,
      repeat: -1,
      ease: 'none'
    }
  )
})

onUnmounted(() => {
  if (loopTween) loopTween.kill()
})
</script>

<style scoped>
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  border-top: 1px solid rgba(232, 213, 181, 0.08);
  border-bottom: 1px solid rgba(232, 213, 181, 0.08);
  background: var(--bg);
}

.marquee--accent {
  background: linear-gradient(90deg,
    rgba(232, 213, 181, 0.04),
    rgba(212, 168, 83, 0.06),
    rgba(232, 213, 181, 0.04)
  );
}

.marquee__track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.marquee__group {
  display: flex;
  flex-shrink: 0;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 2.5rem;
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  font-style: italic;
  color: var(--text);
  letter-spacing: -0.02em;
  padding: 0 2.5rem;
  white-space: nowrap;
}

.marquee--accent .marquee__item:nth-child(odd) {
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.marquee--accent .marquee__item:nth-child(even) {
  -webkit-text-stroke: 1px var(--accent);
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.marquee__dot {
  font-size: 0.6em;
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .marquee {
    padding: 1.5rem 0;
  }
}
</style>
