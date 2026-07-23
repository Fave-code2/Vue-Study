<script setup>
import EmitValidation from "./EmitValidation.vue";

function handleClick() {
  console.log("Button was clicked");
}

function handleSubmit(payload) {
  console.log("Form submitted:", payload);
}

function handleUpdate(id, value) {
  console.log(`Updating item ${id} to "${value}"`);
}
</script>

<template>
  <EmitValidation
    @click="handleClick"
    @submit="handleSubmit"
    @update="handleUpdate"
  />
</template>
