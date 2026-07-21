<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const allProducts = ref([]);
const loading = ref(true);
const error = ref("");

let abortController = null;

const mapProduct = (product) => ({
  id: product.id,
  name: product.title,
  price: product.price,
  image: product.thumbnail,
  category: product.category,
  inStock: product.stock > 0,
  desc: product.description,
});

const fetchProducts = async () => {
  abortController = new AbortController();
  try {
    const res = await fetch("https://dummyjson.com/products?limit=0", {
      signal: abortController.signal,
    });
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    allProducts.value = data.products.map(mapProduct);
  } catch (err) {
    if (err.name !== "AbortError") {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchProducts());
onUnmounted(() => abortController?.abort());

const searchProduct = ref("");
const selectedCategory = ref("all");

const currentPage = ref(1);
const pageSize = 12;

watch([searchProduct, selectedCategory], () => {
  currentPage.value = 1;
});

const filteredProducts = computed(() => {
  let result = allProducts.value;

  if (selectedCategory.value !== "all") {
    result = result.filter((p) => p.category === selectedCategory.value);
  }

  if (searchProduct.value.length >= 2) {
    const q = searchProduct.value.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }

  return result;
});

const hasSearched = computed(() => searchProduct.value.length >= 2);

const hasFiltered = computed(() => {
  return hasSearched.value || selectedCategory.value !== "all";
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredProducts.value.length / pageSize));
});

const products = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProducts.value.slice(start, start + pageSize);
});
</script>

<template>
  <section>
    <h1 class="title">Products from DummyJSON</h1>

    <div>
      <label for="search">Search: </label>
      <input
        type="text"
        name="search"
        id="search"
        v-model="searchProduct"
        placeholder="Search Products"
        autocomplete="off"
      />
    </div>

    <select
      name="category"
      id="category"
      class="dropdown"
      v-model="selectedCategory"
    >
      <option value="all">All</option>
      <option value="beauty">Beauty</option>
      <option value="fragrances">Fragrances</option>
      <option value="groceries">Groceries</option>
      <option value="furniture">Furniture</option>
      <option value="smartphones">Smartphones</option>
      <option value="womens-jewellery">women-Jewellery</option>
      <option value="vehicle">Vehicle</option>
      <option value="sports-accessories">Sports-Accessories</option>
      <option value="kitchen-accessories">Kitchen-Accessories</option>
      <option value="mens-watches">Mens-Watches</option>
    </select>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div class="products" v-if="products.length">
      <div class="product" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" />

        <div class="namePrice">
          <p>{{ product.name }}</p>
          <p>${{ product.price }}</p>
        </div>

        <p class="desc">{{ product.desc }}</p>

        <div class="categoryStock">
          <p class="category">Category: {{ product.category }}</p>

          <p :class="product.inStock ? 'in-stock' : 'out-of-stock'">
            {{ product.inStock ? "In Stock" : "Out of Stock" }}
          </p>
        </div>
      </div>
    </div>

    <p class="filteredProd" v-if="hasFiltered">
      {{ filteredProducts.length }} products for
      {{ searchProduct || selectedCategory }} found.
    </p>

    <div class="pageChange">
      <button :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <p class="page">{{ currentPage }} / {{ totalPages }}</p>
      <button :disabled="currentPage === totalPages" @click="currentPage++">
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 0 3rem;
}

.title {
  text-align: center;
}

.loading {
  text-align: center;
  margin-top: 1rem;
  font-size: xx-large;
}

.error {
  text-align: center;
  margin-top: 1rem;
  font-size: xx-large;
  color: #891e1e;
}

.searchField {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto 1rem;
}

label {
  position: absolute;
  left: -100000px;
}

input {
  padding: 0.5rem;
  width: 70%;
  border: 2px solid #000;
  border-radius: 0.5rem;
  display: block;
  margin: 0 auto 0.5rem;
  font-size: 1.2rem;
}

.dropdown {
  padding: 0.5rem;
  width: 50%;
  display: block;
  margin: 0 auto 0.5rem;
  border: 2px solid #000;
  border-radius: 0.5rem;
  font-size: 1.3rem;
}

.filteredProd {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
}

.product {
  border: 1px solid #000;
  padding: 1rem;
  background-color: rgb(152, 151, 151);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.product .namePrice,
.product .categoryStock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.product .desc {
  margin-top: -0.8rem;
}

.product .categoryStock {
  font-weight: 500;
  margin-top: -1.5rem;
}

.product img {
  display: block;
  margin: 0 auto;
  width: 120px;
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  padding: 2rem 0;
}

.pageChange {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.pageChange button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.pageChange .page {
  font-size: 1rem;
  font-weight: bold;
}
</style>
