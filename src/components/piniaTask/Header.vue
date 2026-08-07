<script setup>
import { useProductStore } from "@/store/product";
import { useTaskCartStore } from "@/store/taskCart";
import { storeToRefs } from "pinia";

const getsearch = useProductStore();
const cartStore = useTaskCartStore();
console.log(cartStore.cartItems);

import { watch } from "vue";

watch(
  () => cartStore.cartItems,
  (val) => console.log("cart updated:", val),
  { deep: true },
);

const { searchProduct } = storeToRefs(getsearch);
const { itemCount } = storeToRefs(cartStore);
</script>

<template>
  <header class="flex items-center justify-between mt-7 mb-5">
    <h1 class="text-3xl font-bold">Shopfront</h1>

    <div class="relative">
      <label for="search" class="sr-only">Search</label>
      <input
        class="border border-gray-200 py-2 pl-7 text-lg rounded-md w-2xl"
        type="text"
        name="search"
        id="search"
        placeholder="Search Products"
        v-model="searchProduct"
      />

      <span
        class="pi pi-search absolute left-0 top-3 pl-2 text-gray-400"
      ></span>
    </div>

    <button
      class="h-10 w-10 rounded-full border border-blue-200 cursor-pointer bg-gray-200 relative"
    >
      <span
        :class="[
          'absolute -top-1 -right-2 w-6 h-6x rounded-full flex items-center justify-center font-semibold text-white',
          itemCount ? 'bg-blue-600' : '',
        ]"
        >{{ itemCount }}</span
      >
      <i class="pi pi-shopping-cart text-lg"></i>
    </button>
  </header>
</template>
