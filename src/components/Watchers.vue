<script setup>
import { ref, watch } from "vue";

const count = ref(0);
const user = ref({ name: "Alice", age: 25 });

// Watch a single ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

const increment = () => {
  count.value++;
};
// Watch object property (need getter function)
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    console.log(`Age changed from ${oldAge} to ${newAge}`);
  },
);

// Watch entire object (deep)
watch(
  user,
  (newUser, oldUser) => {
    console.log("User changed from:", oldUser, "to", newUser);
  },
  { deep: true }, // Watch nested properties
);

// Watch multiple sources
watch(
  [count, () => user.value.name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`Count: ${oldCount} → ${newCount}`);
    // console.log(`Name: ${oldName} → ${newName}`);
  },
);

// Immediate execution (run immediately on mount)
watch(
  count,
  (newValue) => {
    console.log("Current count:", newValue);
  },
  { immediate: true },
);
</script>

<template>
  <p>{{ count }}</p>
  <button @click="increment">Increase counter</button>
  <br />

  <input type="number" v-model="user.age" />
</template>
