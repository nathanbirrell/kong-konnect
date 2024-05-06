<template>
  <header>
    <Navigation />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './components/Navigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navigation,
  },
})
</script>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
  background: var(--grey-100);
}

:root {
  --font-family-sans: 'Roboto'; // custom font-family
  --font-family-mono: 'Roboto Mono'; // custom font-family
  --font-weight-normal: 400; // custom font-weight
  --kui-font-weight-semibold: 500; // custom font-weight
}
</style>
