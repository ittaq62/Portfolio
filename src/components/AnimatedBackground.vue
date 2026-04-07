<template>
  <div class="bg" ref="bgRef">
    <!-- Couche 1 : Ciel etoile gradient -->
    <svg class="bg__layer bg__layer--sky" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="skyGradient" cx="50%" cy="100%" r="120%">
          <stop offset="0%" stop-color="#1a2842" />
          <stop offset="40%" stop-color="#0f1a30" />
          <stop offset="100%" stop-color="#060a14" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(245, 220, 180, 0.4)" />
          <stop offset="50%" stop-color="rgba(245, 220, 180, 0.1)" />
          <stop offset="100%" stop-color="rgba(245, 220, 180, 0)" />
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#skyGradient)" />

      <!-- Lune avec halo -->
      <circle cx="1500" cy="220" r="140" fill="url(#moonGlow)" />
      <circle cx="1500" cy="220" r="55" fill="#f5dcb4" opacity="0.85" />
      <circle cx="1485" cy="200" r="8" fill="#d9c5a0" opacity="0.5" />
      <circle cx="1520" cy="240" r="6" fill="#d9c5a0" opacity="0.5" />
      <circle cx="1510" cy="190" r="4" fill="#d9c5a0" opacity="0.5" />

      <!-- Etoiles aleatoires -->
      <g class="bg__stars">
        <circle v-for="(s, i) in stars" :key="i" :cx="s.x" :cy="s.y" :r="s.r" fill="#ffffff" :opacity="s.o" />
      </g>

      <!-- Etoile filante -->
      <g class="bg__shooting-star" ref="shootingStar">
        <line x1="0" y1="0" x2="80" y2="20" stroke="#f5dcb4" stroke-width="1.5" opacity="0.8" />
        <circle cx="80" cy="20" r="2" fill="#f5dcb4" />
      </g>
    </svg>

    <!-- Couche 2 : Montagnes lointaines (Suisse/Autriche) -->
    <svg class="bg__layer bg__layer--mountains-far" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <path d="M0,750 L150,580 L280,650 L420,500 L560,620 L700,520 L860,640 L1000,540 L1150,650 L1300,560 L1450,680 L1600,580 L1750,660 L1920,580 L1920,1080 L0,1080 Z"
        fill="#0d1828" opacity="0.7" />
      <!-- Neige sur sommets -->
      <path d="M380,520 L420,500 L460,520 L440,545 Z" fill="#e8ecf5" opacity="0.4" />
      <path d="M680,540 L700,520 L720,540 L710,560 Z" fill="#e8ecf5" opacity="0.4" />
      <path d="M980,560 L1000,540 L1020,560 L1010,580 Z" fill="#e8ecf5" opacity="0.4" />
      <path d="M1280,580 L1300,560 L1320,580 L1310,600 Z" fill="#e8ecf5" opacity="0.4" />
    </svg>

    <!-- Couche 3 : Monuments (vraies illustrations) -->
    <div class="bg__layer bg__layer--skyline">
      <img class="bg__monument bg__monument--eiffel" src="https://api.iconify.design/noto/eiffel-tower.svg" alt="" />
      <img class="bg__monument bg__monument--bigben" src="https://api.iconify.design/noto/castle.svg" alt="" />
      <img class="bg__monument bg__monument--colosseum" src="https://api.iconify.design/noto/classical-building.svg" alt="" />
      <img class="bg__monument bg__monument--parthenon" src="https://api.iconify.design/twemoji/classical-building.svg" alt="" />
      <img class="bg__monument bg__monument--statue" src="https://api.iconify.design/noto/statue-of-liberty.svg" alt="" />
      <img class="bg__monument bg__monument--mountfuji" src="https://api.iconify.design/noto/mount-fuji.svg" alt="" />
    </div>

    <!-- Couche 4 : Sapins premier plan (vraies images) -->
    <div class="bg__layer bg__layer--trees">
      <img class="bg__tree bg__tree--1" src="https://api.iconify.design/noto/evergreen-tree.svg" alt="" />
      <img class="bg__tree bg__tree--2" src="https://api.iconify.design/noto/evergreen-tree.svg" alt="" />
      <img class="bg__tree bg__tree--3" src="https://api.iconify.design/noto/evergreen-tree.svg" alt="" />
      <img class="bg__tree bg__tree--4" src="https://api.iconify.design/noto/deciduous-tree.svg" alt="" />
    </div>

    <!-- Couche 5 : Elements flottants (passions - vraies images Noto) -->
    <div class="bg__layer bg__layer--floating">
      <!-- Atome EDF (garde le SVG geometrique car il marche bien) -->
      <svg class="bg__float bg__float--atom" viewBox="-30 -30 60 60">
        <circle cx="0" cy="0" r="3" fill="#e09b6b" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" transform="rotate(-60)" />
      </svg>

      <!-- Manette de jeu -->
      <img class="bg__float bg__float--controller" src="https://api.iconify.design/noto/video-game.svg" alt="" />

      <!-- Casque audio -->
      <img class="bg__float bg__float--headphones" src="https://api.iconify.design/noto/headphone.svg" alt="" />

      <!-- Notes de musique -->
      <img class="bg__float bg__float--note1" src="https://api.iconify.design/noto/musical-note.svg" alt="" />
      <img class="bg__float bg__float--note2" src="https://api.iconify.design/noto/multiple-musical-notes.svg" alt="" />

      <!-- Avion (voyage) -->
      <img class="bg__float bg__float--plane" src="https://api.iconify.design/noto/airplane.svg" alt="" />

      <!-- Feuille (environnement) -->
      <img class="bg__float bg__float--leaf" src="https://api.iconify.design/noto/herb.svg" alt="" />

      <!-- Globe (voyage) -->
      <img class="bg__float bg__float--globe" src="https://api.iconify.design/noto/globe-showing-europe-africa.svg" alt="" />

      <!-- Laptop (dev) -->
      <img class="bg__float bg__float--laptop" src="https://api.iconify.design/noto/laptop.svg" alt="" />
    </div>

    <!-- Brouillard/voile au sol -->
    <div class="bg__fog"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const bgRef = ref(null)
const shootingStar = ref(null)

// Generation aleatoire des etoiles
const stars = Array.from({ length: 80 }, () => ({
  x: Math.random() * 1920,
  y: Math.random() * 600,
  r: Math.random() * 1.5 + 0.3,
  o: Math.random() * 0.6 + 0.2
}))

const mouse = reactive({ x: 0, y: 0 })

const handleMouseMove = (e) => {
  if (!bgRef.value) return
  const rect = bgRef.value.getBoundingClientRect()
  mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

  // Parallax sur les couches
  gsap.to('.bg__layer--sky', { x: mouse.x * 5, y: mouse.y * 3, duration: 1.5, ease: 'power2.out' })
  gsap.to('.bg__layer--mountains-far', { x: mouse.x * 10, y: mouse.y * 5, duration: 1.5, ease: 'power2.out' })
  gsap.to('.bg__layer--skyline', { x: mouse.x * 18, y: mouse.y * 8, duration: 1.5, ease: 'power2.out' })
  gsap.to('.bg__layer--trees', { x: mouse.x * 30, y: mouse.y * 12, duration: 1.5, ease: 'power2.out' })
  gsap.to('.bg__layer--floating', { x: mouse.x * 22, y: mouse.y * 10, duration: 1.5, ease: 'power2.out' })
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)

  // Animation des etoiles (twinkle)
  gsap.to('.bg__stars circle', {
    opacity: 0.1,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    stagger: { each: 0.05, from: 'random' },
    ease: 'sine.inOut'
  })

  // Etoile filante - boucle
  const shootingStarLoop = () => {
    if (!shootingStar.value) return
    gsap.set(shootingStar.value, {
      x: -100,
      y: Math.random() * 200 + 50,
      opacity: 0
    })
    gsap.to(shootingStar.value, {
      x: 2000,
      y: '+=300',
      opacity: 1,
      duration: 1.5,
      ease: 'power2.in',
      onComplete: () => {
        setTimeout(shootingStarLoop, Math.random() * 8000 + 5000)
      }
    })
  }
  setTimeout(shootingStarLoop, 3000)

  // Atome qui tourne
  gsap.to('.bg__float--atom', {
    rotation: 360,
    duration: 25,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center'
  })

  // Elements flottants - animation continue
  const floats = [
    { sel: '.bg__float--controller', y: 15, dur: 5 },
    { sel: '.bg__float--headphones', y: 12, dur: 4 },
    { sel: '.bg__float--note1', y: 20, dur: 6 },
    { sel: '.bg__float--note2', y: 18, dur: 5.5 },
    { sel: '.bg__float--leaf', y: 8, dur: 4 },
    { sel: '.bg__float--globe', y: 10, dur: 6.5 },
    { sel: '.bg__float--laptop', y: 12, dur: 5 }
  ]

  floats.forEach(({ sel, y, dur }) => {
    gsap.to(sel, {
      y: `+=${y}`,
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  })

  // Globe qui tourne legerement
  gsap.to('.bg__float--globe', {
    rotation: 15,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: 'center'
  })

  // Avion qui traverse
  const planeLoop = () => {
    gsap.fromTo('.bg__float--plane', {
      x: -200
    }, {
      x: 2200,
      duration: 30,
      ease: 'none',
      onComplete: planeLoop
    })
  }
  planeLoop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.bg__layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.bg__layer--sky {
  z-index: 1;
}

.bg__layer--mountains-far {
  z-index: 2;
}

.bg__layer--skyline {
  z-index: 3;
}

.bg__layer--trees {
  z-index: 5;
}

.bg__layer--floating {
  z-index: 4;
}

.bg__shooting-star {
  opacity: 0;
}

.bg__fog {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, var(--bg) 0%, rgba(11, 18, 32, 0.6) 30%, transparent 100%);
  z-index: 6;
  pointer-events: none;
}

.bg__float {
  will-change: transform;
  position: absolute;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

/* Positions des elements flottants */
.bg__float--atom {
  top: 23%;
  left: 8%;
  width: 60px;
  height: 60px;
  opacity: 0.7;
}

.bg__float--controller {
  top: 30%;
  right: 8%;
  width: 70px;
  height: 70px;
  opacity: 0.85;
}

.bg__float--headphones {
  top: 8%;
  right: 32%;
  width: 65px;
  height: 65px;
  opacity: 0.8;
}

.bg__float--note1 {
  top: 38%;
  left: 12%;
  width: 45px;
  height: 45px;
  opacity: 0.75;
}

.bg__float--note2 {
  top: 55%;
  right: 18%;
  width: 50px;
  height: 50px;
  opacity: 0.75;
}

.bg__float--plane {
  top: 14%;
  left: 0;
  width: 80px;
  height: 80px;
  opacity: 0.85;
}

.bg__float--leaf {
  bottom: 28%;
  left: 22%;
  width: 50px;
  height: 50px;
  opacity: 0.7;
}

.bg__float--globe {
  top: 60%;
  left: 6%;
  width: 70px;
  height: 70px;
  opacity: 0.7;
}

.bg__float--laptop {
  bottom: 25%;
  right: 10%;
  width: 65px;
  height: 65px;
  opacity: 0.75;
}

/* Monuments */
.bg__monument {
  position: absolute;
  filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.5));
  opacity: 0.85;
}

.bg__monument--eiffel {
  bottom: 12%;
  left: 14%;
  width: 90px;
  height: 90px;
}

.bg__monument--bigben {
  bottom: 13%;
  left: 28%;
  width: 75px;
  height: 75px;
}

.bg__monument--colosseum {
  bottom: 10%;
  left: 42%;
  width: 95px;
  height: 95px;
}

.bg__monument--parthenon {
  bottom: 12%;
  left: 58%;
  width: 85px;
  height: 85px;
}

.bg__monument--statue {
  bottom: 15%;
  left: 72%;
  width: 80px;
  height: 80px;
}

.bg__monument--mountfuji {
  bottom: 11%;
  right: 8%;
  width: 100px;
  height: 100px;
}

/* Sapins */
.bg__tree {
  position: absolute;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.6));
}

.bg__tree--1 {
  bottom: 4%;
  left: 2%;
  width: 110px;
  height: 110px;
}

.bg__tree--2 {
  bottom: 6%;
  left: 8%;
  width: 80px;
  height: 80px;
}

.bg__tree--3 {
  bottom: 4%;
  right: 3%;
  width: 100px;
  height: 100px;
}

.bg__tree--4 {
  bottom: 7%;
  right: 10%;
  width: 75px;
  height: 75px;
}

@media (max-width: 768px) {
  .bg__monument,
  .bg__float--leaf,
  .bg__float--globe,
  .bg__float--laptop,
  .bg__float--note2 {
    display: none;
  }

  .bg__float {
    width: 40px !important;
    height: 40px !important;
  }

  .bg__tree {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
