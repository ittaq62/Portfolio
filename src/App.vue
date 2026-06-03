<template>
  <div id="app">
    <CustomCursor />
    <ScrollProgress />
    <NavBar />
    <HeroSection />

    <AboutSection />

    <MarqueeBand
      :items="['DÉVELOPPEUR POLYVALENT', 'CRÉATIF', 'CURIEUX', 'PASSIONNÉ', 'AUTODIDACTE']"
      accent
    />

    <SkillsSection />

    <MarqueeBand
      :items="['VUE.JS', 'JAVA', 'PYTHON', 'POWERAPPS', 'DOCKER', 'C++']"
      reverse
      :speed="35"
    />

    <ExperienceSection />

    <MarqueeBand
      :items="['EDF GRAVELINES', 'IUT CALAIS', 'BTS BLAISE PASCAL', 'ALTERNANCE']"
      accent
      :speed="40"
    />

    <ProjectsSection />

    <MarqueeBand
      :items="['UN PROJET EN TÊTE ?', 'ÉCHANGEONS', 'TRAVAILLONS ENSEMBLE']"
      :speed="28"
    />

    <ContactSection />

    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import MarqueeBand from './components/MarqueeBand.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null

onMounted(() => {
  // Smooth scroll Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
  })

  // Sync Lenis avec ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // ScrollTrigger refresh apres montage
  ScrollTrigger.refresh()

  // Smooth scroll vers les ancres avec Lenis
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (href && href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target, { offset: 0, duration: 1.5 })
        }
      }
    })
  })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (lenis) lenis.destroy()
})
</script>
