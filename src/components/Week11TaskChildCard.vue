<script setup>
const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  hoverable: Boolean,
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  variant: {
    type: String,
    default: "default",
    require: true,
    validator: () => {
      return ["default", "bordered", "elevated"];
    },
  },
});
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>
