<script setup>
import Alert from "./Alert.vue";
import Layout from "./Layout.vue";
import Button from "./Button.vue";
import TodoList from "./TodoList.vue";
</script>

<template>
  <Alert title="My Card">
    <p>This content goes into the slot!</p>
    <button>Dismiss</button>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3964.746543791389!2d3.427539!3d6.4266006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5402368b913%3A0xca22600eeec46d00!2sEko%20Hotel%20And%20Suites!5e0!3m2!1sen!2sng!4v1785163504602!5m2!1sen!2sng"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </Alert>

  <Layout>
    <!-- Use template with v-slot or # shorthand -->
    <template #header>
      <h1>My Application</h1>
    </template>

    <template #sidebar>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </template>

    <!-- Default slot (no template needed) -->
    <div>
      <h2>Main Content</h2>
      <p>This goes in the default slot</p>
    </div>

    <template #footer>
      <p>&copy; 2024 My Company</p>
    </template>
  </Layout>

  <!-- Uses fallback -->
  <Button></Button>

  <!-- Replaces fallback -->
  <Button>Custom Text</Button>

  <!-- <TodoList>
    <template #default="{ todo, index }">
      <div>
        <span>{{ index + 1 }}</span>
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </div>
    </template>
  </TodoList> -->

  <!-- Or destructure directly -->
  <TodoList v-slot="{ todo }">
    <strong>{{ todo.text }}</strong>
  </TodoList>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
