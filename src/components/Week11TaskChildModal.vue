<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "small",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const emit = defineEmits({
  "update:show": (value) => typeof value === "boolean",
  confirm: null,
  cancel: null,
});

const sizeClasses = {
  small: "max-w-sm",
  medium: "max-w-md",
  large: "max-w-2xl",
};

const handleConfirm = () => {
  emit("confirm");
};

function handleCancel() {
  emit("cancel");
  emit("update:show", false);
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div :class="['bg-white rounded-lg p-6 w-full', sizeClasses[size]]">
      <h1 class="text-lg font-bold mb-4">{{ title }}</h1>

      <div class="flex justify-end gap-3">
        <slot name="footer">
          <button @click="handleCancel" class="px-4 py-2 rounded bg-gray-200">
            Cancel
          </button>
          <button
            @click="handleConfirm"
            class="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Confirm
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
