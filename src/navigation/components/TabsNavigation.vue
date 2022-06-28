<template>
  <div>
    <div class="sm:hidden">
      <label :for="`${prefix}-tabs-navigation-tabs`" class="sr-only">Выберите страницу</label>
      <select :id="`${prefix}-tabs-navigation-tabs`"
              class="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
              @change="redirect($event.target.value)"
      >
        <option v-for="item in items" :value="item.url" :selected="item.active">
          {{ item.title }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Страницы">
          <template v-for="item in items">
            <a v-if="item.active"
               :href="noRedirects ? 'javascript:;' : item.url"
               class="border-primary-500 text-primary-500 dark:border-primary-300 dark:text-primary-400 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
               @click="$emit('selected', item.url)"
            >
              <i v-if="item.icon"
                 class="text-primary-500 dark:text-primary-400 !leading-revert -ml-0.5 mr-2 h-5 w-5"
                 :class="item.icon"
              ></i>
              <span>{{ item.title }}</span>
            </a>
            <a v-else
               :href="noRedirects ? 'javascript:;' : item.url"
               class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
               @click="$emit('selected', item.url)"
            >
              <i v-if="item.icon"
                 class="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 !leading-revert -ml-0.5 mr-2 h-5 w-5"
                 :class="item.icon"
              ></i>
              <span>{{ item.title }}</span>
            </a>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useNavigation, useNavigationProps } from '@/navigation/composables/navigation.js';

const props = defineProps(useNavigationProps('tabs-navigation'));
const emit = defineEmits(['selected']);
const { redirect } = useNavigation(props, emit);
</script>
