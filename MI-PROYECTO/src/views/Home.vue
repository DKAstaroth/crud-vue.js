<template>
  <div class="container my-5">
    <!-- Encabezado con estilo -->
    <header class="mb-5 text-center">
      <h1 class="display-4 text-gradient">Lista de Cursos</h1>
    </header>

    <!-- Lista de cursos -->
    <div class="row g-4">
      <div class="col-md-4" v-for="course in courses" :key="course.id">
        <div class="card shadow-sm hover-card">
          <!-- Imagen del curso -->
          <img :src="course.imageLink" class="card-img-top" alt="Imagen del curso" />
          <div class="card-body">
            <!-- Nombre del curso -->
            <h5 class="card-title text-center">{{ course.name }}</h5>
            <!-- Información del curso -->
            <ul class="list-unstyled mt-3">
              <li>
                <strong>Costo:</strong> {{ formatCurrency(course.cost) }}
              </li>
              <li>
                <strong>Duración:</strong> {{ course.duration }} horas
              </li>
              <li>
                <strong>Cupos:</strong> {{ course.slots }}
              </li>
              <li>
                <strong>Completado:</strong>
                <span :class="course.completed ? 'text-success' : 'text-danger'">
                  {{ course.completed ? 'Sí' : 'No' }}
                </span>
              </li>
              <li>
                <strong>Fecha de Registro:</strong> {{ course.registrationDate }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getCourses"]),
    courses() {
      return this.getCourses;
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(value);
    },
  },
};
</script>

<style>
/* Encabezado estilizado */
.text-gradient {
  background: linear-gradient(to right, #007bff, #6610f2);
  color: transparent; /* Respaldo para navegadores no compatibles */
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header p {
  font-size: 1.1rem;
}

/* Estilo de las tarjetas */
.card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-img-top {
  height: 180px;
  object-fit: cover;
}
.card-body {
  padding: 1.25rem;
  background-color: #ffffff;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #343a40;
}

/* Hover en las tarjetas */
.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
.hover-card:hover .card-title {
  color: #007bff;
}

/* Lista de información */
.list-unstyled {
  margin-top: 1rem;
}
.list-unstyled li {
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}
.list-unstyled li strong {
  color: #495057;
}
.hover-card:hover ul li strong {
  color: #007bff;
}

/* Efectos para dispositivos */
@media (max-width: 768px) {
  .card-img-top {
    height: 150px;
  }
  .card-title {
    font-size: 1rem;
  }
  .list-unstyled li {
    font-size: 0.85rem;
  }
}
</style>
