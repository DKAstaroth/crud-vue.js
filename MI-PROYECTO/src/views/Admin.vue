<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Administración</h1>

    <!-- Estadísticas -->
    <div class="row g-4 mb-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="col-md-4"
      >
        <div class="card shadow-sm" :class="stat.borderClass">
          <div class="card-body text-center">
            <h5 :class="stat.titleClass">{{ stat.title }}</h5>
            <p class="display-6 fw-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón para agregar curso -->
    <div class="text-end mb-4">
      <button class="btn btn-primary" @click="addCourse">Agregar Curso</button>
    </div>

    <!-- Tabla mejorada -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th><i class="bi bi-book"></i> Curso</th>
            <th><i class="bi bi-card-text"></i> Descripción</th>
            <th><i class="bi bi-people"></i> Cupos</th>
            <th><i class="bi bi-person-check"></i> Inscritos</th>
            <th><i class="bi bi-clock"></i> Duración</th>
            <th><i class="bi bi-currency-dollar"></i> Costo</th>
            <th><i class="bi bi-check-circle"></i> Terminado</th>
            <th><i class="bi bi-calendar"></i> Última actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="course in courses"
            :key="course.id"
            :class="{'table-light': course.completed, 'table-warning': !course.completed}"
          >
            <td>{{ course.name }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.slots }}</td>
            <td>{{ course.enrolled }}</td>
            <td>{{ course.duration }} hrs</td>
            <td>{{ formatCurrency(course.cost) }}</td>
            <td>
              <span :class="course.completed ? 'badge bg-success' : 'badge bg-warning'">
                {{ course.completed ? "Sí" : "No" }}
              </span>
            </td>
            <td>{{ course.registrationDate }}</td>
            <td class="text-center">
              <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-warning" @click="editCourse(course.id)">
                  ✏️ Editar
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteCourse(course.id)">
                  🗑️ Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  computed: {
    ...mapGetters(["getCourses"]),
    courses() {
      return this.getCourses;
    },
    stats() {
      return [
        {
          title: "Total de Cursos",
          value: this.courses.length,
          borderClass: "border-primary",
          titleClass: "text-primary",
        },
        {
          title: "Cursos Activos",
          value: this.courses.filter((course) => !course.completed).length,
          borderClass: "border-success",
          titleClass: "text-success",
        },
        {
          title: "Cursos Terminados",
          value: this.courses.filter((course) => course.completed).length,
          borderClass: "border-danger",
          titleClass: "text-danger",
        },
        {
          title: "Total de Alumnos Permitidos",
          value: this.courses.reduce((total, course) => total + course.slots, 0),
          borderClass: "border-info",
          titleClass: "text-info",
        },
        {
          title: "Total de Alumnos Inscritos",
          value: this.courses.reduce((total, course) => total + course.enrolled, 0),
          borderClass: "border-warning",
          titleClass: "text-warning",
        },
        {
          title: "Cupos Restantes",
          value: this.courses.reduce(
            (total, course) => total + (course.slots - course.enrolled),
            0
          ),
          borderClass: "border-secondary",
          titleClass: "text-secondary",
        },
      ];
    },
  },
  methods: {
    addCourse() {
      this.$router.push({ name: "Courses" });
    },
    editCourse(courseId) {
      this.$router.push({
        name: "EditCourse",
        params: { id: courseId },
      });
    },
    deleteCourse(courseId) {
      if (confirm("¿Estás seguro de eliminar este curso?")) {
        this.$store.dispatch("deleteCourse", courseId);
        alert("Curso eliminado exitosamente.");
      }
    },
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
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.badge {
  font-size: 0.9rem;
  padding: 0.5em 0.75em;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.85;
}

@media (max-width: 768px) {
  .table td {
    padding: 0.5rem;
  }
  .d-flex {
    flex-direction: column;
    align-items: center;
  }
  .gap-2 {
    gap: 0.5rem;
  }
}
</style>
