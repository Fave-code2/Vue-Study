<script setup>
import ChildComponent from "./ChildComponent.vue";

function handleUpdate(payload) {
  console.log("Received:", payload);
}

function handleDelete(id) {
  console.log("Delete:", id);
}

function handleCustomEvent(message) {
  console.log("custom-event", message);
}
</script>

<template>
  <ChildComponent
    @update="handleUpdate"
    @delete="handleDelete"
    @custom-event="handleCustomEvent"
  />
</template>
