<script setup lang="ts">
import { createPinia } from "pinia";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

// Load saved language from localStorage
const pinia = createPinia();
</script>

<template>
  <div>
    <NuxtLayout :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="font-sans">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
