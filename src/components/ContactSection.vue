<template>
  <section id="contact" class="contact" ref="sectionRef">
    <!-- Header -->
    <div class="contact__header" ref="headerRef">
      <span class="contact__label">Contact</span>
      <h2 class="contact__title">
        <span class="contact__title-line" ref="titleLine1">PARLONS</span>
        <span class="contact__title-line contact__title-line--accent" ref="titleLine2">PROJET</span>
      </h2>
      <p class="contact__subtitle" ref="subtitleRef">
        Une opportunité d'alternance, un projet en tête, ou juste envie d'échanger ?
      </p>
    </div>

    <!-- CTA Email Geant -->
    <a href="mailto:quentindouilly1@gmail.com" class="contact__cta" ref="ctaRef">
      <span class="contact__cta-label">Ecrivez-moi a</span>
      <span class="contact__cta-email">
        <span class="contact__cta-email-text">quentindouilly1@gmail.com</span>
        <svg class="contact__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </span>
    </a>

    <div class="contact__content">
      <!-- Cards -->
      <div class="contact__cards" ref="cardsRef">
        <a
          v-for="(item, i) in contactItems"
          :key="item.label"
          :href="item.link"
          :target="item.external ? '_blank' : null"
          class="contact__card"
          :ref="el => cardRefs[i] = el"
        >
          <span class="contact__card-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="contact__card-icon" v-html="item.icon"></span>
          <div class="contact__card-content">
            <span class="contact__card-label">{{ item.label }}</span>
            <span class="contact__card-value">{{ item.value }}</span>
          </div>
          <svg class="contact__card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Form -->
      <form class="contact__form" ref="formEl" @submit.prevent="handleSubmit">
        <div class="contact__form-header">
          <span class="contact__form-label">Ou directement</span>
          <h3 class="contact__form-title">Envoyez un message</h3>
        </div>

        <div class="form__group" :class="{ 'form__group--filled': form.name }">
          <input type="text" id="name" v-model="form.name" required />
          <label for="name">Votre nom</label>
        </div>

        <div class="form__group" :class="{ 'form__group--filled': form.email }">
          <input type="email" id="email" v-model="form.email" required />
          <label for="email">Votre email</label>
        </div>

        <div class="form__group" :class="{ 'form__group--filled': form.message }">
          <textarea id="message" v-model="form.message" rows="4" required></textarea>
          <label for="message">Votre message</label>
        </div>

        <button type="submit" class="form__submit" :class="{ sent: isSent }">
          <span class="form__submit-text">{{ isSent ? 'Message envoye !' : 'Envoyer' }}</span>
          <svg class="form__submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path :d="isSent ? 'M20 6L9 17l-5-5' : 'M5 12h14M12 5l7 7-7 7'"/>
          </svg>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const sectionRef = ref(null)
const headerRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const subtitleRef = ref(null)
const ctaRef = ref(null)
const cardsRef = ref(null)
const cardRefs = ref([])
const formEl = ref(null)
const isSent = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const contactItems = [
  {
    label: 'LinkedIn',
    value: 'Quentin Douilly',
    link: 'https://www.linkedin.com/in/quentin-douilly-259b20354/',
    external: true,
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
  },
  {
    label: 'GitHub',
    value: 'github.com/ittaq62',
    link: 'https://github.com/ittaq62',
    external: true,
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
  },
  {
    label: 'Telephone',
    value: '07.83.98.91.57',
    link: 'tel:0783989157',
    external: false,
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
  },
  {
    label: 'Localisation',
    value: 'Polincove, Hauts-de-France',
    link: '#',
    external: false,
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  }
]

const handleSubmit = () => {
  isSent.value = true
  setTimeout(() => {
    isSent.value = false
    form.value = { name: '', email: '', message: '' }
  }, 3000)
}

onMounted(() => {
  // Title reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%'
    }
  })

  tl.fromTo(titleLine1.value, {
    clipPath: 'inset(0 100% 0 0)',
    y: 30
  }, {
    clipPath: 'inset(0 0% 0 0)',
    y: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .fromTo(titleLine2.value, {
    clipPath: 'inset(0 0 0 100%)',
    y: 30
  }, {
    clipPath: 'inset(0 0 0 0%)',
    y: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.7')
  .from(subtitleRef.value, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')

  // CTA email reveal
  gsap.from(ctaRef.value, {
    scaleX: 0.9,
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power4.out',
    transformOrigin: 'left center',
    scrollTrigger: {
      trigger: ctaRef.value,
      start: 'top 85%'
    }
  })

  // Cards stagger
  gsap.from('.contact__card', {
    x: -50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cardsRef.value,
      start: 'top 85%'
    }
  })

  // Form
  gsap.from(formEl.value.children, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: formEl.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.contact {
  position: relative;
  padding: 6rem 4rem;
  min-height: 100vh;
  max-width: none;
  margin: 0;
}

/* Header */
.contact__header {
  margin-bottom: 3rem;
}

.contact__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.contact__title {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 1.05;
  margin: 0 0 1.2rem;
  display: flex;
  align-items: baseline;
  gap: 0.4em;
  flex-wrap: wrap;
  padding-right: 0.3em;
}

.contact__title-line {
  display: inline-block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
  padding: 0.05em 0.1em 0.05em 0;
  will-change: clip-path;
}

.contact__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact__subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  color: var(--text-muted);
  max-width: 600px;
}

/* CTA Email Geant */
.contact__cta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2.5rem 0;
  margin-bottom: 4rem;
  text-decoration: none;
  border-top: 1px solid rgba(232, 213, 181, 0.1);
  border-bottom: 1px solid rgba(232, 213, 181, 0.1);
  transition: padding 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.contact__cta:hover {
  padding-left: 1rem;
}

.contact__cta-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact__cta-email {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 4.5vw, 4rem);
  font-weight: 700;
  font-style: italic;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1;
}

.contact__cta-email-text {
  background: linear-gradient(90deg, var(--text) 50%, var(--accent) 50%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background-position 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.contact__cta:hover .contact__cta-email-text {
  background-position: -100% 0%;
}

.contact__cta-arrow {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--accent);
  flex-shrink: 0;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.contact__cta:hover .contact__cta-arrow {
  transform: rotate(45deg) scale(1.15);
}

/* Content layout */
.contact__content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

/* Cards */
.contact__cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.06);
  border-radius: 14px;
  padding: 1.3rem 1.5rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}

.contact__card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(232, 213, 181, 0.06), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.contact__card:hover {
  transform: translateX(8px);
  border-color: rgba(232, 213, 181, 0.2);
}

.contact__card:hover::before {
  transform: translateX(0);
}

.contact__card-index {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: rgba(232, 213, 181, 0.4);
  letter-spacing: 0.05em;
}

.contact__card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: var(--accent);
  flex-shrink: 0;
}

.contact__card-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-grow: 1;
}

.contact__card-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
}

.contact__card-value {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--text);
  font-weight: 500;
}

.contact__card-arrow {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--text-muted);
  transition: transform 0.4s, color 0.3s;
}

.contact__card:hover .contact__card-arrow {
  transform: translateX(6px);
  color: var(--accent);
}

/* Form */
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
}

.contact__form-header {
  margin-bottom: 0.5rem;
}

.contact__form-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.4rem;
}

.contact__form-title {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.01em;
}

/* Floating label form group */
.form__group {
  position: relative;
}

.form__group input,
.form__group textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(232, 213, 181, 0.15);
  padding: 1.2rem 0 0.6rem;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
  resize: none;
}

.form__group textarea {
  min-height: 100px;
}

.form__group label {
  position: absolute;
  top: 1.2rem;
  left: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text-muted);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.form__group input:focus,
.form__group textarea:focus,
.form__group--filled input,
.form__group--filled textarea {
  border-bottom-color: var(--accent);
}

.form__group input:focus + label,
.form__group textarea:focus + label,
.form__group--filled label {
  top: 0;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

/* Submit */
.form__submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 1rem 1.8rem;
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  align-self: flex-start;
  margin-top: 0.5rem;
  overflow: hidden;
}

.form__submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.form__submit:hover::before {
  transform: translateX(100%);
}

.form__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(232, 213, 181, 0.25);
}

.form__submit-arrow {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}

.form__submit:hover .form__submit-arrow {
  transform: translateX(4px);
}

.form__submit.sent {
  background: #2dba6e;
  color: white;
}

/* Responsive */
@media (max-width: 968px) {
  .contact__content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 1.5rem;
  }

  .contact__form {
    padding: 1.8rem;
  }

  .contact__cta-arrow {
    width: 1.8rem;
    height: 1.8rem;
  }
}
</style>
