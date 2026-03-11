<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__left">
        <span class="footer__logo">Q.</span>
        <p class="footer__copy">&copy; {{ year }} Quentin Douilly. Tous droits réservés.</p>
      </div>
      <div class="footer__links">
        <a href="https://github.com/ittaq62" target="_blank">GitHub</a>
        <a href="mailto:quentindouilly1@gmail.com">Email</a>
      </div>
      <button class="footer__top" @click="scrollToTop">↑ Haut de page</button>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--bg-light);
  padding: 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(56, 189, 248, 0.1);
}

.footer__content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--accent);
}

.footer__copy {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer__links a:hover {
  color: var(--accent);
}

.footer__top {
  background: none;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.footer__top:hover {
  background: var(--accent);
  color: var(--bg);
}

@media (max-width: 640px) {
  .footer__content {
    flex-direction: column;
    text-align: center;
  }

  .footer__left {
    flex-direction: column;
  }
}
</style>