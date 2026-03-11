<template>
  <section id="contact" class="contact">
    <h2 ref="title">Contact</h2>
    <p ref="subtitle" class="contact__subtitle">
      Un projet en tête ? Une opportunité ? N'hésitez pas à me contacter !
    </p>
    <div class="contact__content">
      <div ref="infoEl" class="contact__info">
        <a href="mailto:quentindouilly1@gmail.com" class="contact__item">
          <span class="contact__icon">📧</span>
          <div>
            <span class="contact__label">Email</span>
            <span class="contact__value">quentindouilly1@gmail.com</span>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/quentin-douilly-259b20354/" target="_blank" class="contact__item">
          <span class="contact__icon">💼</span>
          <div>
            <span class="contact__label">LinkedIn</span>
            <span class="contact__value">Quentin Douilly</span>
          </div>
        </a>
        <a href="https://github.com/ittaq62" target="_blank" class="contact__item">
          <span class="contact__icon">🐙</span>
          <div>
            <span class="contact__label">GitHub</span>
            <span class="contact__value">github.com/ittaq62</span>
          </div>
        </a>
        <a href="tel:0783989157" class="contact__item">
          <span class="contact__icon">📱</span>
          <div>
            <span class="contact__label">Téléphone</span>
            <span class="contact__value">07.83.98.91.57</span>
          </div>
        </a>
        <div class="contact__item">
          <span class="contact__icon">📍</span>
          <div>
            <span class="contact__label">Localisation</span>
            <span class="contact__value">Polincove, Hauts-de-France</span>
          </div>
        </div>
      </div>
      <form ref="formEl" class="contact__form" @submit.prevent="handleSubmit">
        <div class="form__group">
          <label for="name">Nom</label>
          <input type="text" id="name" v-model="form.name" placeholder="Votre nom" required />
        </div>
        <div class="form__group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="votre@email.com" required />
        </div>
        <div class="form__group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" placeholder="Votre message..." rows="5" required></textarea>
        </div>
        <button type="submit" class="form__submit" :class="{ sent: isSent }">
          {{ isSent ? '✓ Envoyé !' : 'Envoyer' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { gsap } = useScrollAnimation()

const title = ref(null)
const subtitle = ref(null)
const infoEl = ref(null)
const formEl = ref(null)
const isSent = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  isSent.value = true
  setTimeout(() => {
    isSent.value = false
    form.value = { name: '', email: '', message: '' }
  }, 3000)
}

onMounted(() => {
  gsap.from(title.value, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: title.value,
      start: 'top 85%'
    }
  })

  gsap.from(subtitle.value, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: subtitle.value,
      start: 'top 85%'
    }
  })

  gsap.from('.contact__item', {
    x: -40,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    scrollTrigger: {
      trigger: infoEl.value,
      start: 'top 85%'
    }
  })

  gsap.from(formEl.value, {
    x: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: formEl.value,
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact__subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.contact__content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-light);
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
  transition: transform 0.3s, border-color 0.3s;
  text-decoration: none;
}

.contact__item:hover {
  transform: translateX(8px);
  border-color: var(--accent);
}

.contact__icon {
  font-size: 1.5rem;
}

.contact__label {
  display: block;
  font-size: 0.8rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.contact__value {
  display: block;
  font-size: 0.95rem;
  color: var(--text);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form__group label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.form__group input,
.form__group textarea {
  background: var(--bg-light);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
  resize: vertical;
}

.form__group input:focus,
.form__group textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
}

.form__submit {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  align-self: flex-start;
}

.form__submit:hover {
  background: var(--accent);
  color: var(--bg);
  transform: translateY(-2px);
}

.form__submit.sent {
  background: #22c55e;
  color: white;
}

@media (max-width: 768px) {
  .contact__content {
    grid-template-columns: 1fr;
  }
}
</style>