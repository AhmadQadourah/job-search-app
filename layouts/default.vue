<template>
  <div
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
    class="flex flex-col min-h-screen bg-gray-100"
  >
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 shadow sticky top-0 z-50"
    >
      <div
        class="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 gap-2"
      >
        <h1 class="text-2xl font-bold text-center sm:text-left">
          {{ t("jobSearch") }}
        </h1>

        <!-- Navigation -->
        <nav class="flex space-x-6 justify-center sm:justify-start">
          <NuxtLink to="/" class="hover:underline transition">{{
            t("home")
          }}</NuxtLink>
          <NuxtLink to="/about" class="hover:underline transition">{{
            t("about")
          }}</NuxtLink>
          <NuxtLink to="/favorites" class="hover:underline transition">{{
            t("favorites")
          }}</NuxtLink>
        </nav>

        <!-- Language Switcher -->
        <div class="flex space-x-4 justify-center sm:justify-start">
          <button
            @click="changeLanguage('en')"
            :class="locale === 'en' ? 'font-bold underline' : ''"
            class="hover:underline transition"
          >
            EN
          </button>
          <button
            @click="changeLanguage('ar')"
            :class="locale === 'ar' ? 'font-bold underline' : ''"
            class="hover:underline transition"
          >
            العربية
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div
      class="flex flex-1 container mx-auto px-4 gap-6 mt-4 flex-col md:flex-row"
    >
      <!-- Filters Section -->
      <div
        class="w-full md:w-1/4 bg-white p-6 rounded-lg shadow flex-shrink-0 md:sticky md:top-[5rem] md:h-[calc(100vh-5rem)] md:overflow-auto"
      >
        <h2 class="text-xl font-semibold mb-4">{{ t("filters") }}</h2>
        <div class="mb-4">
          <v-input
            v-model="searchInput"
            :placeholder="t('searchJobs')"
            class="w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">{{
            t("jobLevels")
          }}</label>
          <select
            class="w-full p-2 border border-gray-300 rounded"
            @change="(e) => jobStore.setJobType(e.target.value)"
          >
            <option value="">{{ t("allJobs") }}</option>
            <option v-for="type in jobStore.jobTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">{{
            t("jobLocations")
          }}</label>
          <select
            class="w-full p-2 border border-gray-300 rounded"
            @change="(e) => jobStore.setJobLocation(e.target.value)"
          >
            <option value="">{{ t("allLocations") }}</option>
            <option
              v-for="location in jobStore.jobLocations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>
        </div>
      </div>

      <!-- Job List Section -->
      <section class="w-full md:flex-1 overflow-auto">
        <slot />
      </section>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center py-4 mt-auto">
      <p>© 2025 {{ t("jobSearch") }} | {{ t("allRightsReserved") }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useJobStore } from "../stores/jobStore";
import debounce from "lodash/debounce";
import { useI18n } from "vue-i18n";

const { locale, setLocale, t } = useI18n();
const changeLanguage = (lang) => {
  setLocale(lang);
};

const jobStore = useJobStore();
const searchInput = ref(jobStore.searchQuery);

const debouncedUpdate = debounce((value) => {
  jobStore.searchQuery = value;
}, 700);

watch(searchInput, (newValue) => {
  debouncedUpdate(newValue);
});
</script>
