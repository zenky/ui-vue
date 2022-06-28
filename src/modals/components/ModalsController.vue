<template>
  <div v-if="hasVisibleModals">
    <template v-for="modal in visibleModals" :key="`modal-${modal.id}`">
      <ConfirmationModal v-if="modal.type === 'confirmation'" :modal="modal"/>
      <SlideOverModal v-else-if="modal.type === 'slideover'" :modal="modal"/>
      <BasicModal v-else-if="modal.type === 'modal'" :modal="modal"/>
    </template>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useModals } from '../stores/modals';

const ConfirmationModal = defineAsyncComponent(() => import('./ConfirmationModal.vue'));
const SlideOverModal = defineAsyncComponent(() => import('./SlideOverModal.vue'));
const BasicModal = defineAsyncComponent(() => import('./Modal.vue'));
const {
  hasVisibleModals,
  visibleModals,
} = storeToRefs(useModals());
</script>
