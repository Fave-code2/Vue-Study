<script setup>
import { ref, watchEffect } from "vue";

const count = ref(0);
const multiplier = ref(2);

const increment = () => {
  count.value++;
};

// Automatically tracks dependencies
watchEffect(() => {
  console.log(`Result: ${count.value * multiplier.value}`);
  // Runs immediately and whenever count or multiplier changes
});

// Cleanup function
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    console.log("Polling...");
  }, 1000);

  // Called before next run or when component unmounts
  onCleanup(() => {
    clearInterval(timer);
  });
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Multiplier: {{ multiplier }}</p>
    <p>Result: {{ count * multiplier }}</p>

    <button @click="count++">Increment Count</button>
    <button @click="multiplier++">Increment Multiplier</button>
  </div>
</template>
