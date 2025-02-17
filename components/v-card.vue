<template>
  <div :class="[computedClasses, 'flex flex-col h-full']">
    <img
      v-if="image"
      :src="image"
      :alt="title"
      class="w-full h-40 object-cover"
    />

    <div class="p-4 flex flex-col flex-1">
      <h3 v-if="title" class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h3>
      <p v-if="description" class="text-gray-600 mt-1">
        {{ description }}
      </p>

      <div class="flex-1 mt-4">
        <slot />
      </div>

      <div
        v-if="$slots.actions"
        :class="[
          footerClasses,
          'mt-auto flex gap-2 pt-4 border-t border-gray-200',
        ]"
      >
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  variant: { type: String, default: "elevated" },
  rounded: { type: String, default: "md" },
  shadow: { type: String, default: "md" },
  footerClasses: { type: String, default: "" },
  noHover: { type: Boolean, default: false },
});

const computedClasses = computed(() => {
  const base = `overflow-hidden transition-transform ${
    !props.noHover && "hover:scale-[.98] duration-200"
  }`;

  const variantClasses = {
    elevated: "bg-white shadow-lg border border-gray-200",
    outlined: "border border-gray-300 bg-white",
    bordered: "border-2 border-gray-400 bg-white",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return [
    base,
    variantClasses[props.variant],
    roundedClasses[props.rounded],
    shadowClasses[props.shadow],
  ].join(" ");
});
</script>
