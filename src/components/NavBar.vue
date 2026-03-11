<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <a href="#" class="navbar__logo">Q.</a>
    <ul class="navbar__links">
      <li v-for="(link, i) in links" :key="i">
        <a :href="'#' + link.id">{{ link.label }}</a>
      </li>
    </ul>
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
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { id: 'about', label: 'A propos' },
  { id: 'skills', label: 'Competences' },
  { id: 'experience', label: 'Experience' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' }
]

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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
  padding: 1rem 2rem;
  transition: background 0.3s, padding 0.3s;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  padding: 0.6rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar__logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--accent);
}

.navbar__links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.navbar__links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar__links a:hover {
  color: var(--accent);
}

.navbar__socials {
  display: flex;
  gap: 0.8rem;
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

@media (max-width: 640px) {
  .navbar__links {
    display: none;
  }
}
</style>