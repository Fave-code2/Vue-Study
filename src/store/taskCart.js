import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

const storageKey = "cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useTaskCartStore = defineStore("cart", () => {
  // States
  const cartItems = ref(loadCart());
  const discountCode = ref(null);

  watch(
    cartItems,
    (val) => {
      localStorage.setItem("cart", JSON.stringify(val));
    },
    { deep: true },
  );

  // Getters

  // Actions
  function addItem(product, qty = 1) {
    const existingProduct = cartItems.value.find(
      (item) => item.id === product.id,
    );
    if (existingProduct) {
      existingProduct.qty += qty;
    } else {
      cartItems.value.push({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        qty,
      });
    }
  }

  function removeItem(id) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  }

  function clearCart() {
    cartItems.value = [];
    discountCode.value = null;
  }

  return {
    // States
    cartItems,
    discountCode,

    // Getters
    // Actions
    addItem,
    removeItem,
    clearCart,
  };
});
