<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <a href="#" class="navbar__logo">Q.</a>
    <ul class="navbar__links">
      <li v-for="(link, i) in links" :key="i">
        <a :href="'#' + link.id">{{ link.label }}</a>
      </li>
    </ul>
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

@media (max-width: 640px) {
  .navbar__links {
    display: none;
  }
}
</style>