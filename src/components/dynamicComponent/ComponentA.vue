<script setup>
import { ref } from "vue";

const name = ref("Component A");
</script>

<template>
  <h1>{{ name }}</h1>
</template>

<style scoped>
h1 {
  color: rgb(0, 255, 72);
}
</style>
