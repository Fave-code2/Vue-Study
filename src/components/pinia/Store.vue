<script setup>
import { useCounterStore } from "@/store/counter";
import { storeToRefs } from "pinia";

const counter = useCounterStore();

const { count, name, doubleCounter, isEven } = storeToRefs(counter);

const { increment, decrement, incrementByAmount, reset } = counter;
</script>

<template>
  <div>
    <h1>Name: {{ name }}</h1>
    <p>Counter: {{ count }}</p>
    <p>Double: {{ doubleCounter }}</p>
    <p>Number is: {{ isEven }}</p>

    <div class="button">
      <button @click="increment()">+</button>
      <button @click="decrement()">-</button>
      <button @click="incrementByAmount(10)">+10</button>
      <button @click="reset()">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.button button {
  display: block;
  margin-top: 2px;
  padding: 0.5rem;
  background-color: bisque;
}
</style>
