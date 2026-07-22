<script setup>
const props = defineProps({
  // Type checking
  title: String,
  count: Number,
  isActive: Boolean,

  // Multiple types
  value: [String, Number],

  // Required prop
  id: {
    type: Number,
    required: true,
  },

  // With default value
  size: {
    type: String,
    default: "medium",
  },

  // Object/Array defaults (must be factory function)
  user: {
    type: Object,
    default: () => ({ name: "Guest" }),
  },

  tags: {
    type: Array,
    default: () => [],
  },

  // Custom validator
  status: {
    type: String,
    default: "pending",
    validator: (value) => {
      return ["pending", "active", "completed"].includes(value);
    },
  },

  // Multiple validators
  email: {
    type: String,
    required: true,
    validator: (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
  },
});
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p>Count: {{ count }}</p>
    <p v-if="isActive">Active</p>
    <p>Size: {{ size }}</p>
    <p>Value: {{ value }}</p>
    <p>User: {{ user.name }}</p>
    <p>status: {{ status }}</p>
    <p>Tags: {{ tags.join(", ") }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>
