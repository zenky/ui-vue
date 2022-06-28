<template>
  <FieldWrapper v-bind="$props" :error-message="errorMessage">
    <div class="w-full">
      <div class="flex flex-wrap gap-4">
        <label v-for="color in options"
               :key="`${id}-color-${color.id}`"
               class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none shadow"
               :class="color.styling.label.classes"
               :style="color.styling.label.style"
               :title="color.name"
        >
          <input type="radio"
                 :value="color.id"
                 class="sr-only"
                 :aria-labelledby="`${id}-color-${color.id}-label`"
                 v-model="value"
          >
          <p :id="`${id}-color-${color.id}-label`" class="sr-only">{{ color.name }}</p>
          <span aria-hidden="true"
                class="h-8 w-8 border border-black border-opacity-10 rounded-full"
                :class="color.styling.selector.classes"
                :style="color.styling.selector.style"
          ></span>
        </label>
      </div>
    </div>
  </FieldWrapper>
</template>

<script setup>
import { useFieldProps, useField } from '@/forms/composables/fields.js';
import { computed } from 'vue';

const props = defineProps(useFieldProps());
const emit = defineEmits(['update:modelValue']);
const {
  value,
  errorMessage,
} = useField(props, emit, () => null);

const options = computed(() => {
  if (!props.settings.classes) {
    return props.settings.options.map((color) => ({
      ...color,
      styling: {
        label: {
          style: { color: color.color },
          classes: ['ring-current', color.id === value.value ? 'ring ring-offset-1' : ''],
        },
        selector: {
          style: { backgroundColor: color.color },
          classes: [],
        },
      },
    }));
  }

  return props.settings.options.map((color) => ({
    ...color,
    styling: {
      label: {
        style: {},
        classes: [`ring-${color.type}-${color.shade}`, color.id === value.value ? 'ring ring-offset-1' : ''],
      },
      selector: {
        style: {},
        classes: [`bg-${color.type}-${color.shade}`],
      },
    },
  }));
});
</script>
