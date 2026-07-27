<script setup>
import Week11TaskChildButton from "./Week11TaskChildButton.vue";
import Week11TaskChildCard from "./Week11TaskChildCard.vue";
import Week11TaskChildModal from "./Week11TaskChildModal.vue";
import img from "../assets/refvsreactive.png";
function handleClick(message) {
  console.log(message);
}

import { ref } from "vue";

const openModal = ref(false);
function handleConfirm() {
  console.log("Item deleted successfully");
}
</script>

<template>
  <div class="inline-flex gap-5 border-2 m-5">
    <Week11TaskChildButton size="small" variant="primary" @click="handleClick"
      >Primary</Week11TaskChildButton
    >
    <Week11TaskChildButton size="medium" variant="secondary" :loading="true">
      Secondary</Week11TaskChildButton
    >
    <Week11TaskChildButton size="large" variant="danger" :disabled="true"
      >Danger</Week11TaskChildButton
    >
  </div>

  <div class="flex gap-5 m-auto max-w-5xl">
    <Week11TaskChildCard
      title="React Dev"
      variant="bordered"
      class="max-w-md"
      hoverable
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        eveniet.
      </p>
      <button
        @click="openModal = true"
        class="bg-blue-200 py-2 px-3 rounded-lg m-auto flex mt-5"
      >
        Open Modal
      </button>
    </Week11TaskChildCard>

    <Week11TaskChildCard
      title="Ref Vs Reactive"
      :src="img"
      alt="Ref vs Reactive diagram"
      variant="elevated"
      class="max-w-md"
      hoverable
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        eveniet.
      </p>
      <button
        @click="openModal = true"
        class="bg-blue-200 py-2 px-3 rounded-lg m-auto flex mt-5"
      >
        Open Modal
      </button>
    </Week11TaskChildCard>

    <Week11TaskChildCard title="Vue Dev" class="max-w-md" hoverable>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        eveniet.
      </p>
      <button
        @click="openModal = true"
        class="bg-blue-200 py-2 px-3 rounded-lg m-auto flex mt-5"
      >
        Open Modal
      </button>
    </Week11TaskChildCard>
  </div>

  <Week11TaskChildModal
    title="Item to be deleted"
    size="medium"
    v-model:show="openModal"
  />
</template>
