<script setup>
import { ref, provide } from "vue";
import Parent from "./Parent.vue";

const user = ref({ name: "Alice", role: "admin" });
const theme = ref("dark");

// Provide to all descendants
provide("user", user);
provide("theme", theme);

function updateTheme(newTheme) {
  theme.value = newTheme;
}

provide("updateTheme", updateTheme);
</script>

<template>
  <div>
    <Parent />
  </div>
</template>
