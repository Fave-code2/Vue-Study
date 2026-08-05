import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref([]);
  const categories = ref([]);
  const selectedCategory = ref("all");
  const searchProduct = ref("");
  const sortByPrice = ref("");
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const filteredProducts = computed(() => {
    let list = products.value;

    if (selectedCategory.value !== "all") {
      list = list.filter((p) => p.category === selectedCategory.value);
    }

    if (searchProduct.value.trim()) {
      const q = searchProduct.value.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sortByPrice.value === "asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortByPrice.value === "desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  });

  // Action
  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      products.value = await res.json();
      categories.value = [...new Set(products.value.map((p) => p.category))];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    // State
    products,
    categories,
    selectedCategory,
    sortByPrice,
    searchProduct,

    // Getters
    filteredProducts,

    // Action
    fetchProducts,
  };
});
