<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const products = ref([]);
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
    const res = await fetch("https://dummyjson.com/products", {
      signal: abortController.signal,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    console.log(data);

    const mapped = data.products.map(mapProduct);

    allProducts.value = mapped;
    products.value = mapped;
  } catch (err) {
    if (err.name !== "AbortError") {
      error.value = err.message;
      console.error(err);
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

onUnmounted(() => {
  if (abortController) {
    abortController.abort();
  }
});

const searchProduct = ref("");
const hasSearched = ref(false);
const selectedCategory = ref("all");

let abortfetch = null;
let timerId = null;

watch([searchProduct, selectedCategory], async ([search, category]) => {
  clearTimeout(timerId);
  abortfetch?.abort();

  const run = async () => {
    abortfetch = new AbortController();

    try {
      let url = "https://dummyjson.com/products";
      if (search.length >= 3) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`;
      } else if (category !== "all") {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=0`;
      }

      const res = await fetch(url, { signal: abortfetch.signal });
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      products.value = data.products.map(mapProduct);
      hasSearched.value = search.length > 2;
    } catch (err) {
      if (err.name !== "AbortError") error.value = err.message;
    }
  };

  if (search.length >= 2) {
    timerId = setTimeout(run, 300); // debounce only the search path
  } else {
    run();
  }
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
      <option value="Vehicle">Vehicle</option>
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

    <p v-else-if="hasSearched && products.length === 0" class="no-results">
      No products found for {{ searchProduct }}
    </p>
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
</style>
