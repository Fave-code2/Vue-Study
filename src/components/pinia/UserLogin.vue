<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

async function handleLogin() {
  const success = await userStore.login(email.value, password.value);

  if (success) {
    router.push("/dashboard");
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <h2>Login</h2>

    <div v-if="userStore.error" class="error">
      {{ userStore.error }}
    </div>

    <input v-model="email" type="email" placeholder="Email" required />

    <input v-model="password" type="password" placeholder="Password" required />

    <button type="submit" :disabled="userStore.loading">
      {{ userStore.loading ? "Logging in..." : "Login" }}
    </button>
  </form>
</template>
