<template>
  <div class="container mx-auto p-4 max-w-5xl">
    <div v-if="jobs.length === 0 && loading">
      <loader />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      <JobCard v-for="job in filteredJobs" :job="job" :key="job.id" />
    </div>

    <div ref="loadMoreTrigger" class="h-1"></div>

    <div v-if="jobs.length > 0 && loading" class="text-center mt-2">
      <loader />
    </div>
    <div v-if="!filteredJobs.length && !loading">
      <noResult />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { memoizeService } from "~/services/memoizeService";
import { useJobStore } from "../stores/jobStore";
const jobs = ref([]);
const page = ref(0);
const loading = ref(false);
const jobStore = useJobStore();
const fetchJobs = async (pageValue) => {
  if (loading.value) return;
  loading.value = true;
  try {
    const data = await memoizeService.memoize(
      `jobs-page-${pageValue}`,
      () =>
        $fetch("https://www.themuse.com/api/public/jobs", {
          query: {
            page: pageValue,
            api_key:
              "ebbec8cfc5001cc88004b85141cb7e4227f5ad65b0c758a0a4f0132aaa715cca",
          },
        }),
      300000
    );
    if (data?.results?.length) {
      jobs.value.push(...data.results);
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
  } finally {
    loading.value = false;
  }
};

const { data: initialData } = await useAsyncData(
  "jobs-page-0",
  () =>
    memoizeService.memoize(
      "jobs-page-0",
      () =>
        $fetch("https://www.themuse.com/api/public/jobs", {
          query: {
            page: 0,
            api_key:
              "ebbec8cfc5001cc88004b85141cb7e4227f5ad65b0c758a0a4f0132aaa715cca",
          },
        }),
      300000
    ),
  { lazy: true }
);

if (initialData.value?.results) {
  jobs.value = initialData.value.results;
}

const loadMoreTrigger = ref(null);
const loadMore = () => {
  page.value++;
  fetchJobs(page.value);
};

const filteredJobs = computed(() => {
  return jobs.value
    .sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
    .filter((job) => {
      const jobName = job.name?.toLowerCase() || "";
      const searchQuery = jobStore.searchQuery.toLowerCase();
      return (
        jobName.includes(searchQuery) &&
        (jobStore.jobType === "" || job.levels[0].name == jobStore.jobType) &&
        (jobStore.jobLocation === "" ||
          job.locations[0].name == jobStore.jobLocation)
      );
    });
});

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

watch(
  () => filteredJobs.value,
  (to) => jobStore.setJobs(to),
  { deep: true, immediate: true }
);
</script>
