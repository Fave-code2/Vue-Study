import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // State
  const count = ref(0);
  const name = ref("Counter Store");

  // Getters (computed)
  const doubleCounter = computed(() => count.value * 2);
  const isEven = computed(() => (count.value % 2 === 0 ? "Even" : "Odd"));

  // Actions
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function incrementByAmount(amount) {
    count.value += amount;
  }

  function reset() {
    count.value = 0;
  }

  return {
    // States
    count,
    name,

    // Getters
    doubleCounter,
    isEven,

    // Actions
    increment,
    decrement,
    incrementByAmount,
    reset,
  };
});
