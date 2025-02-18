<template>
  <div class="flex flex-col items-center justify-center h-64 bg-gray-100 p-6">
    <span class="text-5xl text-gray-400 m-3">🔍</span>
    <h2 class="text-xl font-semibold text-gray-700">{{ t("noResults") }}</h2>
    <p class="text-gray-500">{{ t("tryAnotherSearch") }}</p>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
