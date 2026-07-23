<script setup>
import Week11TaskChildButton from "./Week11TaskChildButton.vue";
function handleClick(message) {
  console.log(message);
}
</script>

<template>
  <div class="inline-flex gap-5">
    <Week11TaskChildButton size="small" variant="primary" @click="handleClick"
      >Primary</Week11TaskChildButton
    >
    <Week11TaskChildButton size="medium" variant="secondary" :loading="true">
      Secondary</Week11TaskChildButton
    >
    <Week11TaskChildButton size="large" variant="danger" :disabled="true"
      >Danger</Week11TaskChildButton
    >
  </div>
</template>
