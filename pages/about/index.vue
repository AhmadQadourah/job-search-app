<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-4">{{ t("aboutUs") }}</h1>
    <p class="text-center text-gray-600 max-w-2xl mx-auto">
      {{ $t("aboutDescription") }}
    </p>

    <v-card class="mt-3" no-hover>
      <h2 class="text-xl font-semibold mb-2">{{ t("ourMission") }}</h2>
      <p class="text-gray-700">
        {{ t("missionText") }}
      </p>
    </v-card>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
