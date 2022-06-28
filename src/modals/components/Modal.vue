<template>
  <div class="fixed inset-0 overflow-y-auto" :style="{ zIndex: modal.zIndex }" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition enter-active-class="ease-out duration-300"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="ease-in duration-200"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
      >
        <div v-show="active"
             class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
             :class="{ 'cursor-pointer': closeOnOverlayClick }"
             aria-hidden="true"
             @click="handleOverlayClick"
        ></div>
      </transition>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <transition enter-active-class="ease-out duration-300"
                  enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                  leave-active-class="ease-in duration-200"
                  leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                  leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div v-show="active"
             class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full dark:bg-gray-800"
             :class="widthClasses"
        >
          <component :key="modal.id"
                     :is="modal.modal.component"
                     v-bind="modal.modal.props"
                     :modal-body-id="`${modal.id}-body`"
                     @close="close"
                     @update="handleUpdateEvent"
          ></component>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue';
import { useBasicModal} from '../composables/modals';

const props = defineProps({
  modal: {
    required: true,
    type: Object,
  },
});

const { active, close } = useBasicModal(props.modal.id, props.modal.modal);
const closeOnOverlayClick = computed(() => props.modal.modal.closeOnOverlayClick === true);

const handleOverlayClick = () => {
  if (closeOnOverlayClick.value) {
    close();
  }
};

const handleUpdateEvent = ($event) => {
  if (!$event.type) {
    return;
  } else if (typeof props.modal.modal.events === 'undefined') {
    return;
  } else if (typeof props.modal.modal.events[$event.type] !== 'function') {
    return;
  }

  props.modal.modal.events[$event.type].call(null, $event.payload || null);
};

const widthClasses = computed(() => {
  if (!props.modal.modal.width) {
    return 'sm:max-w-3xl';
  }

  return props.modal.modal.width;
});

onMounted(() => nextTick(() => {
  active.value = true;
}));
</script>
