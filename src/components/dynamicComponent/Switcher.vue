<script setup>
import { shallowRef } from "vue";
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";
import ComponentC from "./ComponentC.vue";

// Use shallowRef for components (better performance)
const currentComponent = shallowRef(ComponentA);

const tabs = [
  { name: "Component A", component: ComponentA },
  { name: "Component B", component: ComponentB },
  { name: "Component C", component: ComponentC },
];

function switchTo(component) {
  currentComponent.value = component;
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="switchTo(tab.component)"
      :class="{ active: currentComponent === tab.component }"
    >
      {{ tab.name }}
    </button>
  </div>

  <!-- Dynamic component -->
  <component :is="currentComponent" />
</template>

<style scoped>
button {
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  background-color: brown;
}
</style>
