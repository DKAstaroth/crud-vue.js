<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Agregar Curso</h1>
    <form @submit.prevent="submitCourse">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre del Curso</label>
        <input v-model="newCourse.name" type="text" class="form-control" id="name" required />
      </div>

      <div class="mb-3">
        <label for="imageLink" class="form-label">Link de Imagen</label>
        <input v-model="newCourse.imageLink" type="url" class="form-control" id="imageLink" placeholder="URL de la imagen en Google" />
      </div>

      <div class="mb-3">
        <label for="slots" class="form-label">Cantidad de Cupos</label>
        <input
          v-model="newCourse.slots"
          type="number"
          class="form-control"
          id="slots"
          required
          min="1"
        />
      </div>

      <div class="mb-3">
        <label for="enrolled" class="form-label">Cantidad de Inscritos</label>
        <input
          v-model="newCourse.enrolled"
          :max="newCourse.slots || null"
          type="number"
          class="form-control"
          id="enrolled"
          required
          min="0"
        />
        <small v-if="newCourse.enrolled > newCourse.slots" class="text-danger">
          Los inscritos no pueden exceder los cupos disponibles.
        </small>
      </div>

      <div class="mb-3">
        <label for="duration" class="form-label">Duración (en horas)</label>
        <input v-model="newCourse.duration" type="number" class="form-control" id="duration" required min="1" />
      </div>

      <div class="mb-3">
        <label for="cost" class="form-label">Costo</label>
        <input v-model="newCourse.cost" type="number" class="form-control" id="cost" required min="1" />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <textarea v-model="newCourse.description" class="form-control" id="description" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Agregar Curso</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCourse",
  data() {
    return {
      newCourse: {
        id: Date.now(), // Generar un ID único basado en la fecha actual
        name: "",
        description: "",
        cost: "",
        duration: "",
        slots: "", // Cantidad de cupos
        enrolled: 0, // Cantidad de inscritos
        registrationDate: "", // Será asignada automáticamente
        imageLink: "",
        completed: false,
      },
    };
  },
  methods: {
    submitCourse() {
      // Validar cantidad de inscritos no excede los cupos
      if (this.newCourse.enrolled > this.newCourse.slots) {
        alert("La cantidad de inscritos no puede ser mayor a los cupos disponibles.");
        return;
      }

      // Asignar la fecha actual como fecha de registro
      this.newCourse.registrationDate = new Date().toISOString().split("T")[0];

      // Enviar el curso al store
      this.$store.dispatch("addCourse", { ...this.newCourse });

      // Limpiar el formulario después de enviar
      this.newCourse = {
        id: Date.now(),
        name: "",
        description: "",
        cost: "",
        duration: "",
        slots: "",
        enrolled: 0,
        registrationDate: "",
        imageLink: "",
        completed: false,
      };
      alert("Curso agregado exitosamente.");
      this.$router.push({ name: "Admin" }); // Redirigir a la vista de administración
    },
  },
};
</script>
