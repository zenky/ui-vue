import { computed } from 'vue';
import pluralize from '@/helpers/pluralize.js';

export const usePagination = (pagination, emit) => {
  const hasPages = computed(() => pagination.total_pages > 1 || pagination.current_page > pagination.total_pages);
  const showingLabel = computed(() => pluralize(pagination.count, ['Показана', 'Показано', 'Показано'], false));
  const resultsLabel = computed(() => pluralize(pagination.total, ['записи', 'записей', 'записей'], false));

  const selectPage = (page) => emit('update:modelValue', page);
  const selectNextPage = () => {
    if (!pagination.has_next_page) {
      return false;
    }

    selectPage(pagination.current_page + 1);

    return true;
  };
  const selectPreviousPage = () => {
    if (!pagination.has_previous_page) {
      return false;
    }

    selectPage(pagination.current_page - 1);

    return true;
  };

  return {
    hasPages,
    showingLabel,
    resultsLabel,
    selectPage,
    selectNextPage,
    selectPreviousPage,
  };
};
