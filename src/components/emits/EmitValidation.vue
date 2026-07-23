<script setup>
const emit = defineEmits({
  // No Validation
  click: null,

  // With validation
  submit: (payload) => {
    if (!payload.email || !payload.password) {
      console.warn("Invalid submit payload");
      return false;
    }
    return true;
  },

  // Type checking (TypeScript-like)
  update: (id, value) => {
    return typeof id === "number" && typeof value === "string";
  },
});

function handleClick() {
  emit("click");
}

function handleSubmit() {
  emit("submit", { email: "fave@example.com", password: "secret123" });
}

function handleBadSubmit() {
  emit("submit", { email: "fave@example.com" }); // missing password — triggers the warning
}

function handleUpdate() {
  emit("update", 42, "new name"); // id: number, value: string — passes validation
}

function handleBadUpdate() {
  emit("update", "42", "new name"); // id is a string, not a number — fails validation
}
</script>

<template>
  <button
    class="bg-gray-400 py-2 px-3 m-5 border rounded-lg"
    @click="handleClick"
  >
    Click
  </button>
  <button
    class="bg-red-400 py-2 px-3 m-5 border rounded-lg"
    @click="handleSubmit"
  >
    Submit (valid)
  </button>
  <button
    class="bg-yellow-400 py-2 px-3 m-5 border rounded-lg"
    @click="handleBadSubmit"
  >
    Submit (invalid)
  </button>
  <button
    class="bg-green-400 py-2 px-3 m-5 border rounded-lg"
    @click="handleUpdate"
  >
    Update (valid)
  </button>
  <button
    class="bg-blue-400 py-2 px-3 m-5 border rounded-lg"
    @click="handleBadUpdate"
  >
    Update (invalid)
  </button>
</template>
