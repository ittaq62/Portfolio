<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <a href="#" class="navbar__logo" @click="closeMenu">Q.</a>

    <!-- Liens desktop -->
    <ul class="navbar__links">
      <li v-for="(link, i) in links" :key="i">
        <a :href="'#' + link.id">{{ link.label }}</a>
      </li>
    </ul>

    <!-- Socials desktop -->
    <div class="navbar__socials">
      <a href="https://github.com/ittaq62" target="_blank" class="navbar__social" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a href="https://www.linkedin.com/in/quentin-douilly-259b20354/" target="_blank" class="navbar__social" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
    </div>

    <!-- Burger (mobile) -->
    <button
      class="navbar__burger"
      :class="{ open: isMenuOpen }"
      @click="toggleMenu"
      aria-label="Menu"
      :aria-expanded="isMenuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Overlay menu mobile -->
    <div class="navbar__mobile" :class="{ open: isMenuOpen }">
      <ul class="navbar__mobile-links">
        <li
          v-for="(link, i) in links"
          :key="i"
          :style="{ transitionDelay: isMenuOpen ? (0.06 * i + 0.15) + 's' : '0s' }"
        >
          <a :href="'#' + link.id" @click="closeMenu">
            <span class="navbar__mobile-index">0{{ i + 1 }}</span>
            {{ link.label }}
          </a>
        </li>
      </ul>
      <div class="navbar__mobile-socials">
        <a href="https://github.com/ittaq62" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/quentin-douilly-259b20354/" target="_blank">LinkedIn</a>
        <a href="mailto:quentindouilly1@gmail.com">Email</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const links = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projets', label: 'Projets' },
  { id: 'cv', label: 'CV' },
  { id: 'contact', label: 'Contact' }
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Bloque le scroll du body quand le menu est ouvert
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(16px);
  padding: 0.7rem 2.5rem;
  box-shadow: 0 1px 0 rgba(232, 213, 181, 0.1);
}

.navbar__logo {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent);
  transition: opacity 0.3s;
  z-index: 102;
}

.navbar__logo:hover {
  opacity: 0.7;
}

.navbar__links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.navbar__links a {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}

.navbar__links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.navbar__links a:hover {
  color: var(--text);
}

.navbar__links a:hover::after {
  width: 100%;
}

.navbar__socials {
  display: flex;
  gap: 1rem;
}

.navbar__social {
  color: var(--text-muted);
  transition: color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
}

.navbar__social:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

/* Burger */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 102;
  padding: 0;
}

.navbar__burger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s;
}

.navbar__burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__burger.open span:nth-child(2) {
  opacity: 0;
}

.navbar__burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Menu mobile overlay */
.navbar__mobile {
  position: fixed;
  inset: 0;
  z-index: 101;
  background: rgba(8, 12, 20, 0.98);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  /* fermeture : on cache la visibilite APRES le fondu (delai 0.4s) */
  transition: opacity 0.4s ease, visibility 0s linear 0.4s;
}

.navbar__mobile.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  /* ouverture : visible immediatement */
  transition: opacity 0.4s ease, visibility 0s linear 0s;
}

.navbar__mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.navbar__mobile-links li {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.navbar__mobile.open .navbar__mobile-links li {
  opacity: 1;
  transform: translateY(0);
}

.navbar__mobile-links a {
  display: inline-flex;
  align-items: baseline;
  gap: 0.8rem;
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  transition: color 0.3s;
}

.navbar__mobile-links a:hover {
  color: var(--accent);
}

.navbar__mobile-index {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.navbar__mobile-socials {
  display: flex;
  gap: 1.5rem;
}

.navbar__mobile-socials a {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.3s;
}

.navbar__mobile-socials a:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .navbar__links,
  .navbar__socials {
    display: none;
  }

  .navbar__burger {
    display: flex;
  }
}
</style>
