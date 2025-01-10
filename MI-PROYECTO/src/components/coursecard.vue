<template>
    <v-card>
      <v-img :src="curso.img" height="200px"></v-img>
      <v-card-title>{{ curso.nombre }}</v-card-title>
      <v-card-subtitle>Costo: ${{ curso.costo }}</v-card-subtitle>
      <v-card-text>
        {{ curso.descripcion }}
        <p><strong>Duración:</strong> {{ curso.duracion }}</p>
        <p><strong>Inscritos:</strong> {{ curso.inscritos }} / {{ curso.cupos }}</p>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      curso: Object,
    },
  };
  </script>
  