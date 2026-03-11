import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import Lenis from 'lenis'

const app = createApp(App)
app.mount('#app')

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)