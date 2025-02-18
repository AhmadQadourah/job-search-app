<template>
  <div
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
    class="flex flex-col min-h-screen bg-gray-100"
  >
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 shadow sticky top-0"
    >
      <div
        class="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 gap-2"
      >
        <h1 class="text-2xl font-bold">{{ t("jobSearch") }}</h1>

        <nav class="flex space-x-6">
          <NuxtLink to="/" class="hover:underline transition">{{
            t("home")
          }}</NuxtLink>
          <NuxtLink to="/about" class="hover:underline transition">{{
            t("about")
          }}</NuxtLink>
        </nav>

        <!-- Language Switcher -->
        <div class="flex space-x-4">
          <button
            @click="changeLanguage('en')"
            :class="locale === 'en' ? 'font-bold' : ''"
            class="hover:underline transition"
          >
            EN
          </button>
          <button
            @click="changeLanguage('ar')"
            :class="locale === 'ar' ? 'font-bold' : ''"
            class="hover:underline transition"
          >
            العربية
          </button>
        </div>
      </div>
    </header>

    <div
      class="container mx-auto flex-1 flex flex-col md:flex-row mt-6 px-4 gap-6"
    >
      <div class="w-full md:w-1/4 bg-white p-6 rounded-lg shadow flex-shrink-0">
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

      <section class="w-full md:flex-1">
        <slot />
      </section>
    </div>

    <footer class="bg-gray-800 text-white text-center py-4 mt-auto">
      <p>© 2025 {{ t("jobSearch") }} | {{ t("allRightsReserved") }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useJobStore } from "~/stores/jobStore";
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
}, 500);

watch(searchInput, (newValue) => {
  debouncedUpdate(newValue);
});
</script>
