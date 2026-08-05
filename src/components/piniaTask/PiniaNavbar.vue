<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";

const productStore = useProductStore();
const { categories, sortByPrice, selectedCategory } = storeToRefs(productStore);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex gap-2 flex-wrap">
      <button
        :class="[
          'px-3 py-1.5 text-xs rounded-md capitalize transition-colors cursor-pointer',
          selectedCategory === 'all'
            ? 'bg-gray-500 text-white'
            : 'border border-blue-200',
        ]"
        @click="selectedCategory = 'all'"
      >
        All
      </button>

      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'px-3 py-1.5 text-xs rounded-md capitalize transition-colors cursor-pointer',
          selectedCategory === cat
            ? 'bg-gray-500 text-white'
            : 'border border-blue-200',
        ]"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <select
      v-model="sortByPrice"
      class="border border-blue-200 rounded-md text-xs px-2 py-1.5"
    >
      <option value="">Featured</option>
      <option value="asc">Price: low to high</option>
      <option value="desc">Price: high to low</option>
    </select>
  </div>
</template>
