<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Job Search</h1>
        <nav class="space-x-4">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        </nav>
      </div>
    </header>

    <div class="flex flex-1 container mx-auto mt-6">
      <!-- 🟡 Sidebar (Filters) -->
      <div class="w-1/6 p-4 bg-gray-100 rounded-md">
        <h2 class="text-lg font-semibold mb-3">Filters</h2>
        <v-input v-model="jobStore.searchQuery" placeholder="Search jobs..." />

        <label class="block mb-2">
          <span class="text-gray-700">Job Levels</span>
          <select
            class="w-full p-2 border rounded"
            @change="(e) => jobStore.setJobType(e.target.value)"
          >
            <option value="">All Jobs</option>
            <option v-for="type in jobStore.jobTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </label>
        <label class="block mb-2">
          <span class="text-gray-700">Job Locations</span>
          <select
            class="w-full p-2 border rounded"
            @change="(e) => jobStore.setJobLocation(e.target.value)"
          >
            <option value="">All Locations</option>
            <option
              v-for="location in jobStore.jobLocations"
              :key="type"
              :value="type"
            >
              {{ location }}
            </option>
          </select>
        </label>
      </div>

      <div class="flex-1 p-4 bg-sky-500">
        <slot />
      </div>
    </div>

    <footer class="bg-gray-900 text-white text-center py-4 mt-auto">
      <p>© 2025 Job Search | All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useJobStore } from "~/stores/jobStore";

const jobStore = useJobStore();
const selectedJobType = ref("");
const search = ref();
</script>
