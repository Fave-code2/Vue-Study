<script setup>
import Header from "./Header.vue";
import PiniaNavbar from "./PiniaNavbar.vue";
import Products from "./Products.vue";
import ProductDetail from "./ProductDetail.vue";

import { useProductStore } from "@/store/product.js";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { selectedProduct } = storeToRefs(productStore);
</script>

<template>
  <div class="mx-20">
    <Header />
    <PiniaNavbar />
    <Products v-if="!selectedProduct" />
    <ProductDetail v-else />
  </div>
</template>
