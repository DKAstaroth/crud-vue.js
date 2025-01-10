<template>
  <nav>
    <div class="menu-toggle" @click="toggleMenu">
      <span class="bar" :class="{ 'rotate': isMenuOpen }"></span>
      <span class="bar" :class="{ 'fade': isMenuOpen }"></span>
      <span class="bar" :class="{ 'rotate': isMenuOpen }"></span>
    </div>
    <ul :class="{ 'active': isMenuOpen, 'slide-in': isMenuOpen }">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/admin">Admin</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
}
</script>

<style scoped>
/* Estilos generales */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2a38; /* Fondo oscuro elegante */
  padding: 15px 30px;
  position: relative;
  border-bottom: 2px solid #4b5365; /* Línea metálica sutil en la parte inferior */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil para efecto de profundidad */
}

.logo {
  font-size: 26px;
  font-weight: bold;
  color: #ecf0f1; /* Color claro y elegante para el logo */
  text-transform: uppercase;
  letter-spacing: 2px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

li {
  margin-right: 30px;
}

a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s, transform 0.3s;
}

a:hover {
  color: #3498db; /* Azul vibrante al hacer hover */
  transform: scale(1.1);
}

/* Estilos del menú hamburguesa */
.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
}

.bar {
  width: 25px;
  height: 4px;
  background-color: #ecf0f1;
  margin: 4px 0;
  transition: 0.4s;
}

/* Efecto para el ícono de hamburguesa cuando el menú está abierto */
.bar.rotate {
  transform: rotate(45deg);
  position: relative;
}

.bar.fade {
  opacity: 0;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  ul {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    background-color: #1f2a38;
    border-top: 2px solid #4b5365;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  ul.active {
    display: flex;
    opacity: 1;
    transform: translateY(0);
  }

  .menu-toggle {
    display: flex;
  }

  .slide-in {
    animation: slideIn 0.3s ease forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
