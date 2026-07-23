<script setup>
// Define emits
const emit = defineEmits(["update", "delete", "custom-event"]);

function handleClick() {
  // Emit event (optionally with payload)
  emit("update", { id: 123, value: "new value" });
}

function handleDelete() {
  emit("delete", 123);
}

function handleCustomEvent() {
  emit("custom-event", { msg: "I am a custom event", id: 24, active: false });
}
</script>

<template>
  <button
    @click="handleClick"
    class="bg-gray-500 border-2 py-2 px-3 rounded-lg mr-5"
  >
    Update
  </button>
  <button
    @click="handleDelete"
    class="bg-blue-500 border-2 py-2 px-3 rounded-lg mr-5"
  >
    Delete
  </button>
  <button
    @click="handleCustomEvent"
    class="bg-green-500 border-2 py-2 px-3 rounded-lg"
  >
    custom-event
  </button>
</template>
