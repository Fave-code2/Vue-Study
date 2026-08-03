<script setup>
import { inject, ref, TransitionGroup } from "vue";
import NotificationForm from "./NotificationForm.vue";
const { showNotification, notifications, removeNotification } =
  inject("notification");

const message = ref("");
const type = ref(null);

function updateForm() {
  showNotification(message.value, type.value);

  message.value = "";
  type.value = null;
}
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification--${notification.type}`]"
      >
        {{ notification.message }}
        <button
          class="notification__close text-xl"
          @click="removeNotification(notification.id)"
        >
          x
        </button>
      </div>
    </TransitionGroup>
  </div>
  <NotificationForm
    v-model:message="message"
    v-model:type="type"
    @handle-submit="updateForm"
  />
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
}

.notification {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: white;
  min-width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.notification--success {
  background: #22c55e;
}
.notification--error {
  background: #ef4444;
}
.notification--warning {
  background: #f59e0b;
}
.notification--info {
  background: #3b82f6;
}

.notification__close {
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: 0.75rem;
}

/* Animation */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.notification-leave-active {
  position: absolute; /* prevents layout jump as others slide up */
}
</style>
