<script setup>
import { inject } from "vue";

const theme = inject("theme");
</script>

<template>
  <button
    class="themed-button"
    :style="{
      backgroundColor: theme.colors.value.primary,
      color: '#ffffff',
      borderColor: theme.colors.value.border,
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.themed-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.themed-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
