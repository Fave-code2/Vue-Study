<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: String,
  type: {
    type: String,
    default: "text",
  },
  error: String,
  placeholder: String,
});

const emit = defineEmits({
  "update:modelValue": (value) => typeof value === "string",
  blur: null,
});

function handleInput(event) {
  emit("update:modelValue", event.target.value);
}

function handleBlur() {
  emit("blur");
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="label">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
      :class="['input', { 'input-error': error }]"
    />
    <span v-if="error" class="error-message">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
}

.input-error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
}
</style>
