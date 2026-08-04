import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";

export const useCartStore = defineStore("cart", () => {
  // Use another store
  const userStore = useUserStore();

  const items = ref([]);

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  });

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  // Apply user-specific discount
  const finalTotal = computed(() => {
    if (userStore.isAdmin) {
      return total.value * 0.9; // 10% admin discount
    }
    return total.value;
  });

  function addItem(product) {
    const existing = items.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }

    saveToStorage();
  }

  function removeItem(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
    saveToStorage();
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        saveToStorage();
      }
    }
  }

  function clear() {
    items.value = [];
    saveToStorage();
  }

  function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(items.value));
  }

  function loadFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      items.value = JSON.parse(saved);
    }
  }

  return {
    items,
    total,
    itemCount,
    finalTotal,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    loadFromStorage,
  };
});
