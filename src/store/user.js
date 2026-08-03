// stores/user.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const fullName = computed(() => {
    if (!user.value) return "";
    return `${user.value.firstName} ${user.value.lastName}`;
  });

  // Actions
  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log(email, password);

      const data = await response.json();
      user.value = data.user;
      token.value = data.token;

      // Save to localStorage
      localStorage.setItem("token", data.token);

      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  }

  async function fetchProfile() {
    if (!token.value) return;

    loading.value = true;

    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      user.value = await response.json();
    } catch (err) {
      error.value = err.message;
      // If unauthorized, logout
      if (err.message.includes("401")) {
        logout();
      }
    } finally {
      loading.value = false;
    }
  }

  async function updateProfile(updates) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      user.value = await response.json();
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Initialize from localStorage
  function init() {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      token.value = savedToken;
      fetchProfile();
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    fullName,
    // Actions
    login,
    logout,
    fetchProfile,
    updateProfile,
    init,
  };
});
