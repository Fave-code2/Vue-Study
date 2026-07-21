<!-- <script setup>
import { ref } from "vue";

const firstName = ref("Marvel");
const lastName = ref("Doe");
</script>

<template>
  ❌ Logic in template (bad for performance and maintenance)
  <p>{{ firstName + " " + lastName }}</p>
  <p>{{ firstName + " " + lastName }}</p>
  <p>{{ firstName + " " + lastName }}</p>
  Expression is recalculated every time!
</template> -->

<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

// Computed property - cached based on dependencies
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

const fullName1 = () => {
  return `${firstName.value} ${lastName.value}`;
};

// Called once, then cached until firstName or lastName changes
</script>

<template>
  <p>{{ fullName1() }}</p>
  <p>{{ fullName }}</p>
  <p>{{ fullName }}</p>
  <!-- Uses cached value! -->
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
