<script setup>
import { ref } from "vue";
import CustomInput from "./CustomInput.vue";

const email = ref("");
const emailError = ref("");

// Parent
function validateEmail() {
  console.log("2. parent validateEmail fired");
  if (!email.value.includes("@")) {
    emailError.value = "Please enter a valid email";
  } else {
    emailError.value = "";
  }
  console.log("3. emailError is now:", emailError.value);
}
</script>

<template>
  <CustomInput
    v-model="email"
    label="Email Address"
    type="email"
    placeholder="you@example.com"
    :error="emailError"
    @blur="validateEmail"
  />
</template>
