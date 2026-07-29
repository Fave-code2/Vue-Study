<script setup>
import { inject } from "vue";
import ThemedButton from "./ThemedButton.vue";

const theme = inject("theme");
</script>

<template>
  <div class="container">
    <h1>My App</h1>
    <ThemedButton @click="theme.toggle()">
      Toggle Theme ({{ theme.current.value }})
    </ThemedButton>
  </div>
</template>
