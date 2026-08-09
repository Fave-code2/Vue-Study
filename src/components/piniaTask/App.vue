<script setup>
import { ref } from "vue";
import Header from "./Header.vue";
import PiniaNavbar from "./PiniaNavbar.vue";
import Products from "./Products.vue";
import ProductDetail from "./ProductDetail.vue";
import NotificationParent from "./NotificationParent.vue";
import ToastContainer from "./ToastContainer.vue";
import Cart from "./Cart.vue";

import { useProductStore } from "@/store/product.js";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { selectedProduct } = storeToRefs(productStore);

const showCart = ref(false);

const toggleCart = () => {
  showCart.value = true;
};

const handleBack = () => {
  showCart.value = false;
};
</script>

<template>
  <div class="mx-20">
    <Header @toggle-cart="toggleCart" v-if="!showCart" />
    <PiniaNavbar v-if="!showCart" />
    <NotificationParent>
      <Products v-if="!showCart && !selectedProduct" />
      <ProductDetail v-if="!showCart && selectedProduct" />
      <ToastContainer />
      <Cart v-if="showCart" :onBack="handleBack" />
    </NotificationParent>
  </div>
</template>
