<template>
  <a v-if="action.url"
     :href="action.url"
     :title="action.title"
     :class="action.classes"
     @click="quickEdit"
  >
    <i v-if="!quickEditLoading" :class="action.icon"></i>
    <i v-else class="fa fa-light fa-spinner fa-spin"></i>
  </a>
  <button v-else
          :title="action.title"
          :class="action.classes"
          @click="quickEdit"
  >
    <i v-if="!quickEditLoading" :class="action.icon"></i>
    <i v-else class="fa fa-light fa-spinner fa-spin"></i>
  </button>
</template>

<script setup>
import { useQuickEdit } from '@/api/composables/resources.js';
import { getUrlWithBindings } from '@/url/composables/url.js';

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },

  action: {
    required: true,
    type: Object,
  },
});

const emit = defineEmits(['saved', 'refresh']);
const { quickEditLoading, dispatch } = useQuickEdit();
const quickEdit = async (event) => {
  if (quickEditLoading.value || event.metaKey || event.ctrlKey || event.altKey) {
    return true;
  } else if (!props.action.settings || !props.action.settings.form_url) {
    return true
  }

  event.preventDefault();

  try {
    await dispatch(
      getUrlWithBindings(props.action.settings.form_url, props.item),
      'Быстрое редактирование',
      props.action.url ? `Отредактируйте данные или перейдите <a href="${props.action.url}" class="font-bold underline">в полный режим</a>.` : '',
      event => {
        emit('saved', event);
        emit('refresh');
      }
    );
  } catch (e) {
    location.href = props.action.url;
  }

  return false;
};
</script>
