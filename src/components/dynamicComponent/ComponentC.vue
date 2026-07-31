<script setup>
import { ref } from "vue";

const name = ref("Component C");
</script>

<template>
  <h1>{{ name }}</h1>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
