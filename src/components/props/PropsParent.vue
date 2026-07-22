<script setup>
import { ref } from "vue";
import PropsChild from "./PropsChild.vue";

const myTitle = ref("Welcome Home");
const myCount = ref(420);
const active = ref(true);
</script>

<template>
  <PropsChild :title="myTitle" :count="myCount" :is-active="active" />
</template>
