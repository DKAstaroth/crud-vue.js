<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Editar Curso</h2>

    <form @submit.prevent="submitCourse">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="courseName" class="form-label">Nombre del Curso</label>
          <input
            type="text"
            id="courseName"
            v-model="course.name"
            class="form-control"
            required
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseSlots" class="form-label">Cantidad de Cupos</label>
          <input
            type="number"
            id="courseSlots"
            v-model="course.slots"
            class="form-control"
            required
            min="1"
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseEnrolled" class="form-label">Cantidad de Inscritos</label>
          <input
            type="number"
            id="courseEnrolled"
            v-model="course.enrolled"
            class="form-control"
            required
            min="0"
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseDuration" class="form-label">Duración (en horas)</label>
          <input
            type="number"
            id="courseDuration"
            v-model="course.duration"
            class="form-control"
            required
            min="1"
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseCost" class="form-label">Costo</label>
          <input
            type="number"
            id="courseCost"
            v-model="course.cost"
            class="form-control"
            required
            min="1"
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseRegistrationDate" class="form-label">Fecha de Registro</label>
          <input
            type="date"
            id="courseRegistrationDate"
            v-model="course.registrationDate"
            class="form-control"
            required
            disabled
          />
        </div>

        <div class="col-md-6 mb-3">
          <label for="courseDescription" class="form-label">Descripción</label>
          <textarea
            id="courseDescription"
            v-model="course.description"
            class="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <!-- Nuevo control para estado de terminado -->
        <div class="col-md-6 mb-3">
          <label class="form-label">¿El curso está terminado?</label>
          <div>
            <input
              type="radio"
              id="completedYes"
              value="true"
              v-model="course.completed"
            />
            <label for="completedYes">Sí</label>
          </div>
          <div>
            <input
              type="radio"
              id="completedNo"
              value="false"
              v-model="course.completed"
            />
            <label for="completedNo">No</label>
          </div>
        </div>
      </div>

      <div class="text-center">
        <!-- Botón para actualizar curso -->
        <button type="submit" class="btn btn-success btn-lg me-2">
          Actualizar Curso
        </button>

        <!-- Botón para volver a admin.vue -->
        <button
          type="button"
          class="btn btn-secondary btn-lg"
          @click="goToAdmin"
        >
          Volver
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditCourse",
  data() {
    return {
      course: {
        id: null,
        name: "",
        slots: "",
        enrolled: "",
        duration: "",
        cost: "",
        completed: false,
        registrationDate: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getCourseById"]),
  },
  methods: {
    submitCourse() {
      // Validar que los inscritos no excedan los cupos
      if (this.course.enrolled > this.course.slots) {
        alert("La cantidad de inscritos no puede ser mayor a los cupos disponibles.");
        return;
      }

      // Si el curso está marcado como "terminado", establecer los inscritos en 0
      if (this.course.completed === "true") {
        this.course.enrolled = 0;
      }

      // Obtener la fecha actual en la zona horaria local
      const today = new Date();
      const offset = today.getTimezoneOffset() * 60000;
      const localDate = new Date(today.getTime() - offset);
      const formattedDate = localDate.toISOString().split("T")[0];
      this.course.registrationDate = formattedDate;

      this.course.completed = this.course.completed === "true";

      // Llamar a la acción para actualizar el curso en el store
      this.$store.dispatch("updateCourse", this.course);
      alert("Curso actualizado exitosamente.");
      this.$router.push({ name: "Admin" }); // Redirigir al panel de administración
    },
    goToAdmin() {
      // Redirigir al panel de administración
      this.$router.push({ name: "Admin" });
    },
  },
  created() {
    const courseId = parseInt(this.$route.params.id);
    const course = this.getCourseById(courseId);

    if (course) {
      this.course = { ...course };
      this.course.completed = course.completed.toString();
    } else {
      alert("Curso no encontrado.");
      this.$router.push({ name: "Admin" });
    }
  },
};
</script>
