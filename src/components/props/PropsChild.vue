<script setup>
// Define props
const props = defineProps({
  title: String,
  count: Number,
  isActive: Boolean,
});

// Access props
console.log(props.title);
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <p>Active: {{ isActive }}</p>
  </div>
</template>
