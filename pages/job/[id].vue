<template>
  <div class="container mx-auto p-4">
    <div v-if="status == 'success'">
      <NuxtLink to="/" class="inline-block mb-4 text-black-500 hover:underline">
        ← Back to Jobs
      </NuxtLink>
      <v-card noHover>
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-2">{{ job.name }}</h1>

          <div class="flex flex-wrap items-center text-gray-600 mb-4 text-sm">
            <span class="mr-2 font-bold"> {{ job.company.name }}</span>
            <span class="mx-2">|</span>
            <span>{{
              job.locations[0]?.name || "Location not specified"
            }}</span>
            <span class="mx-2">|</span>
            <template v-if="job.levels && job.levels.length">
              <span class="font-semibold text-gray-800">{{
                job.levels[0].name
              }}</span>
            </template>
          </div>
          <h6 class="my-2">
            <span class="font-bold"> Publish Date :</span>
            {{ new Date(job.publication_date).toLocaleDateString() }}
          </h6>
          <div class="my-2" v-html="job.contents"></div>

          <div class="mt-6">
            <a
              :href="job.refs.landing_page"
              target="_blank"
              class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Apply Now
            </a>
          </div>
        </div>
      </v-card>
    </div>

    <div v-else-if="status == 'pending'">Loading....</div>
    <div v-else class="text-center text-red-500 text-xl py-10">
      Job not found.
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const jobId = route.params.id;

const {
  data: job,
  status,
  error,
} = useFetch(`https://www.themuse.com/api/public/jobs/${jobId}`);
</script>
