<template>
  <div>
    <div class="sm:hidden">
      <label :for="`${prefix}-aside-navigation-tabs`" class="sr-only">Выберите страницу</label>
      <select :id="`${prefix}-aside-navigation-tabs`"
              class="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-600 dark:text-white dark:text-opacity-90 border-gray-300 dark:border-gray-500"
              @change="redirect($event.target.value)"
      >
        <option v-for="item in items" :value="item.url" :selected="item.active">
          {{ item.title }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0">
        <nav class="space-y-1">
          <a v-for="item in items"
             :href="noRedirects ? 'javascript:;' : item.url"
             class="group rounded-md px-3 py-2 flex items-center text-sm font-medium"
             :class="{
               'bg-gray-50 dark:bg-gray-900 text-primary-600 dark:text-primary-200 hover:bg-white': item.active,
               'text-gray-900 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 dark:hover:text-primary-200': !item.active,
             }"
             @click="$emit('selected', item.url)"
          >
            <i v-if="item.icon"
               class="shrink-0 -ml-1 mr-3 w-6 fa-fw"
               :class="{
                 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-primary-200': !item.active,
                 'text-primary-500 dark:text-primary-200': item.active,
                 [item.icon]: true,
               }"
            ></i>
            <span class="truncate">{{ item.title }}</span>
          </a>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useNavigation, useNavigationProps } from '@/navigation/composables/navigation.js';

const props = defineProps(useNavigationProps('aside-navigation'));
const emit = defineEmits(['selected']);
const { redirect } = useNavigation(props, emit);
</script>
