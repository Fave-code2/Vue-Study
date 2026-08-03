<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isAuthenticated, fullName } = storeToRefs(userStore);
</script>

<template>
  <nav class="navbar">
    <div class="logo">My App</div>

    <div v-if="isAuthenticated" class="user-menu">
      <span>Welcome, {{ fullName }}</span>
      <button @click="userStore.logout()">Logout</button>
    </div>

    <div v-else>
      <a href="login">Login</a>
    </div>
  </nav>
</template>
