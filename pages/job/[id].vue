<template>
  <div class="container mx-auto p-4 max-w-5xl">
    <div v-if="loading">
      <loader />
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-xl py-10">
      {{ error.message || "Job not found." }}
    </div>

    <div v-else>
      <NuxtLink
        v-if="fromFavorites"
        to="/favorites"
        class="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back to Favorites
      </NuxtLink>
      <NuxtLink
        v-else
        to="/"
        class="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back to Jobs
      </NuxtLink>
      <v-card noHover>
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-2">{{ jobData.name }}</h1>

          <div class="flex flex-wrap items-center text-gray-600 mb-4 text-sm">
            <span class="mr-2 font-bold">{{ jobData.company?.name }}</span>
            <span class="mx-2">|</span>
            <span>{{
              jobData.locations?.[0]?.name || "Location not specified"
            }}</span>
            <span class="mx-2">|</span>
            <span
              v-if="jobData.levels?.length"
              class="font-semibold text-gray-800"
            >
              {{ jobData.levels[0]?.name }}
            </span>
          </div>

          <h6 class="my-2">
            <span class="font-bold">Publish Date:</span>
            {{ new Date(jobData.publication_date).toLocaleDateString() }}
          </h6>

          <div class="my-4" v-html="jobData.contents"></div>

          <div class="mt-6">
            <a
              :href="jobData.refs?.landing_page"
              target="_blank"
              class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Apply Now
            </a>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { memoizeService } from "~/services/memoizeService";

const route = useRoute();
const router = useRouter();
const jobId = route.params.id as string;

const jobData = ref<any>(null);
const loading = ref(true);
const error = ref<any>(null);

const fromFavorites = computed(() => {
  return router.options.history.state.back == "/favorites";
});

onMounted(async () => {
  try {
    const data = await memoizeService.memoize(
      `job-${jobId}`,
      () => $fetch(`https://www.themuse.com/api/public/jobs/${jobId}`),
      300000
    );
    jobData.value = data;
  } catch (err: any) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>
