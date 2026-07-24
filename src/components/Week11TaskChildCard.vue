<script setup>
const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  hoverable: Boolean,
  src: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["default", "bordered", "elevated"].includes(value);
    },
  },
});

const cardClasses = {
  base: "rounded-lg overflow-hidden bg-gray-300 transition-shadow grid place-items-center text-center mt-5 p-2",
  variant: {
    default: "",
    bordered: "border-2 border-black",
    elevated: "shadow-lg",
  },
  hoverable: "hover:shadow-xl hover:-translate-y-1 transition-transform",
};
</script>

<template>
  <div
    :class="[
      cardClasses.base,
      cardClasses.variant[variant],
      { [cardClasses.hoverable]: hoverable },
    ]"
  >
    <img v-if="src" :src="src" :alt="alt" class="w-70" />
    <h1 class="text-3xl font-bold my-3">{{ title }}</h1>
    <slot></slot>
  </div>
</template>
