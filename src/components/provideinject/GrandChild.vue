<script setup>
import { inject } from "vue";

// Inject provided values
const user = inject("user");
const theme = inject("theme");
const updateTheme = inject("updateTheme");

// With default value
const config = inject("config", { defaultValue: true });
</script>

<template>
  <div>
    <p>User: {{ user.name }}</p>
    <p>Role: {{ user.role }}</p>
    <p>Theme: {{ theme }}</p>
    <button @click="updateTheme('light')">Light Theme</button>
  </div>
</template>

<style scoped>
button {
  padding: 0.5rem;
  background: #000;
  color: #fff;
  border-radius: 0.5rem;
}
</style>
