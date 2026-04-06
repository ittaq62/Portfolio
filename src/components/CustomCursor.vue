<template>
  <div class="cursor" ref="cursorRef" :class="{ 'cursor--hover': isHovering, 'cursor--click': isClicking }">
    <svg class="cursor__svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Bracket gauche -->
      <path
        ref="leftBracket"
        class="cursor__bracket cursor__bracket--left"
        d="M14 8 L6 20 L14 32"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Bracket droit -->
      <path
        ref="rightBracket"
        class="cursor__bracket cursor__bracket--right"
        d="M26 8 L34 20 L26 32"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Slash central -->
      <line
        ref="slash"
        class="cursor__slash"
        x1="23"
        y1="10"
        x2="17"
        y2="30"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      <!-- Point central -->
      <circle
        ref="dot"
        class="cursor__dot"
        cx="20"
        cy="20"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const cursorRef = ref(null)
const leftBracket = ref(null)
const rightBracket = ref(null)
const slash = ref(null)
const dot = ref(null)
const isHovering = ref(false)
const isClicking = ref(false)

const mouse = { x: 0, y: 0 }
const cursor = { x: 0, y: 0 }

const handleMouseMove = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const handleMouseDown = () => { isClicking.value = true }
const handleMouseUp = () => { isClicking.value = false }

const checkHoverable = (e) => {
  const target = e.target
  const isInteractive = target.closest('a, button, [role="button"], .hero__hotspot, .skills__item, .experience__card, [data-cursor-hover]')
  isHovering.value = !!isInteractive
}

let rafId = null
const animate = () => {
  // Smooth follow
  cursor.x += (mouse.x - cursor.x) * 0.2
  cursor.y += (mouse.y - cursor.y) * 0.2

  if (cursorRef.value) {
    gsap.set(cursorRef.value, {
      x: cursor.x,
      y: cursor.y
    })
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  // Hide default cursor
  document.documentElement.style.cursor = 'none'

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousemove', checkHoverable)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    if (cursorRef.value) gsap.to(cursorRef.value, { opacity: 0, duration: 0.2 })
  })
  document.addEventListener('mouseenter', () => {
    if (cursorRef.value) gsap.to(cursorRef.value, { opacity: 1, duration: 0.2 })
  })

  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousemove', checkHoverable)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  document.documentElement.style.cursor = 'auto'
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  pointer-events: none;
  z-index: 10000;
  color: var(--accent);
  mix-blend-mode: difference;
  transition: color 0.3s ease;
}

.cursor__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.cursor__bracket {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              stroke 0.3s ease,
              stroke-width 0.3s ease;
  transform-origin: center;
}

.cursor__bracket--left {
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

.cursor__bracket--right {
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

.cursor__slash {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor__dot {
  transition: r 0.3s ease, opacity 0.3s ease;
}

/* Hover state - brackets se separent et grossissent */
.cursor--hover .cursor__svg {
  animation: cursorPulse 1.5s ease-in-out infinite;
}

.cursor--hover .cursor__bracket--left {
  transform: translateX(-4px) scale(1.2);
  stroke-width: 3;
}

.cursor--hover .cursor__bracket--right {
  transform: translateX(4px) scale(1.2);
  stroke-width: 3;
}

.cursor--hover .cursor__slash {
  opacity: 1;
}

.cursor--hover .cursor__dot {
  opacity: 0;
}

@keyframes cursorPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Click state - se contracte */
.cursor--click .cursor__bracket--left {
  transform: translateX(2px) scale(0.85);
}

.cursor--click .cursor__bracket--right {
  transform: translateX(-2px) scale(0.85);
}

/* Hide on touch devices */
@media (hover: none), (pointer: coarse) {
  .cursor {
    display: none;
  }
}
</style>
