<script setup>
import Alert from "./Alert.vue";
import Layout from "./Layout.vue";
import Button from "./Button.vue";
import TodoList from "./TodoList.vue";

// Table script
import { ref } from "vue";
import DataTable from "./DataTable.vue";

const users = ref([
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    status: "active",
    role: "admin",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    status: "active",
    role: "user",
  },
]);

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

function deleteUser(id) {
  users.value = users.value.filter((u) => u.id !== id);
}
</script>

<template>
  <!-- Table data template -->
  <DataTable :data="users" :columns="columns">
    <!-- Custom status cell with badge -->
    <template #cell-status="{ value }">
      <span
        class="badge"
        :class="{
          'badge-success': value === 'active',
          'badge-error': value === 'inactive',
        }"
      >
        {{ value }}
      </span>
    </template>

    <!-- Custom role cell with icon -->
    <template #cell-role="{ value }">
      <span class="flex items-center gap-2">
        <span v-if="value === 'admin'">👑</span>
        <span v-else>👤</span>
        {{ value }}
      </span>
    </template>

    <!-- Custom actions cell -->
    <template #cell-actions="{ row }">
      <div class="flex gap-2">
        <button class="btn-sm btn-primary">Edit</button>
        <button class="btn-sm btn-danger" @click="deleteUser(row.id)">
          Delete
        </button>
      </div>
    </template>

    <!-- Custom empty state -->
    <template #empty>
      <div class="empty-custom">
        <h3>No users found</h3>
        <p>Add your first user to get started</p>
        <button class="btn-primary">Add User</button>
      </div>
    </template>
  </DataTable>

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

/* Table data style */

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-success {
  background: #d1fae5;
  color: #065f46;
}

.badge-error {
  background: #fee2e2;
  color: #991b1b;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.empty-custom {
  text-align: center;
}

.empty-custom h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.empty-custom p {
  color: #6b7280;
  margin-bottom: 1rem;
}
</style>
