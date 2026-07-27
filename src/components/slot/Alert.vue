<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="card">
    <header class="text-3xl font-bold">
      <h3>{{ title }}</h3>
    </header>

    <div class="card-body">
      <!-- Default slot - receives content from parent -->
      <slot></slot>
    </div>
  </div>
</template>
