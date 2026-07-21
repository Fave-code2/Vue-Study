<script setup>
import { ref, computed } from "vue";

const items = ref([1, 2, 3, 4, 5]);

// Computed - cached, only recalculates when dependencies change
const sum = computed(() => {
  console.log("Computing sum");
  return items.value.reduce((a, b) => a + b, 0);
});

// Method - runs every time it's called
function getSum() {
  console.log("Calculating sum");
  return items.value.reduce((a, b) => a + b, 0);
}
</script>

<template>
  <!-- Logs "Computing sum" once -->
  <p>{{ sum }}</p>
  <p>{{ sum }}</p>

  <!-- Logs "Calculating sum" twice -->
  <p>{{ getSum() }}</p>
  <p>{{ getSum() }}</p>
</template>
