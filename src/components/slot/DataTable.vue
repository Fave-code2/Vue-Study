<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const sortKey = ref("");
const sortOrder = ref("asc");

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];

    if (aVal < bVal) return sortOrder.value === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  });
});

function handleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}
</script>

<template>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            @click="column.sortable && handleSort(column.key)"
            :class="{
              sortable: column.sortable,
              active: sortKey === column.key,
            }"
          >
            <!-- Scoped slot for custom header -->
            <slot :name="`header-${column.key}`" :column="column">
              {{ column.label }}
              <span v-if="sortKey === column.key">
                {{ sortOrder === "asc" ? "↑" : "↓" }}
              </span>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
          <td v-for="column in columns" :key="column.key">
            <!-- Scoped slot for custom cell rendering -->
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
              :index="rowIndex"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state slot -->
    <div v-if="sortedData.length === 0" class="empty-state">
      <slot name="empty">
        <p>No data available</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable:hover {
  background: #f3f4f6;
}

.data-table th.active {
  color: #3b82f6;
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #6b7280;
}
</style>
