<script setup>
import { ref } from "vue";

const name = ref("Component B");
</script>

<template>
  <h1>{{ name }}</h1>
</template>

<style scoped>
h1 {
  color: rgb(255, 0, 0);
}
</style>
