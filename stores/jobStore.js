import { defineStore } from "pinia";

export const useJobStore = defineStore("jobStore", {
  state: () => ({
    searchQuery: "",
    jobsArr: [],
    jobType: "",
    jobLocation: "",
  }),
  getters: {
    jobTypes(state) {
      return [...new Set(state.jobsArr.map((job) => job.levels[0].name))];
    },
    jobLocations(state) {
      return [...new Set(state.jobsArr.map((job) => job.locations[0].name))];
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setJobType(type) {
      this.jobType = type;
    },
    setJobLocation(location) {
      this.jobLocation = location;
    },
    setJobs(jobs) {
      const jobIds = new Set(this.jobsArr.map((job) => job.id));
      const newJobs = jobs.filter((job) => !jobIds.has(job.id));
      this.jobsArr.push(...newJobs);
    },
  },
});
