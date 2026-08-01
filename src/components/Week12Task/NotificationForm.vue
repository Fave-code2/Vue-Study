<script setup>
const emit = defineEmits(["handle-submit"]);

const message = defineModel("message", { required: true });
const type = defineModel("type", { required: true });

const handleSubmit = () => {
  emit("handle-submit");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="text-white mt-7 ml-4">
    <input
      type="text"
      name="message"
      placeholder="Enter a notification message"
      v-model="message"
      class="border-2 border-black w-1/3 p-2 mr-3"
    />

    <select
      name="type"
      id="type"
      v-model="type"
      class="border-2 border-black p-2 mr-3 text-black"
    >
      <option value="">Select a type</option>
      <option value="success">Success</option>
      <option value="info">Info</option>
      <option value="error">Error</option>
      <option value="warning">Warning</option>
    </select>

    <button class="py-3 px-5 bg-gray-300 text-black rounded-2xl">Save</button>
  </form>
</template>
