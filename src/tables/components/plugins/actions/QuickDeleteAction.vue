<template>
  <button type="button"
          :title="action.title"
          :class="action.classes"
          @click="deleteItem"
  >
    <i :class="action.icon"></i>
  </button>
</template>

<script setup>
import { useDeletesResource } from '@/api/composables/resources.js';

const props = defineProps({
  action: {
    required: true,
    type: Object,
  },
});

const emit = defineEmits(['deleting', 'deleted', 'refresh']);
const deleted = () => {
  emit('deleted', props.action);
  emit('refresh');
};

const { deleteItem } = useDeletesResource(props.action, emit, deleted);
</script>
