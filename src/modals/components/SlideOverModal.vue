<template>
  <div class="fixed inset-0 overflow-hidden" :style="{ zIndex: modal.zIndex }" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <transition enter-active-class="ease-in-out duration-500"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="ease-in-out duration-500"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
      >
        <div v-show="active"
             class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity cursor-pointer"
             aria-hidden="true"
             @click="close"
        ></div>
      </transition>

      <div class="fixed inset-y-0 right-0 max-w-full flex sm:pl-16">
        <transition enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
                    enter-from-class="translate-x-full"
                    enter-to-class="translate-x-0"
                    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
                    leave-from-class="translate-x-0"
                    leave-to-class="translate-x-full"
        >
          <div v-show="active" class="w-screen max-w-2xl">
            <div class="h-full flex flex-col bg-gray-100 dark:bg-gray-600 shadow-xl overflow-y-scroll" :id="`${modal.id}-body`">
              <div class="py-6 px-4 bg-primary-500 sm:px-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-medium text-white" id="slide-over-title">
                    {{ modal.modal.title }}
                  </h2>
                  <div class="ml-3 h-7 flex items-center">
                    <button type="button"
                            class="bg-primary-500 rounded-md text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            @click="close"
                    >
                      <span class="sr-only">Закрыть панель</span>
                      <!-- Heroicon name: outline/x -->
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="modal.modal.message" class="mt-1">
                  <p class="text-sm text-white" v-html="modal.modal.message"></p>
                </div>
              </div>
              <div class="pt-6 relative flex-1 px-4 sm:px-6 bg-gray-100 dark:bg-gray-600">
                <component :key="modal.id"
                           :is="modal.modal.component"
                           v-bind="modal.modal.props"
                           :modal-body-id="`${modal.id}-body`"
                           @slide-over:saved="saved"
                           @slide-over:close="close"
                           @slide-over:confirmation="setForceClose"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import { useSlideOverModal } from '../composables/modals';

const props = defineProps({
  modal: {
    required: true,
    type: Object,
  },
});

const {
  active,
  setForceClose,
  saved,
  close,
} = useSlideOverModal(props.modal.id, props.modal.modal);

onMounted(() => nextTick(() => {
  active.value = true;
}));
</script>
