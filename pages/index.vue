<template>
  <div v-if="status1 == 'pending'">
    <h6>Loading ....</h6>
  </div>
  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
  >
    <JobCard v-for="job in filteredJobs" :job="job" :key="job.id" />
  </div>
  <div ref="loadMoreTrigger" class="h-1"></div>
  <div v-if="!filteredJobs.length && status1 == !'pending'">
    <noResult />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useJobStore } from "~/stores/jobStore";

const jobStore = useJobStore();
const page = ref(0);
const status1 = ref("pending");
const fetchJobs = async () => {
  try {
    const { data, status } = await useFetch(
      "https://www.themuse.com/api/public/jobs",
      {
        query: {
          page: page.value,
          api_key:
            "ebbec8cfc5001cc88004b85141cb7e4227f5ad65b0c758a0a4f0132aaa715cca",
        },
      }
    );
    status1.value = status.value;

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
  return jobStore.jobsArr
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
const loadMoreTrigger = ref(null);
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreJobs();
    }
  });
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

fetchJobs();
</script>
