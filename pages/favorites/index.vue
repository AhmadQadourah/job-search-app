<template>
  <v-card v-if="!fav.length && !loading" noHover>
    <div class="flex flex-col items-center justify-center h-64 bg-gray-100 p-6">
      <h1 class="font-semibold">{{ t("noFavoritesList") }}</h1>
      <NuxtLink to="/" class="hover:underline transition flex">
        <h6 class="font-bold mt-3">
          {{ t("exploreJobs") }}
        </h6>
      </NuxtLink>
    </div>
  </v-card>

  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
  >
    <JobCard v-for="job in fav" :job="job" :key="job.id" />
  </div>
</template>

<script setup>
import { useJobStore } from "../../stores/jobStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const jobStore = useJobStore();
const fav = computed(() => jobStore.favorites);
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  jobStore.loadFavorites();
  loading.value = false;
});
</script>
