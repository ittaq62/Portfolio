import { onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })

  const fadeInUp = (selector, options = {}) => {
    gsap.from(selector, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...options
      }
    })
  }

  return { fadeInUp, gsap, ScrollTrigger }
}