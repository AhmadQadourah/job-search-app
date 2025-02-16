<template>
  <div class="flex flex-wrap">
    <job-list
      v-for="job in filteredJobs"
      :job="job"
      :key="job.id"
      class="w-1/4"
    />
    <v-button accent="dark" outline @click="loadMoreJobs">Load more</v-button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useJobStore } from "~/stores/jobStore";

const jobStore = useJobStore();
const page = ref(0);

// Fetch Jobs
const fetchJobs = async () => {
  try {
    const { data } = await useFetch("https://www.themuse.com/api/public/jobs", {
      query: {
        page: page.value,
        api_key:
          "ebbec8cfc5001cc88004b85141cb7e4227f5ad65b0c758a0a4f0132aaa715cca",
      },
    });

    if (data.value) {
      jobStore.setJobs(data.value.results);
    }
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
  }
};

const loadMoreJobs = () => {
  page.value++;
  console.log(jobStore.jobType);
  fetchJobs();
};

const filteredJobs = computed(() => {
  return jobStore.jobsArr.filter((job) => {
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

fetchJobs();
</script>
