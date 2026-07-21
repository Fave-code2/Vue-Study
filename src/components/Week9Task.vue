<script setup>
import { ref, computed, reactive } from "vue";

const name = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");

const error = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const submitted = ref(false);
const submittedData = ref(null);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+234|0)\d{10}$/;

const validateName = () => {
  error.name = "";

  if (name.value.trim().length < 3) {
    error.name = "Name must be at least 3 characters long";
  }
};

const validateEmail = () => {
  error.email = "";

  if (!emailRegex.test(email.value.trim())) {
    error.email = "Enter a valid email address";
  }
};

const validatePhone = () => {
  error.phone = "";

  // Phone is optional
  if (!phoneNumber.value.trim()) return;

  if (!phoneRegex.test(phoneNumber.value)) {
    error.phone = "Enter a valid Nigerian phone number.";
  }
};

const validateMessage = () => {
  error.message = "";

  if (message.value.trim().length < 10) {
    error.message = "Message must be at least 10 characters long";
  }
};

const isFormValid = computed(() => {
  return (
    name.value.trim().length >= 3 &&
    emailRegex.test(email.value.trim()) &&
    phoneRegex.test(phoneNumber.value.trim()) &&
    message.value.trim().length >= 10
  );
});

const handleSumbit = () => {
  validateEmail();
  validateMessage();
  validateName();
  validatePhone();

  if (!isFormValid.value) return;

  alert("Form successfully submitted");

  submitted.value = true;

  submittedData.value = {
    name: name.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value,
  };

  name.value = "";
  email.value = "";
  phoneNumber.value = "";
  message.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSumbit">
    <div>
      <label for="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        @input="validateName"
        required
        placeholder="Enter your fullname"
        v-model="name"
      />
      <p v-if="error.name">{{ error.name }}</p>
    </div>

    <div>
      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        @input="validateEmail"
        required
        placeholder="Enter Email Address"
        v-model="email"
      />

      <p v-if="error.email">{{ error.email }}</p>
    </div>

    <div>
      <label for="phoneNumber">PhoneNumber:</label>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        v-model="phoneNumber"
        @input="validatePhone"
      />

      <p v-if="error.phone">{{ error.phone }}</p>
    </div>

    <div>
      <label for="message">Message:</label>
      <textarea
        name="message"
        id="message"
        required
        placeholder="Enter your message"
        v-model="message"
        @input="validateMessage"
      ></textarea>

      <p v-if="error.message">{{ error.message }}</p>
      <p>{{ message.length }} characters</p>
    </div>

    <button type="submit" :disabled="!isFormValid">Submit</button>
  </form>

  <section v-if="submitted">
    <p>{{ submittedData.name }}</p>
    <p>{{ submittedData.email }}</p>
    <p>{{ submittedData.phoneNumber }}</p>
    <p>{{ submittedData.message }}</p>
  </section>
</template>
