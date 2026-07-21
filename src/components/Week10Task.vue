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
const selectPriceRange = ref("");

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

  if (selectPriceRange.value === "under 50") {
    result = result.filter((p) => p.price < 50);
  } else if (selectPriceRange.value === "50 - 100") {
    result = result.filter((p) => p.price < 100 && p.price > 50);
  } else if (selectPriceRange.value === "100 - 500") {
    result = result.filter((p) => p.price < 500 && p.price > 100);
  } else if (selectPriceRange.value === "500 - 1000") {
    result = result.filter((p) => p.price < 1000 && p.price > 500);
  } else if (selectPriceRange.value === "over 1000") {
    result = result.filter((p) => p.price > 1000);
  } else {
    result = result;
  }

  if (searchProduct.value.length >= 2) {
    const q = searchProduct.value.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }

  return result;
});

const hasSearched = computed(() => searchProduct.value.length >= 2);

const hasFiltered = computed(() => {
  return (
    hasSearched.value ||
    selectedCategory.value !== "all" ||
    selectPriceRange.value !== ""
  );
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredProducts.value.length / pageSize));
});

const products = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return sortProduct.value.slice(start, start + pageSize);
});

const avgPriceOfFiltered = computed(() => {
  if (filteredProducts.value.length === 0) return 0;

  const total = filteredProducts.value.reduce((sum, p) => sum + p.price, 0);
  return total / filteredProducts.value.length;
});

const sortOrder = ref("none");

const sortProduct = computed(() => {
  const arr = [...filteredProducts.value];

  if (sortOrder.value === "ascending") {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder.value === "descending") {
    arr.sort((a, b) => b.name.localeCompare(a.name));
  }

  return arr;
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

    <div class="selects">
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

      <select
        name="price"
        id="price"
        class="dropdown"
        v-model="selectPriceRange"
      >
        <option value="">Select a price range</option>
        <option value="under 50">Under $50</option>
        <option value="50 - 100">$60 - $100</option>
        <option value="100 - 500">$101 - $500</option>
        <option value="500 - 1000">$500 - $1000</option>
        <option value="over 1000">Over $1000</option>
      </select>

      <select name="sort" id="sort" class="dropdown" v-model="sortOrder">
        <option value="none">Default</option>
        <option value="ascending">Name: A - Z</option>
        <option value="descending">Name: Z - A</option>
      </select>
    </div>

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

    <div v-if="hasFiltered" class="filteredProd">
      <p>
        {{ filteredProducts.length }} products for
        {{ searchProduct || selectedCategory }} found.
      </p>
      <p>Average Price ${{ avgPriceOfFiltered.toFixed($) }}</p>
    </div>

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

.selects {
  display: flex;
  gap: 1rem;
  width: 80%;
  margin: auto;
}

.filteredProd {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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

@media screen and (max-width: 900px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .products {
    grid-template-columns: repeat(1, 1fr);
  }

  input {
    width: 95%;
  }

  .selects {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }

  .dropdown {
    width: 100%;
  }
}
</style>
