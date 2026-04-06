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

    <!-- Couche 3 : Skyline monuments (voyages) -->
    <svg class="bg__layer bg__layer--skyline" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <g fill="#0a1320" opacity="0.9">
        <!-- Tour Eiffel (Paris) -->
        <g transform="translate(280, 700)">
          <path d="M0,180 L10,80 L-2,80 L-15,180 Z M10,80 L20,30 L0,30 L-2,80 Z M20,30 L25,0 L15,0 L20,30 Z" />
          <line x1="-15" y1="180" x2="25" y2="180" stroke="#0a1320" stroke-width="3" />
          <line x1="-8" y1="120" x2="18" y2="120" stroke="#0a1320" stroke-width="2" />
        </g>

        <!-- Big Ben (Londres) -->
        <g transform="translate(550, 750)">
          <rect x="0" y="40" width="20" height="90" />
          <rect x="-3" y="20" width="26" height="20" />
          <polygon points="0,20 10,0 20,20" />
          <circle cx="10" cy="55" r="6" fill="#e09b6b" opacity="0.6" />
        </g>

        <!-- Colisee (Rome) -->
        <g transform="translate(750, 770)">
          <ellipse cx="40" cy="50" rx="50" ry="15" />
          <rect x="-5" y="20" width="90" height="40" />
          <g fill="#0b1220">
            <rect x="5" y="25" width="6" height="12" />
            <rect x="18" y="25" width="6" height="12" />
            <rect x="31" y="25" width="6" height="12" />
            <rect x="44" y="25" width="6" height="12" />
            <rect x="57" y="25" width="6" height="12" />
            <rect x="70" y="25" width="6" height="12" />
          </g>
        </g>

        <!-- Parthenon (Athenes) -->
        <g transform="translate(950, 770)">
          <polygon points="0,30 50,5 100,30" />
          <rect x="0" y="30" width="100" height="8" />
          <line x1="10" y1="38" x2="10" y2="80" stroke="#0a1320" stroke-width="6" />
          <line x1="30" y1="38" x2="30" y2="80" stroke="#0a1320" stroke-width="6" />
          <line x1="50" y1="38" x2="50" y2="80" stroke="#0a1320" stroke-width="6" />
          <line x1="70" y1="38" x2="70" y2="80" stroke="#0a1320" stroke-width="6" />
          <line x1="90" y1="38" x2="90" y2="80" stroke="#0a1320" stroke-width="6" />
          <rect x="-5" y="80" width="110" height="8" />
        </g>

        <!-- Brandebourg (Berlin/Allemagne) -->
        <g transform="translate(1150, 780)">
          <rect x="0" y="20" width="80" height="60" />
          <rect x="-5" y="10" width="90" height="12" />
          <line x1="15" y1="22" x2="15" y2="80" stroke="#0b1220" stroke-width="4" />
          <line x1="35" y1="22" x2="35" y2="80" stroke="#0b1220" stroke-width="4" />
          <line x1="55" y1="22" x2="55" y2="80" stroke="#0b1220" stroke-width="4" />
          <line x1="75" y1="22" x2="75" y2="80" stroke="#0b1220" stroke-width="4" />
        </g>

        <!-- Tour de l horloge (Suisse) -->
        <g transform="translate(1320, 800)">
          <polygon points="0,30 15,0 30,30" />
          <rect x="5" y="30" width="20" height="40" />
          <circle cx="15" cy="45" r="5" fill="#e09b6b" opacity="0.6" />
        </g>

        <!-- Tour pisa (Italie) -->
        <g transform="translate(1450, 790)">
          <g transform="rotate(-8)">
            <rect x="0" y="0" width="18" height="60" />
            <line x1="0" y1="15" x2="18" y2="15" stroke="#0b1220" stroke-width="1" />
            <line x1="0" y1="30" x2="18" y2="30" stroke="#0b1220" stroke-width="1" />
            <line x1="0" y1="45" x2="18" y2="45" stroke="#0b1220" stroke-width="1" />
          </g>
        </g>
      </g>
    </svg>

    <!-- Couche 4 : Sapins premier plan -->
    <svg class="bg__layer bg__layer--trees" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <g fill="#060a14">
        <!-- Sapin gauche -->
        <g transform="translate(50, 850)">
          <polygon points="0,0 -25,40 25,40" />
          <polygon points="0,30 -30,80 30,80" />
          <polygon points="0,70 -35,130 35,130" />
          <rect x="-5" y="125" width="10" height="20" />
        </g>
        <!-- Sapin moyen -->
        <g transform="translate(180, 870)">
          <polygon points="0,0 -20,30 20,30" />
          <polygon points="0,25 -25,65 25,65" />
          <polygon points="0,60 -30,110 30,110" />
          <rect x="-4" y="105" width="8" height="15" />
        </g>
        <!-- Sapin droite -->
        <g transform="translate(1850, 880)">
          <polygon points="0,0 -22,35 22,35" />
          <polygon points="0,28 -28,75 28,75" />
          <polygon points="0,65 -33,120 33,120" />
          <rect x="-4" y="115" width="8" height="18" />
        </g>
        <g transform="translate(1750, 900)">
          <polygon points="0,0 -18,28 18,28" />
          <polygon points="0,22 -23,60 23,60" />
          <polygon points="0,55 -28,100 28,100" />
          <rect x="-3" y="95" width="6" height="14" />
        </g>
      </g>
    </svg>

    <!-- Couche 5 : Elements flottants (passions) -->
    <svg class="bg__layer bg__layer--floating" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <!-- Atome EDF -->
      <g class="bg__float bg__float--atom" transform="translate(150, 250)">
        <circle cx="0" cy="0" r="3" fill="#e09b6b" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="#e09b6b" stroke-width="1" opacity="0.6" transform="rotate(-60)" />
      </g>

      <!-- Manette de jeu -->
      <g class="bg__float bg__float--controller" transform="translate(1700, 350)">
        <g fill="none" stroke="#e09b6b" stroke-width="1.5" opacity="0.55">
          <path d="M-25,-5 Q-30,0 -25,8 L-15,12 L15,12 L25,8 Q30,0 25,-5 L15,-8 L-15,-8 Z" />
          <circle cx="-15" cy="0" r="2" fill="#e09b6b" />
          <circle cx="-15" cy="0" r="5" />
          <line x1="-18" y1="0" x2="-12" y2="0" />
          <line x1="-15" y1="-3" x2="-15" y2="3" />
          <circle cx="13" cy="-2" r="1.5" fill="#e09b6b" />
          <circle cx="17" cy="2" r="1.5" fill="#e09b6b" />
        </g>
      </g>

      <!-- Casque audio -->
      <g class="bg__float bg__float--headphones" transform="translate(1400, 200)">
        <g fill="none" stroke="#e09b6b" stroke-width="1.5" opacity="0.5">
          <path d="M-18,5 Q-18,-15 0,-15 Q18,-15 18,5" />
          <rect x="-22" y="3" width="8" height="14" rx="2" fill="#e09b6b" opacity="0.3" />
          <rect x="14" y="3" width="8" height="14" rx="2" fill="#e09b6b" opacity="0.3" />
        </g>
      </g>

      <!-- Notes de musique -->
      <g class="bg__float bg__float--note1" transform="translate(250, 400)">
        <g fill="#e09b6b" opacity="0.5">
          <circle cx="0" cy="8" r="3" />
          <rect x="2.5" y="-8" width="1" height="16" />
          <path d="M3.5,-8 Q10,-6 8,2 Q6,-3 3.5,-2 Z" />
        </g>
      </g>
      <g class="bg__float bg__float--note2" transform="translate(1600, 600)">
        <g fill="#e09b6b" opacity="0.4">
          <circle cx="0" cy="8" r="2.5" />
          <rect x="2" y="-7" width="1" height="15" />
          <path d="M3,-7 Q9,-5 7,2 Q5,-2 3,-1 Z" />
        </g>
      </g>

      <!-- Code brackets -->
      <g class="bg__float bg__float--code" transform="translate(120, 600)">
        <text x="0" y="0" font-family="monospace" font-size="22" fill="#e09b6b" opacity="0.4">{ }</text>
      </g>
      <g class="bg__float bg__float--code2" transform="translate(1750, 750)">
        <text x="0" y="0" font-family="monospace" font-size="18" fill="#e09b6b" opacity="0.35">&lt;/&gt;</text>
      </g>

      <!-- Avion (voyage) -->
      <g class="bg__float bg__float--plane" transform="translate(800, 150)">
        <path d="M0,0 L20,-3 L25,-1 L20,3 L0,0 L-15,-8 L-12,0 L-15,8 Z" fill="#e09b6b" opacity="0.4" />
      </g>

      <!-- Feuille (environnement) -->
      <g class="bg__float bg__float--leaf" transform="translate(450, 750)">
        <path d="M0,0 Q-8,-15 0,-25 Q8,-15 0,0 Z M0,-12 L0,-2" fill="none" stroke="#7cb87c" stroke-width="1.2" opacity="0.5" />
      </g>
    </svg>

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
    { sel: '.bg__float--code', y: 10, dur: 4.5 },
    { sel: '.bg__float--code2', y: 14, dur: 5 },
    { sel: '.bg__float--leaf', y: 8, dur: 4 }
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

  // Avion qui traverse
  const planeLoop = () => {
    gsap.fromTo('.bg__float--plane', {
      x: -200
    }, {
      x: 2200,
      duration: 25,
      ease: 'none',
      onComplete: planeLoop
    })
  }
  planeLoop()

  // Notes qui montent
  gsap.to('.bg__float--note1', {
    y: -30,
    opacity: 0,
    duration: 8,
    repeat: -1,
    ease: 'sine.out'
  })
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
}
</style>
