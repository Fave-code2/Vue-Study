<script setup>
import EmitChild from "./EmitChild.vue";
function handleDelete(message) {
  console.log(message);
}
</script>

<template>
  <EmitChild @delete="handleDelete" />
</template>
