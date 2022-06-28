<template>
  <div class="flex flex-col">
    <DataTableFilters v-if="settings.filters.length > 0"
                      :filters="settings.filters"
                      v-model="filters"
                      class="mb-4"
    />
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-600">
            <tr>
              <template v-for="column in columns">
                <th scope="col" class="text-gray-900 dark:text-white dark:text-opacity-60" :class="column.header.classes">
                  <template v-if="!column.ordering">{{ column.label }}</template>
                  <template v-else>
                    <a href="javascript:;" @click="toggleOrdering(column.ordering.column)">
                      <i class="fa-light mr-1" :class="getOrderingClasses(column.ordering)"></i>
                      {{ column.label }}
                    </a>
                  </template>
                </th>
              </template>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <template v-if="rows.length > 0">
              <tr v-for="row in rows">
                <td v-for="column in row.columns" class="text-gray-900 dark:text-white dark:text-opacity-90" :class="column.classes">
                  <template v-if="column.type === 'column'">
                    <div v-if="column.settings.emphasize" class="font-medium">
                      {{ column.value }}
                    </div>
                    <template v-else>{{ column.value }}</template>
                  </template>
                  <template v-else-if="column.type === 'plugin'">
                    <component :key="`datatable-${id}-${row.id}-${column.id}`"
                               :is="plugins[column.plugin].component"
                               :item="row.item"
                               :settings="column.settings"
                               @refresh="refresh"
                               @reset="reset"
                               @pluginEvent="$emit(`plugin:${$event.plugin}:${$event.event}`, $event.payload)"
                    ></component>
                  </template>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td class="text-gray-900 dark:text-gray-300 text-center py-4 text-sm" :colspan="columns.length">
                <template v-if="loading">
                  <i class="fa-light fa-spinner fa-spin mr-1"></i>
                  Идёт загрузка...
                </template>
                <template v-else-if="failed">
                  Произошла ошибка при загрузке данных.
                  <br>
                  <a href="javascript:;" class="text-primary-500 hover:underline" @click="load">
                    <i class="fa-light fa-refresh mr-1"></i>
                    Повторить попытку
                  </a>
                </template>
                <template v-else>
                  Нет данных
                </template>
              </td>
            </tr>
            </tbody>
          </table>

          <DataTablePagination v-if="pagination && pagination.total > 0"
                               :pagination="pagination"
                               v-model="filters.page"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, watch, ref } from 'vue';
import { useDataTable } from '../composables/datatable';

const DataTableFilters = defineAsyncComponent(() => import('./DataTableFilters.vue'));
const DataTablePagination = defineAsyncComponent(() => import('./DataTablePagination.vue'));

const props = defineProps({
  settings: {
    required: true,
    type: Object,
  },

  initialData: {
    required: false,
    type: Array,
    default: () => [],
  },
});

const id = ref(Math.random().toString().replace('.', ''));

const {
  filters,
  loading,
  failed,
  columns,
  rows,
  plugins,
  pagination,
  load,
  refresh,
  reset,
  getOrderingClasses,
  toggleOrdering,
} = useDataTable(props, (url) => {
  history.replaceState({}, '', url);
});

watch(filters, () => load(), {
  deep: true,
  immediate: true,
});
</script>
