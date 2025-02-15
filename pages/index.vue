<template>
  <div>Hello from index</div>
  inp >>> {{ inp }}
  <v-input v-model="inp" label="INPUT 1" size="sm" />
  <v-card>
    <h6>CARD !!</h6>
    <h3>asdsadsa</h3>
    <template #actions>
      <div class="flex justify-between">
        <v-button outline size="sm">Click me</v-button>
        <v-button outline size="sm">Click me</v-button>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
const inp = ref();
const { data, status, error } = useFetch(
  "https://www.themuse.com/api/public/jobs",
  {
    query: { page: 1 },
  }
);

const jobs = computed(() => data.value?.results || []);
</script>
