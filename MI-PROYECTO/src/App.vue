<template>
  <div id="app">
    <!-- Navbar visible en toda la aplicación -->
    <Navbar />
    <!-- Aquí se renderizan las vistas según la ruta -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
