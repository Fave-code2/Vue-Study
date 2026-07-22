<script setup>
import { ref } from "vue";
import UserCard from "./UserCard.vue";
</script>

<template>
  <UserCard
    :id="1"
    title="Junior Develpoer"
    :count="42"
    :value="100"
    :user="{ name: 'Fave' }"
    :tags="['react', 'vue']"
    status="active"
    email="fave@example.com"
  />
</template>

<style scoped></style>
