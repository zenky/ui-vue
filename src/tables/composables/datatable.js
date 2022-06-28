import { computed, inject, reactive, ref } from 'vue';
import { urlUpdater } from '@/url/composables/url.js';
import get from 'lodash-es/get';

const getColumns = (plugins, columns) => {
  const classes = inject('zenky:datatable:classes', {});

  return columns.map((column) => {
    const id = Math.random().toString().replace('.', '');
    const item = {
      id,
      label: column.label || '',
      plugin: column.plugin || undefined,
      ordering: column.ordering || null,
      settings: column.settings || undefined,
      header: {
        classes: get(column, 'header.classes', classes.header || ''),
      },
      column: {
        classes: get(column, 'header.classes', classes.column || ''),
      },
    };

    if (!column.plugin || typeof plugins[column.plugin] === 'undefined' || !plugins[column.plugin]) {
      return item;
    }

    if (plugins[column.plugin].header && plugins[column.plugin].header.classes) {
      item.header.classes = `${item.header.classes} ${plugins[column.plugin].header.classes}`;
    }

    if (plugins[column.plugin].column && plugins[column.plugin].column.classes) {
      item.column.classes = `${item.column.classes} ${plugins[column.plugin].column.classes}`;
    }

    return item;
  });
};

const getRows = (columns, data) => {
  return data.map((item) => {
    const itemColumns = columns.map((column) => {
      if (!column.plugin) {
        return {
          id: column.id,
          type: 'column',
          value: get(item, column.settings.path),
          settings: column.settings || {},
          classes: column.column.classes,
        };
      }

      return {
        id: column.id,
        type: 'plugin',
        plugin: column.plugin,
        settings: column.settings || {},
        classes: column.column.classes,
        ordering: column.ordering || null,
      };
    });

    return {
      id: Math.random().toString().replace('.', ''),
      columns: itemColumns,
      item,
    };
  });
};

const useOrdering = (props) => {
  const icons = inject('zenky:datatable:icons');
  const initialOrdering = ref(true);
  const ordering = ref(props.settings.order ? props.settings.order : {
    column: null,
    direction: 'asc',
  });
  const toggleOrdering = (column) => {
    let direction = ordering.value.direction === 'asc' ? 'desc' : 'asc';

    if (ordering.value.column !== column) {
      direction = 'asc';
    }

    ordering.value = {
      direction,
      column,
    };

    initialOrdering.value = false;
  };
  const getOrderingIcons = (type) => {
    if (typeof icons.ordering === 'undefined') {
      return null;
    } else if (typeof icons.ordering[type] === 'undefined') {
      return icons.ordering.default;
    }

    return icons.ordering[type];
  };
  const getOrderingClasses = (columnOrdering) => {
    const icons = getOrderingIcons(columnOrdering.type);

    if (icons === null) {
      return [];
    }

    return {
      [icons.default]: columnOrdering.column !== ordering.value.column,
      [icons.asc]: columnOrdering.column === ordering.value.column && ordering.value.direction === 'asc',
      [icons.desc]: columnOrdering.column === ordering.value.column && ordering.value.direction === 'desc',
    };
  };

  return {
    initialOrdering,
    ordering,
    toggleOrdering,
    getOrderingClasses,
  };
};

export const useFilters = (filtersList, ordering) => {
  const filters = ref({});

  if (Array.isArray(filtersList)) {
    filtersList.forEach((filter) => {
      filters.value[filter.name] = filter.value;
    });
  }

  const query = computed(() => {
    const params = {
      ...filters.value,
    };

    if (ordering.value.column) {
      params.order_by = `${ordering.value.direction === 'asc' ? '' : '-'}${ordering.value.column}`;
    }

    return params;
  });

  return {
    filters,
    query,
  };
};

const useLoader = (props, columns, ordering, initialOrdering, triggerUrl, urlUpdater) => {
  const axios = inject('zenky:axios');

  if (!axios) {
    throw new Error('[Zenky] DataTable plugin depends on Axios plugin. Install Axios plugin and try again.');
  }

  const { filters, query } = useFilters(props.settings.filters, ordering);

  const loading = ref(false);
  const failed = ref(false);
  const dataAssigned = ref(false);
  const shouldAssignInitialData = computed(() => {
    if (!Array.isArray(props.initialData)) {
      return false;
    }

    return props.initialData.length > 0 && !dataAssigned.value;
  });

  const rows = ref([]);
  const pagination = ref(null);

  const load = async () => {
    if (loading.value) {
      return;
    } else if (shouldAssignInitialData.value) {
      rows.value = getRows(columns, props.initialData);
      dataAssigned.value = true;

      return;
    }

    failed.value = false;
    loading.value = true;

    triggerUrl(
      urlUpdater.getUpdatedUrl(
        urlUpdater.getDefaultUrl(),
        query.value,
        true,
        initialOrdering.value ? ['order_by'] : []
      )
    );

    try {
      const response = (await axios.get(props.settings.ajax.url, { params: query.value, headers: props.settings.ajax.headers })).data;
      rows.value = getRows(
        columns,
        props.settings.ajax.data_key !== null ? response[props.settings.ajax.data_key] : response
      );

      if (response.meta && response.meta.pagination) {
        pagination.value = response.meta.pagination;
      }
    } catch (e) {
      failed.value = true;
    } finally {
      loading.value = false;
    }
  };

  return {
    filters,
    loading,
    failed,
    rows,
    pagination,
    load,
  };
};

export const useDataTable = (props, triggerUrl) => {
  const plugins = inject('zenky:datatable:plugins', {});

  urlUpdater.capture();

  const columns = reactive(getColumns(plugins, props.settings.columns));
  const { ordering, initialOrdering, toggleOrdering, getOrderingClasses } = useOrdering(props);

  const {
    filters,
    loading,
    failed,
    rows,
    pagination,
    load,
  } = useLoader(props, columns, ordering, initialOrdering, triggerUrl, urlUpdater);

  const refresh = () => load();
  const reset = () => {
    pagination.value = null;

    return load();
  };

  return {
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
    toggleOrdering: (column) => {
      toggleOrdering(column);
      return load();
    },
  };
};
