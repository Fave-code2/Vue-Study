<script setup>
import { ref, watch } from "vue";

const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

let timeoutId = null;

// Watch search query with debounce
watch(searchQuery, (newQuery) => {
  // Clear previous timeout
  clearTimeout(timeoutId);

  if (newQuery.length < 2) {
    searchResults.value = [];
    return;
  }

  // Set new timeout
  timeoutId = setTimeout(async () => {
    const queryAtRequestTime = newQuery;
    loading.value = true;
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${newQuery}`,
      );
      const data = await response.json();
      // Check if the response matches what the user types.
      if (searchQuery.value === queryAtRequestTime) {
        // only update if still relevant
        searchResults.value = data.products;
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      loading.value = false;
    }
  }, 300); // Wait 300ms after user stops typing
});
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="result in searchResults" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>
