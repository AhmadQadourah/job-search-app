<template>
  <div class="flex flex-col w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <div class="relative w-full">
      <span
        v-if="icon"
        class="absolute inset-y-0 left-3 flex items-center text-gray-500"
      >
        <slot name="icon"></slot>
      </span>

      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="computedClasses"
        class="w-full"
      />

      <p v-if="error" class="text-red-500 text-sm mt-1">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  },
  modelValue: { type: String, default: "" },
  type: { type: String, default: "text" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Enter text..." },
  size: { type: String, default: "md" },
  variant: { type: String, default: "outlined" },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: "" },
  icon: { type: Boolean, default: false },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedClasses = computed(() => {
  const base = "px-4 py-2 border rounded-md transition focus:outline-none";

  const sizeClasses = {
    sm: "text-sm py-1 px-2",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-5",
  };

  const variantClasses = {
    outlined: "border-gray-300 focus:ring-2 focus:ring-blue-500",
    filled: "bg-gray-100 border-none focus:ring-2 focus:ring-blue-500",
    underlined: "border-b-2 border-gray-300 rounded-none focus:border-blue-500",
  };

  return `${base} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${
    props.disabled ? "bg-gray-200 cursor-not-allowed" : "focus:ring"
  } ${props.icon ? "pl-10" : ""}`;
});
</script>
