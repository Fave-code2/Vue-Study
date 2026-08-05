<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/store/product";
import { storeToRefs } from "pinia";

const productStore = useProductStore();

const { filteredProducts } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());

const truncate = (str, len = 20) =>
  str.length > len ? str.slice(0, len) + "..." : str;
</script>

<!-- <template>
  <main class="grid grid-cols-1 md:grid-cols-4 gap-5 my-8">
    <div
      v-for="product in products"
      :key="product.id"
      class="border border-gray-200 p-7 rounded-lg bg-white hover:shadow-2xs shadow-black transition-transform duration-200 hover:scale-105"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-40 object-contain bg-gray-300 p-5 rounded-lg"
      />
      <div class="mt-3 space-y-3">
        <h2 class="font-bold">{{ truncate(product.title) }}</h2>
        <p>{{ product.category }}</p>

        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold">${{ product.price }}</p>

          <button class="cursor-pointer h-10 w-10 rounded-lg bg-gray-300">
            <i class="pi pi-plus text-xl font-bold"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template> -->

<template>
  <main class="grid grid-cols-1 md:grid-cols-4 gap-5 my-8">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="border border-gray-200 p-7 rounded-lg bg-white hover:shadow-2xs shadow-black transition-transform duration-200 hover:scale-105"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-40 object-contain bg-gray-300 p-5 rounded-lg"
      />
      <div class="mt-3 space-y-3">
        <h2 class="font-bold">{{ truncate(product.title) }}</h2>
        <p>{{ product.category }}</p>

        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold">${{ product.price }}</p>
          <button class="cursor-pointer h-10 w-10 rounded-lg bg-gray-300">
            <i class="pi pi-plus text-xl font-bold"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
