<template>
  <div class="bg-white dark:bg-gray-600 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
    <div v-if="hasPages" class="flex-1 flex sm:hidden">
      <a href="javascript:;"
         class="relative inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:text-opacity-60 dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-opacity-100"
         @click="selectPreviousPage"
      >
        Пред.
      </a>
      <a href="javascript:;"
         class="ml-3 relative inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:text-opacity-60 dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-opacity-100"
         @click="selectNextPage"
      >
        След.
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-white dark:text-opacity-60">
          {{ showingLabel }}
          <span class="font-medium">{{ pagination.count }}</span>
          из
          <span class="font-medium">{{  pagination.total }}</span>
          {{ resultsLabel }}
        </p>
      </div>
      <div v-if="hasPages">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Страницы">
          <a href="javascript:;"
             class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:text-opacity-60 dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-opacity-100"
             @click="selectPreviousPage"
          >
            <span class="sr-only">Предыдущая</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </a>
          <template v-for="element in pagination.elements">
            <a v-if="element.type === 'page'"
               href="javascript:;"
               :aria-current="element.active"
               class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
               :class="{
                 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-gray-800 dark:text-primary-400 dark:border-primary-300': element.active,
                 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:text-opacity-60 dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-opacity-100': !element.active,
               }"
               @click="selectPage(element.page)"
            >
              {{ element.page }}
            </a>
            <span v-else-if="element.type === 'placeholder'"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-60"
            >
              ...
            </span>
          </template>
          <a href="javascript:;"
             class="relative px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:text-opacity-60 dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-opacity-100"
             @click="selectNextPage"
          >
            <span class="sr-only">Следующая</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePagination } from '../composables/pagination';

const props = defineProps({
  pagination: {
    required: true,
    type: Object,
  },

  modelValue: {
    required: false,
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:modelValue']);

const {
  hasPages,
  showingLabel,
  resultsLabel,
  selectPage,
  selectNextPage,
  selectPreviousPage,
} = usePagination(props.pagination, emit);
</script>
