import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useJobStore } from "../stores/jobStore";
import DefaultLayout from "./default.vue";
import { createI18n, useI18n } from "vue-i18n";
import { nextTick } from "vue";
const NuxtLink = {
  template: "<a><slot /></a>",
};

// Mock `v-input`
const VInput = {
  props: ["modelValue"],
  template: `<input 
      type="text" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
    />`,
};
import { createI18n } from "vue-i18n";
import en from "../i18n/locales/en.json";
import ar from "../i18n/locales/ar.json";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, ar },
});

describe("DefaultLayout.vue", () => {
  let wrapper;
  let jobStore;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = mount(DefaultLayout, {
      global: {
        plugins: [createPinia(), i18n],
        components: {
          NuxtLink,
          "v-input": VInput,
        },
      },
    });

    jobStore = useJobStore();
  });

  it("updates store.SearchQuery", async () => {
    const kok = wrapper.find("input");

    await kok.setValue("Software Engineer");
    await nextTick();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(jobStore.searchQuery).toBe("Software Engineer");
  });
  it("renders job level and location filters", () => {
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("renders navigation links", () => {
    const links = wrapper.findAllComponents(NuxtLink);
    expect(links.length).toBe(2);
    expect(links[0].text()).toBe("Home");
    expect(links[1].text()).toBe("About");
  });
});
