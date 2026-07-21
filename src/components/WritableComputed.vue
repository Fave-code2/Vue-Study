<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

// Computed with getter and setter
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    const [first, ...last] = newValue.trim().split(" ");
    firstName.value = first;
    lastName.value = last.join(" ");
  },
});
</script>

<template>
  <!-- Can read and write -->
  <input v-model="firstName" />
  <input v-model="lastName" />
  <p>First: {{ firstName }}</p>
  <p>Last: {{ lastName }}</p>
</template>
