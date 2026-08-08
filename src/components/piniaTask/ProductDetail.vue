<script setup>
import { computed, inject } from "vue";
import { useProductStore } from "@/store/product";
import { useTaskCartStore } from "@/store/taskCart";
import { storeToRefs } from "pinia";

// Notification
const { showNotification } = inject("notification");

// initialzing productStore data
const productStore = useProductStore();
const { selectedProduct } = storeToRefs(productStore);
const { getProductById, backToList } = productStore;

const cartStore = useTaskCartStore();
const { addItem } = cartStore;

const product = computed(() => {
  return getProductById(selectedProduct.value);
});

const truncate = (str, len = 20) =>
  str.length > len ? str.slice(0, len) + "..." : str;

const handleAddItem = (product) => {
  addItem(product);
  showNotification(`${truncate(product.title)} added to cart`, "success");
};

// const capitalize = (word) => {
//   return word.slice(0, 1).toUpperCase() + word.slice(1);
// };

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
</script>

<template>
  <section class="my-8">
    <!-- Back button -->
    <div>
      <button
        @click="backToList()"
        class="w-10 h-10 rounded-full border border-blue-200 cursor-pointer hover:bg-gray-200"
      >
        <i class="pi pi-arrow-left"></i>
      </button>
    </div>

    <!-- Product and it's Details -->
    <div class="flex gap-7 mx-15 justify-center items-center">
      <!-- Product image -->
      <div class="w-1/2">
        <div
          class="h-120 bg-gray-300 p-5 rounded-lg flex items-center justify-center"
        >
          <img
            :src="product?.image"
            :alt="product?.title"
            class="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div class="w-1/2">
        <span class="bg-gray-200 py-1.5 px-2 rounded-lg">{{
          capitalize(product?.category)
        }}</span>

        <h2 class="my-3 text-2xl font-semibold">{{ product?.title }}</h2>

        <div class="flex items-center gap-1 text-lg mb-3">
          <template v-for="star in 5" :key="star">
            <i
              v-if="star <= Math.floor(product.rating.rate)"
              class="pi pi-star-fill text-yellow-500"
            ></i>

            <i
              v-else-if="star - product.rating.rate <= 0.5"
              class="pi pi-star-half-fill text-yellow-500"
            ></i>

            <i v-else class="pi pi-star text-gray-300"></i>
          </template>

          <span>{{ product.rating.rate }}</span>
          <span class="text-gray-700"
            >({{ product.rating.count }} reviews)</span
          >
        </div>

        <h1 class="text-4xl font-bold mb-5">${{ product?.price }}</h1>

        <p
          class="text-lg font-semibold border-b-2 border-gray-400 pb-5 overflow-auto h-48"
        >
          {{ product.description }}
        </p>

        <button
          class="w-full mt-5 bg-gray-300 rounded-md cursor-pointer py-2 font-semibold text-lg hover:bg-gray-400"
          @click="handleAddItem(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </section>
</template>
