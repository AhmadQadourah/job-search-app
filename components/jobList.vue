<template>
  <div>
    <v-card>
      <div>{{ job.locations[0].name }}</div>
      <div>{{ job.id }}</div>
      <div>{{ job.type }}</div>
      <div>{{ job.levels[0].name }}</div>
    </v-card>
  </div>
</template>

<script setup>
import { useJobStore } from "~/stores/jobStore";

const jobStore = useJobStore();
defineProps({
  job: Object,
});
</script>
