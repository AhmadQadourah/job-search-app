<template>
  <v-card
    class="min-h-[350px]"
    :title="job.name"
    :description="job.company?.name || 'Company not specified'"
    footerClasses="justify-between"
  >
    <template #default>
      <NuxtLink :to="`/job/${job.id}`">
        <p>{{ job.locations?.[0]?.name || "Location not specified" }}</p>
        <p class="mt-1">
          Date Published:
          {{ new Date(job.publication_date).toLocaleDateString() || "No date" }}
        </p>
        <div v-html="jobPreview" class="text-sm text-gray-700 mt-1"></div>
      </NuxtLink>
    </template>

    <template #actions>
      <v-button @click="toggleFavorite(job)" accent="danger" outline size="sm">
        {{ isFavorite ? "❤️ Unfavorite" : "🤍 Favorite" }}
      </v-button>
      <v-button size="sm">
        <a :href="job.refs.landing_page" target="_blank"> Apply Now </a>
      </v-button>
    </template>
  </v-card>
</template>

<script setup>
import { useJobStore } from "~/stores/jobStore";

const jobStore = useJobStore();
const props = defineProps({
  job: Object,
});

const isFavorite = computed(() =>
  jobStore.favorites.some((fav) => fav.id === props.job.id)
);
const toggleFavorite = () => jobStore.toggleFavorite(props.job);

const jobPreview = computed(() => {
  return props.job.contents.length > 200
    ? props.job.contents.substring(0, 200) + "..."
    : props.job.contents;
});

onMounted(() => {
  jobStore.loadFavorites();
});
</script>
