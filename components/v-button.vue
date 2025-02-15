<template>
  <button
    :class="computedClasses"
    :type="type"
    @click="onClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  type: { type: String, default: "button" },
  accent: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  outline: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);
const { disabled, size, accent, type, outline } = toRefs(props);

const onClick = () => {
  if (!disabled.value) emit("click");
};

const computedClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition focus:outline-none border shadow-md";

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const accentClasses = {
    primary: outline.value
      ? "border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white"
      : "bg-blue-500 text-white hover:bg-blue-600",
    secondary: outline.value
      ? "border-gray-600 text-gray-600 bg-transparent hover:bg-gray-600 hover:text-white"
      : "bg-gray-600 text-white hover:bg-gray-700",
    success: outline.value
      ? "border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white"
      : "bg-green-500 text-white hover:bg-green-600",
    danger: outline.value
      ? "border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
      : "bg-red-500 text-white hover:bg-red-600",
    warning: outline.value
      ? "border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black"
      : "bg-yellow-500 text-black hover:bg-yellow-600",
    info: outline.value
      ? "border-cyan-500 text-cyan-500 bg-transparent hover:bg-cyan-500 hover:text-white"
      : "bg-cyan-500 text-white hover:bg-cyan-600",
    light: outline.value
      ? "border-gray-300 text-gray-500 bg-transparent hover:bg-gray-200 hover:text-black"
      : "bg-gray-200 text-black hover:bg-gray-300",
    dark: outline.value
      ? "border-black text-black bg-transparent hover:bg-black hover:text-white"
      : "bg-black text-white hover:bg-gray-900",
    link: "text-blue-500 underline bg-transparent hover:text-blue-700 border-none",
  };

  return `${base} ${sizeClasses[size.value]} ${
    accentClasses[accent.value] || accentClasses.primary
  } ${disabled.value ? "cursor-not-allowed opacity-50" : ""}`;
});
</script>
