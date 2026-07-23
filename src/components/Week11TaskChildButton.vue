<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  variant: {
    type: String,
    require: true,
    validator: (value) => {
      return ["primary", "secondary", "danger"].includes(value);
    },
  },
  size: {
    type: String,
    default: "small",
    require: true,
    validator: (value) => {
      return ["small", "medium", "large"].includes(value);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const buttonClass = {
  base: "rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  variant: {
    primary: "bg-blue-400",
    secondary: "bg-yellow-400",
    danger: "bg-red-500",
  },

  size: {
    small: "px-2 py-2 text-sm",
    medium: "px-3 py-3 text-base",
    large: "px-4 py-4 text-lg",
  },
};

function handleClick() {
  emit("click", { id: 42, title: "Vue" });
}
</script>

<template>
  <div>
    <button
      :class="[
        buttonClass.base,
        buttonClass.variant[variant],
        buttonClass.size[size],
      ]"
      :disabled="disabled"
      @click="handleClick"
    >
      <span
        v-if="loading"
        class="spinner inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"
      ></span>
      <slot></slot>
    </button>
  </div>
</template>
