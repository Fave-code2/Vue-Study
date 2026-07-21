<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

const data = ref(null);

// Before component is mounted (DOM not available)
onBeforeMount(() => {
  console.log("Component about to mount");
});

// After component is mounted (DOM available)
onMounted(() => {
  console.log("Component mounted");
  // Perfect for:
  // - Fetching data
  // - Setting up third-party libraries
  // - Adding event listeners

  fetchData();
});

// Before component updates (reactive data changed)
onBeforeUpdate(() => {
  console.log("Component about to update");
});

// After component updates
onUpdated(() => {
  console.log("Component updated");
});

// Before component is removed
onBeforeUnmount(() => {
  console.log("Component about to unmount");
});

// After component is removed
onUnmounted(() => {
  console.log("Component unmounted");
  // Perfect for:
  // - Cleanup timers
  // - Remove event listeners
  // - Cancel pending requests
});

async function fetchData() {
  data.value = await fetch("/api/data").then((r) => r.json());
}
</script>

<template>LifeCycleHook</template>
