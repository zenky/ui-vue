<template>
  <div class="mt-10 flex flex-row-reverse gap-x-4">
    <template v-for="button in buttons" :key="`form-${button.type}-button`">
      <template v-if="button.type === 'destroy' && !quickEdit">
        <DestroyButton :action="button"
                       @deleting="$emit('deleting')"
                       @deleted="$emit('deleted')"
        />
      </template>
      <template v-else-if="button.type === 'cancel'">
        <a v-if="!quickEdit"
           :href="button.url"
           class="btn btn-default"
        >
          {{ button.label }}
        </a>
        <button v-else type="button" class="btn btn-default" @click="$emit('cancel')">
          {{ button.label }}
        </button>
      </template>
      <button v-else-if="button.type === 'submit'"
              type="button"
              class="btn btn-primary"
              @click="$emit('submit')"
              :disabled="formIsBusy"
      >
        <template v-if="formIsBusy">
          <i class="fa-light fa-spinner fa-spin mr-1"></i>
          <template>Пожалуйста, подождите...</template>
        </template>
        <template v-else>{{ button.label }}</template>
      </button>
    </template>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const DestroyButton = defineAsyncComponent(() => import('./DestroyButton.vue'));

defineProps({
  buttons: {
    required: true,
    type: Array,
  },

  quickEdit: {
    required: false,
    type: Boolean,
    default: false,
  },

  formIsBusy: {
    required: false,
    type: Boolean,
    default: false,
  },
});

defineEmits(['deleting', 'deleted', 'cancel', 'submit']);
</script>
