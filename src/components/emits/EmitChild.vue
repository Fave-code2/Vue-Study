<script setup>
const emit = defineEmits(["delete"]);

function handleClick() {
  emit("delete", "You deleted this post");
}
</script>

<template>
  <div>
    <button
      @click="handleClick"
      class="bg-gray-300 border rounded-lg py-2 px-3"
    >
      Delete
    </button>
  </div>
</template>
