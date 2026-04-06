<template>
  <section id="skills" class="skills" ref="sectionRef">
    <!-- Header -->
    <div class="skills__header" ref="headerRef">
      <span class="skills__label">Compétences</span>
      <h2 class="skills__title">
        <span class="skills__title-line" ref="titleLine1">MES</span>
        <span class="skills__title-line skills__title-line--accent" ref="titleLine2">COMPÉTENCES</span>
      </h2>
    </div>

    <!-- Grid de skills -->
    <div class="skills__grid" ref="gridRef">
      <div
        v-for="(skill, i) in skills"
        :key="skill.name"
        class="skills__item"
        :ref="el => itemRefs[i] = el"
        @mouseenter="activeSkill = i"
        @mouseleave="activeSkill = null"
      >
        <div class="skills__item-inner" :class="{ 'skills__item-inner--active': activeSkill === i }">
          <!-- Icône -->
          <div class="skills__icon-wrap">
            <span class="skills__icon" v-html="skill.icon"></span>
          </div>

          <!-- Nom -->
          <span class="skills__name">{{ skill.name }}</span>

          <!-- Détails au hover -->
          <div class="skills__details">
            <span class="skills__category">{{ skill.category }}</span>
            <p class="skills__context">{{ skill.context }}</p>
          </div>

          <!-- Glow background -->
          <div class="skills__glow" :style="{ background: skill.color }"></div>
        </div>
      </div>
    </div>

    <!-- Langues en bas -->
    <div class="skills__langues" ref="languesRef">
      <div class="skills__langues-title">Langues</div>
      <div class="skills__langues-list">
        <div v-for="lang in langues" :key="lang.name" class="skills__langue">
          <span class="skills__langue-flag">{{ lang.flag }}</span>
          <span class="skills__langue-name">{{ lang.name }}</span>
          <span class="skills__langue-level">{{ lang.level }}</span>
        </div>
      </div>
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
const gridRef = ref(null)
const languesRef = ref(null)
const itemRefs = ref([])
const activeSkill = ref(null)

const skills = [
  {
    name: 'Vue.js',
    icon: '<svg viewBox="0 0 128 128"><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z"/><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"/></svg>',
    category: 'Frontend',
    context: 'Portfolio, projets IUT, application cimetière de Longuenesse',
    color: 'rgba(66, 184, 131, 0.15)'
  },
  {
    name: 'HTML / CSS',
    icon: '<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>',
    category: 'Frontend',
    context: 'Base de tous les projets web, maîtrisé depuis le BTS',
    color: 'rgba(228, 77, 38, 0.15)'
  },
  {
    name: 'JavaScript',
    icon: '<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.21 58.943h-11.3c0 10.022-.041 19.995-.041 30.035 0 6.381.319 12.231-1.103 14.024-1.916 3.916-6.757 3.427-8.983 2.72-2.281-1.094-3.401-2.622-4.706-4.789-.355-.614-.617-1.108-.656-1.108l-9.478 5.804c1.571 3.249 3.915 6.042 6.896 7.861 4.479 2.675 10.484 3.545 16.822 2.098 4.087-1.263 7.606-3.865 9.474-7.837 2.724-5.146 2.143-11.425 2.098-18.404.06-10.194.019-20.394.019-30.409l-.042.005z"/></svg>',
    category: 'Frontend',
    context: 'Utilisé dans tous les projets web front et back',
    color: 'rgba(240, 219, 79, 0.15)'
  },
  {
    name: 'Python',
    icon: '<svg viewBox="0 0 128 128"><linearGradient id="a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><path fill="url(#a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.836-4.244-.706-8.645-1.027-12.866-1.009zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><linearGradient id="b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg>',
    category: 'Backend',
    context: 'Projets IUT, scripts, algorithmique avancée',
    color: 'rgba(53, 114, 165, 0.15)'
  },
  {
    name: 'Java',
    icon: '<svg viewBox="0 0 128 128"><path fill="#EA2D2E" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#EA2D2E" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/><path fill="#EA2D2E" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/></svg>',
    category: 'Backend',
    context: 'Projets BUT Informatique, POO avancée',
    color: 'rgba(234, 45, 46, 0.15)'
  },
  {
    name: 'C / C++',
    icon: '<svg viewBox="0 0 128 128"><path fill="#659AD2" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/><g fill="#fff"><path d="M100.3 55.8h-5v-5h-4.1v5h-5v4.1h5v5h4.1v-5h5zm14.1 0h-5v-5h-4.1v5h-5v4.1h5v5h4.1v-5h5z"/></g></svg>',
    category: 'Backend',
    context: 'Algorithmique, programmation système en BTS',
    color: 'rgba(101, 154, 210, 0.15)'
  },
  {
    name: 'PHP',
    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#777BB4" d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>',
    category: 'Backend',
    context: 'Projets web BTS, Symfony',
    color: 'rgba(97, 129, 182, 0.15)'
  },
  {
    name: 'SQL',
    icon: '<svg viewBox="0 0 128 128"><path fill="#00618A" d="M2 46.426l.002-.005C4.647 32.47 29.558 21.96 63.845 21.96c34.29 0 59.542 10.51 62.188 24.46l.002.006c0 .085.01.17.01.256v34.351c0 14.098-27.846 25.527-62.2 25.527-34.35 0-62.196-11.43-62.196-25.527V46.683c0-.087.007-.17.01-.256h-.002z"/><path fill="#E48E00" d="M125.845 46.682c0 14.098-27.843 25.527-62.2 25.527-34.35 0-62.195-11.43-62.195-25.527C1.45 32.583 29.296 21.155 63.646 21.155c34.357 0 62.199 11.428 62.199 25.527"/></svg>',
    category: 'Data',
    context: 'MySQL, PostgreSQL, MariaDB, projets IUT & EDF',
    color: 'rgba(0, 97, 138, 0.15)'
  },
  {
    name: 'PowerApps',
    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#742774" d="m11.4818 22.3686-.6199.7085c-.3961.4527-1.1003.4527-1.4964 0L.246 12.6547a.9942.9942 0 0 1 0-1.3094L9.3656.9229c.3961-.4527 1.1003-.4527 1.4964 0l.6203.7089-3.1295 3.4134c-.5166.5635-.5166 1.4136 0 1.9776l4.2755 4.6637a.4606.4606 0 0 1 .001.626l-4.2765 4.6652c-.5156.5625-.5161 1.4131 0 1.9776l3.129 3.4133zm6.4767-4.8675-3.8068-4.1525c-.7041-.7696-.7041-1.9288-.001-2.6969l3.8077-4.153c.2783-.3043.6746-.4793 1.0865-.4841L14.327.8678c-.3942-.4301-1.0723-.4301-1.4665 0L8.7214 5.383a.9634.9634 0 0 0 0 1.3018l4.2756 4.6643a.9632.9632 0 0 1 0 1.3018l-4.2756 4.6643a.9634.9634 0 0 0 0 1.3018l4.139 4.5152c.3942.4301 1.0723.4301 1.4665 0l4.7177-5.1465c-.4115-.005-.8078-.1803-1.0861-.4846zm-3.4381-6.5118c-.5242.5718-.5242 1.4495 0 2.0213l3.8064 4.1524c.3958.4317 1.0764.4317 1.4721 0l3.8092-4.1555c.5226-.5701.5226-1.4451 0-2.0152l-3.8092-4.1555c-.3958-.4317-1.0764-.4317-1.4721 0l-3.8064 4.1525z"/></svg>',
    category: 'Power Platform',
    context: 'Applications internes EDF en alternance',
    color: 'rgba(116, 39, 116, 0.15)'
  },
  {
    name: 'Power Automate',
    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0066FF" d="M.258 4.142c-.579-.646-.12-1.672.747-1.672h14.139l-8.191 9.155L.258 4.142zM19.744 6.86l-3.629-4.056a1.002 1.002 0 0 0-.368-.257L7.289 12 .258 19.858c-.578.646-.12 1.672.748 1.672h5.613L19.744 6.86zm4 4.471-1.695-1.895-1.97-2.201L7.289 21.53h8.079c.285 0 .557-.122.748-.334l5.934-6.632 1.695-1.895c.34-.381.34-.957-.001-1.338z"/></svg>',
    category: 'Power Platform',
    context: 'Automatisation workflows EDF, imports SharePoint',
    color: 'rgba(0, 102, 255, 0.15)'
  },
  {
    name: 'Power BI',
    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#F2C811" d="M21 1v22a1 1 0 0 1-1 1h-3.5V7c0-.827-.673-1.5-1.5-1.5h-2V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm-6 5H9a1 1 0 0 0-1 1v4.5h2c.827 0 1.5.673 1.5 1.5v11H16V7a1 1 0 0 0-1-1zm-5 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7V13a1 1 0 0 0-1-1z"/></svg>',
    category: 'Data',
    context: 'Tableaux de bord et reporting EDF',
    color: 'rgba(242, 200, 17, 0.15)'
  },
  {
    name: 'Git / GitHub',
    icon: '<svg viewBox="0 0 128 128"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/></svg>',
    category: 'Outils',
    context: 'Versionning sur tous les projets',
    color: 'rgba(243, 79, 41, 0.15)'
  },
  {
    name: 'Docker',
    icon: '<svg viewBox="0 0 128 128"><path fill="#019BC6" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.3-3.4 8.8-3 13 .3 3.1 1.3 6.3 3.3 8.8-1.5.9-3.2 1.6-4.8 2.1-3 1-6.3 1.6-9.5 1.6H.5l-.2 1.5c-.5 6.4.3 12.9 2.5 18.9l1 2.6.5.9c6.2 10.2 17.1 15.2 29.1 15.2 23.5 0 43.1-10.2 52.2-32.1 5.6.3 11.5-1.1 14.4-6.3l.7-1.3-1.9-1.1zM29 68H21v8h8v-8zm0-12H21v8h8v-8zm12 0H33v8h8v-8zm0 12H33v8h8v-8zm-24 0H9v8h8v-8zm36-24H45v8h8v-8zm12 12H57v8h8v-8zm-12 0H45v8h8v-8zm12 12H57v8h8v-8zm12-12H69v8h8v-8z"/></svg>',
    category: 'Outils',
    context: 'Conteneurisation projets BUT Informatique',
    color: 'rgba(1, 155, 198, 0.15)'
  },
  {
    name: 'Flutter',
    icon: '<svg viewBox="0 0 128 128"><path fill="#44D1FD" d="M12.3 64.2L76.3 0h39.4L32 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"/><path fill="#1FBCFD" d="M42.2 93.5l19.6-20.1 19.8 19.8-19.6 20.3z"/><path fill="#08589C" d="M42.2 93.5L70 86.9l11.6 6.4z"/></svg>',
    category: 'Mobile',
    context: 'Développement mobile cross-platform, projets perso',
    color: 'rgba(68, 209, 253, 0.15)'
  },
  {
    name: 'SharePoint',
    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0078D4" d="M24 13.5q0 1.242-.475 2.332-.474 1.09-1.289 1.904-.814.815-1.904 1.29-1.09.474-2.332.474-.762 0-1.523-.2-.106.997-.557 1.858-.451.862-1.154 1.494-.704.633-1.606.99-.902.358-1.91.358-1.09 0-2.045-.416-.955-.416-1.664-1.125-.709-.709-1.125-1.664Q6 19.84 6 18.75q0-.188.018-.375.017-.188.04-.375H.997q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6h3.54q.14-1.277.726-2.373.586-1.096 1.488-1.904Q7.652.914 8.807.457 9.96 0 11.25 0q1.395 0 2.625.533T16.02 1.98q.914.915 1.447 2.145T18 6.75q0 .188-.012.375-.011.188-.035.375 1.242 0 2.344.469 1.101.468 1.928 1.277.826.809 1.3 1.904Q24 12.246 24 13.5zm-12.75-12q-.973 0-1.857.34-.885.34-1.577.943-.691.604-1.154 1.43Q6.2 5.039 6.06 6h4.945q.41 0 .703.293t.293.703v4.945l.21-.035q.212-.75.61-1.424.399-.673.944-1.218.545-.545 1.213-.944.668-.398 1.43-.61.093-.503.093-.96 0-1.09-.416-2.045-.416-.955-1.125-1.664-.709-.709-1.664-1.125Q12.34 1.5 11.25 1.5zM6.117 15.902q.54 0 1.06-.111.522-.111.932-.37.41-.257.662-.679.252-.422.252-1.055 0-.632-.263-1.054-.264-.422-.662-.703-.399-.282-.856-.463l-.855-.34q-.399-.158-.662-.334-.264-.176-.264-.445 0-.2.14-.323.141-.123.335-.193.193-.07.404-.094.21-.023.351-.023.598 0 1.055.152.457.153.95.457V8.543q-.282-.082-.522-.14-.24-.06-.475-.1-.234-.041-.486-.059-.252-.017-.557-.017-.515 0-1.054.117-.54.117-.979.375-.44.258-.715.68-.275.421-.275 1.03 0 .598.263.997.264.398.663.68.398.28.855.474l.856.363q.398.17.662.358.263.187.263.457 0 .222-.123.351-.123.13-.31.2-.188.07-.393.087-.205.018-.369.018-.703 0-1.248-.234-.545-.235-1.107-.621v1.875q1.195.468 2.472.468zM11.25 22.5q.773 0 1.453-.293t1.19-.803q.51-.51.808-1.195.299-.686.299-1.459 0-.668-.223-1.277-.222-.61-.62-1.096-.4-.486-.95-.826-.55-.34-1.207-.48v1.933q0 .41-.293.703t-.703.293H7.57q-.07.375-.07.75 0 .773.293 1.459t.803 1.195q.51.51 1.195.803.686.293 1.459.293zM18 18q.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752 0-.926-.352-1.746-.351-.82-.966-1.436-.616-.615-1.436-.966Q18.926 9 18 9t-1.74.357q-.815.358-1.43.973t-.973 1.43q-.357.814-.357 1.74 0 .129.006.258t.017.258q.551.27 1.02.65t.838.855q.369.475.627 1.026.258.55.387 1.148Q17.18 18 18 18Z"/></svg>',
    category: 'Power Platform',
    context: 'Gestion documentaire et listes EDF',
    color: 'rgba(3, 131, 135, 0.15)'
  },
  {
    name: 'MongoDB',
    icon: '<svg viewBox="0 0 128 128"><path fill="#439934" d="M68.3 11.5c-2.1-4.2-3.9-6.5-4.3-7.2-.6-1-1.2-2.6-1.2-2.6h-.2s-.5 1.6-1.2 2.6c-.3.7-2.2 3-4.2 7.2C44.4 34.7 24.9 53.6 25.5 73c.2 5.9 1.7 11.3 4.3 16.2 5.3 9.8 16.5 19.5 31.2 26.8.7.3 1.1.1 1.1-.3v-4.5s-5.2-9.8-6-32.2c-.9-25 12.7-41.5 12.2-67.5z"/><path fill="#45A538" d="M63.7 116.7s-.2-2.3-.8-3.5c-.6-1.2-2.5-3.2-2.5-3.2s-.1-.1 0-.2c.1-.1.2.1.2.1.2.1 5.2 3.2 6.1 6.4.1.6.2 1.7.2 2.5v.2c-.1 0-.2 1.7-1.1 1.7-.4 0-.7-.3-.9-.6-.8-1.4-1.2-3.4-1.2-3.4z"/></svg>',
    category: 'Data',
    context: 'Base NoSQL, projets IUT',
    color: 'rgba(67, 153, 52, 0.15)'
  }
]

const langues = [
  { name: 'Français', level: 'Natif', flag: '🇫🇷' },
  { name: 'Anglais', level: 'B2', flag: '🇬🇧' },
  { name: 'Allemand', level: 'A2', flag: '🇩🇪' }
]

onMounted(() => {
  // Titre animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headerRef.value,
      start: 'top 80%'
    }
  })

  tl.from(titleLine1.value, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out'
  })
  .from(titleLine2.value, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out'
  }, '-=0.5')

  // Stagger des items
  gsap.from(itemRefs.value.filter(Boolean), {
    y: 40,
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.06,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: gridRef.value,
      start: 'top 85%'
    }
  })

  // Animation flottante continue sur chaque item
  itemRefs.value.forEach((el, i) => {
    if (!el) return
    gsap.to(el, {
      y: Math.random() * 8 - 4,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 2
    })
  })

  // Langues
  gsap.from(languesRef.value, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: languesRef.value,
      start: 'top 90%'
    }
  })
})
</script>

<style scoped>
.skills {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 6rem 2rem;
  max-width: none;
  margin: 0;
}

/* Header */
.skills__header {
  margin-bottom: 3.5rem;
  text-align: center;
  width: 100%;
  max-width: 1200px;
}

.skills__label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}

.skills__title {
  font-family: var(--font-serif);
  font-weight: 900;
  line-height: 0.9;
  margin: 0;
}

.skills__title-line {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--text);
  letter-spacing: -0.02em;
}

.skills__title-line--accent {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent) 0%, #d4a853 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Grid */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(150px, 1fr));
  gap: 1.2rem;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
}

@media (max-width: 1100px) {
  .skills__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Item */
.skills__item {
  will-change: transform;
}

.skills__item-inner {
  position: relative;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.06);
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.3s,
              box-shadow 0.4s;
  overflow: hidden;
  cursor: default;
}

.skills__item-inner:hover {
  transform: translateY(-6px);
  border-color: rgba(232, 213, 181, 0.2);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
}

/* Glow */
.skills__glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  border-radius: 16px;
}

.skills__item-inner:hover .skills__glow {
  opacity: 1;
}

/* Icon */
.skills__icon-wrap {
  width: 48px;
  height: 48px;
  margin: 0 auto 0.8rem;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.skills__item-inner:hover .skills__icon-wrap {
  transform: scale(1.15);
}

.skills__icon {
  display: block;
  width: 100%;
  height: 100%;
}

.skills__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

/* Name */
.skills__name {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.3rem;
  transition: color 0.3s;
}

/* Details (visible on hover) */
.skills__details {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.3s;
}

.skills__item-inner:hover .skills__details {
  max-height: 80px;
  opacity: 1;
}

.skills__category {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.3rem;
  padding: 0.15rem 0.5rem;
  background: rgba(232, 213, 181, 0.08);
  border-radius: 10px;
}

.skills__context {
  font-size: 0.7rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

/* Langues */
.skills__langues {
  margin-top: 3rem;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.skills__langues-title {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.skills__langues-list {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.skills__langue {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--bg-light);
  border: 1px solid rgba(232, 213, 181, 0.06);
  border-radius: 12px;
  padding: 0.7rem 1.2rem;
  transition: border-color 0.3s, transform 0.3s;
}

.skills__langue:hover {
  border-color: rgba(232, 213, 181, 0.15);
  transform: translateY(-2px);
}

.skills__langue-flag {
  font-size: 1.3rem;
}

.skills__langue-name {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

.skills__langue-level {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 768px) {
  .skills {
    padding: 4rem 1.5rem;
  }

  .skills__grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.8rem;
  }

  .skills__langues-list {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
