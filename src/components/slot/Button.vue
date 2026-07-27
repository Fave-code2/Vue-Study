<template>
  <div class="button">
    <slot>
      <!-- Fallback content if no slot content provided -->
      Default Button Text
    </slot>
  </div>
</template>

<style scoped>
.button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
}

.button:hover {
  background-color: #2563eb;
}
</style>
