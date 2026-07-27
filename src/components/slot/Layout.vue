<template>
  <div class="layout">
    <header class="header">
      <!-- Named slot for header -->
      <slot name="header"></slot>
    </header>

    <aside class="sidebar">
      <!-- Named slot for sidebar -->
      <slot name="sidebar"></slot>
    </aside>

    <main class="content">
      <!-- Default slot (no name) -->
      <slot></slot>
    </main>

    <footer class="footer">
      <!-- Named slot for footer -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: #1f2937;
  color: white;
  padding: 1rem;
}
.sidebar {
  grid-area: sidebar;
  background: #f3f4f6;
  padding: 1rem;
}
.content {
  grid-area: content;
  padding: 2rem;
}
.footer {
  grid-area: footer;
  background: #e5e7eb;
  padding: 1rem;
}
</style>
