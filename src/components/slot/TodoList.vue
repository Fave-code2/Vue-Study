<script setup>
import { ref } from "vue";

const todos = ref([
  { id: 1, text: "Learn Vue", done: true },
  { id: 2, text: "Build project", done: false },
]);
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <!-- Expose todo data to parent via slot props -->
      <slot :todo="todo" :index="todos.indexOf(todo)"></slot>
    </li>
  </ul>
</template>
