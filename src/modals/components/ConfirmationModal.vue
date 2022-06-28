<template>
  <div class="fixed inset-0 overflow-y-auto" :style="{ zIndex: modal.zIndex }" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition enter-active-class="ease-out duration-300"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="ease-in duration-200"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
      >
        <div v-show="active" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      </transition>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <transition enter-active-class="ease-out duration-300"
                  enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                  leave-active-class="ease-in duration-200"
                  leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                  leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div v-show="active" class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 dark:bg-gray-800">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                 :class="classes.iconWrapper"
            >
              <svg class="h-6 w-6" :class="classes.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
                {{ modal.modal.title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400" v-html="modal.modal.message"></p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button v-if="modal.modal.buttons.confirm"
                    type="button"
                    class="btn justify-center w-full sm:w-auto sm:ml-3"
                    :class="classes.button"
                    @click="confirm"
            >
              {{ modal.modal.buttons.confirm }}
            </button>
            <button v-if="modal.modal.buttons.cancel"
                    type="button"
                    class="btn btn-default justify-center w-full mt-3 sm:w-auto sm:mt-0"
                    @click="cancel"
            >
              {{ modal.modal.buttons.cancel }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue';
import { useConfirmationModal } from '../composables/modals';

const props = defineProps({
  modal: {
    required: true,
    type: Object,
  },
});

const { active, confirm, cancel } = useConfirmationModal(props.modal.id, props.modal.modal);

const classes = computed(() => {
  switch (props.modal.modal.accent) {
    case 'danger':
      return {
        button: ['btn-danger'],
        iconWrapper: ['bg-red-100'],
        icon: ['text-red-600'],
      };
    case 'warning':
      return {
        button: ['btn-warning'],
        iconWrapper: ['bg-yellow-100'],
        icon: ['text-yellow-600'],
      };
  }

  return {
    button: ['btn-primary'],
    iconWrapper: ['bg-primary-100'],
    icon: ['text-primary-600'],
  };
});

onMounted(() => nextTick(() => {
  active.value = true;
}));
</script>
