<script setup>
import { ref, provide } from "vue";
const notifications = ref([]);

let nextId = 0;

function showNotification(message, type = "info", duration = 3000) {
  const id = nextId++;

  notifications.value.push({ id, message, type });

  if (duration > 0) {
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }
}

function removeNotification(id) {
  notifications.value = notifications.value.filter((n) => n.id !== id);
}

provide("notification", {
  notifications,
  showNotification,
  removeNotification,
});
</script>

<template>
  <slot />
</template>
