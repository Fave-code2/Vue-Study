<script setup>
import { useTaskCartStore } from "@/store/taskCart";
import { storeToRefs } from "pinia";
import { inject } from "vue";

const cartStore = useTaskCartStore();
const { cartItems } = storeToRefs(cartStore);
const { removeItem, clearCart, increaseQty, decreaseQty } = cartStore;

const { showNotification } = inject("notification");

const handleRemoveItem = (product) => {
  removeItem(product.id);
  showNotification(`${truncate(product.title)} removed from cart`, "error");
};

const truncate = (str, len = 20) =>
  str.length > len ? str.slice(0, len) + "..." : str;
</script>

<template>
  <div v-if="cartItems.length === 0" class="text-center text-3xl">
    No Item in your Cart.
  </div>

  <div v-else>
    <section>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 text-3xl mb-5">
          <i class="pi pi-shopping-cart text-3xl"></i>
          <h1>
            Your Cart has {{ cartItems.length }}
            {{ cartItems.length > 1 ? "items" : "item" }}
          </h1>
        </div>

        <button
          class="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-3 rounded-xl cursor-pointer"
          @click="clearCart()"
        >
          Clear Cart
        </button>
      </div>

      <div v-for="item in cartItems" class="w-2/3" :key="item.id">
        <div
          class="flex items-center justify-between bg-gray-200 p-4 rounded-2xl mb-3"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-20 h-18 object-contain bg-gray-400 p-5 rounded-lg"
            />
            <div>
              <h2 class="text-xl">{{ truncate(item.title) }}</h2>
              <p class="text-gray-500">${{ item.price }}</p>
            </div>
          </div>

          <p
            class="flex items-center justify-around w-25 py px-3 border border-gray-500 rounded"
          >
            <i
              class="pi pi-minus cursor-pointer w-10 h-5 text-center"
              @click="decreaseQty(item.id)"
            ></i>

            <span class="min-w-6 text-center text-lg">
              {{ item.qty }}
            </span>

            <i
              class="pi pi-plus cursor-pointer w-10 h-5 text-center"
              @click="increaseQty(item.id)"
            ></i>
          </p>

          <div class="flex items-center gap-4">
            <p class="text-xl font-semibold">${{ item.price }}</p>
            <p
              class="flex text-xl w-10 h-10 text-center items-center justify-center bg-gray-300 text-red-500 p-2 cursor-pointer border border-gray-300 rounded hover:bg-gray-400"
              @click="handleRemoveItem(item)"
            >
              <i class="pi pi-trash"></i>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
