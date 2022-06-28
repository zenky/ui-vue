<template>
  <div>
    <div class="sm:hidden">
      <label :for="`${prefix}-pills-navigation-tabs`" class="sr-only">Выберите страницу</label>
      <select :id="`${prefix}-pills-navigation-tabs`"
              class="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 dark:border-gray-500"
              @change="redirect($event.target.value)"
      >
        <option v-for="item in items" :value="item.url" :selected="item.active">
          {{ item.title }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Страницы">
        <template v-for="item in items">
          <a v-if="item.active"
             :href="noRedirects ? 'javascript:;' : item.url"
             class="bg-primary-500 text-white px-3 py-2 font-medium text-sm rounded-md"
             aria-current="page"
             @click="$emit('selected', item.url)"
          >
            <i v-if="item.icon" class="mr-1" :class="item.icon"></i>
            {{ item.title }}
          </a>
          <a v-else
             :href="noRedirects ? 'javascript:;' : item.url"
             class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-2 font-medium text-sm rounded-md"
             @click="$emit('selected', item.url)"
          >
            <i v-if="item.icon" class="mr-1" :class="item.icon"></i>
            {{ item.title }}
          </a>
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useNavigation, useNavigationProps } from '@/navigation/composables/navigation.js';

const props = defineProps(useNavigationProps('pills-navigation'));
const emit = defineEmits(['selected']);
const { redirect } = useNavigation(props, emit);
</script>
