<script setup>
import { ref, provide, computed } from "vue";

const theme = ref("light");

const colors = computed(() => {
  return theme.value === "light"
    ? {
        background: "#ffffff",
        text: "#1f2937",
        primary: "#3b82f6",
        border: "#e5e7eb",
      }
    : {
        background: "#1f2937",
        text: "#f9fafb",
        primary: "#6375fa",
        border: "#374151",
      };
});

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

// Provide theme context
provide("theme", {
  current: theme,
  colors,
  toggle: toggleTheme,
});
</script>

<template>
  <div
    class="app"
    :style="{
      backgroundColor: colors.background,
      color: colors.text,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
