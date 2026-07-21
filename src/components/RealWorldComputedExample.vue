<script setup>
import { ref, computed } from "vue";

const todos = ref([
  { id: 1, text: "Learn Vue", done: true },
  { id: 2, text: "Build project", done: true },
  { id: 3, text: "Deploy", done: false },
]);

const filter = ref("all"); // 'all', 'active', 'completed'

// Filtered todos based on current filter
const filteredTodos = computed(() => {
  if (filter.value === "active") {
    return todos.value.filter((t) => !t.done);
  }
  if (filter.value === "completed") {
    return todos.value.filter((t) => t.done);
  }
  return todos.value;
});

// Stats
const totalTodos = computed(() => todos.value.length);
const activeTodos = computed(() => todos.value.filter((t) => !t.done).length);
const completedTodos = computed(() => todos.value.filter((t) => t.done).length);
const completionPercentage = computed(() => {
  if (totalTodos.value === 0) return 0;
  return Math.round((completedTodos.value / totalTodos.value) * 100);
});
</script>

<template>
  <div class="todo-app">
    <!-- Filters -->
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        All ({{ totalTodos }})
      </button>
      <button
        @click="filter = 'active'"
        :class="{ active: filter === 'active' }"
      >
        Active ({{ activeTodos }})
      </button>
      <button
        @click="filter = 'completed'"
        :class="{ active: filter === 'completed' }"
      >
        Completed ({{ completedTodos }})
      </button>
    </div>

    <!-- Progress -->
    <div class="progress">
      <div
        class="progress-bar"
        :style="{ width: completionPercentage + '%' }"
      ></div>
      <span>{{ completionPercentage }}% Complete</span>
    </div>

    <!-- Todo list -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<!-- Slot, inject and provide, props, events, prop drilling, when to use props vs inject and provide -->
