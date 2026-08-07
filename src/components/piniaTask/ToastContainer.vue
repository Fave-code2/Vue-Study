<script setup>
import { inject } from "vue";

const { notifications, removeNotification } = inject("notification");
</script>
<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="notify in notifications"
      :key="notify.id"
      :class="[
        'py-2 px-4 rounded-lg shadow text-white cursor-pointer',
        notify.type === 'success'
          ? 'bg-green-500'
          : notify.type === 'error'
            ? 'bg-red-500'
            : 'bg-blue-500',
      ]"
    >
      <p class="flex items-center justify-between gap-3.5">
        <span>{{ notify.message }}</span>
        <i class="pi pi-times" @click="removeNotification(notify.id)"></i>
      </p>
    </div>
  </div>
</template>
