<template>
  <div class="space-x-1">
    <template v-for="action in actions">
      <a v-if="action.type === 'link'"
         :href="action.url"
         :title="action.title"
         :class="action.classes"
         :target="action.target"
      >
        <i :class="action.icon"></i>
      </a>
      <ComponentAction v-else-if="action.type === 'component'"
                       :action="action"
                       :item="item"
                       @refresh="$emit('refresh')"
                       @saved="$emit('pluginEvent', { plugin: 'quickView', event: 'view', payload: $event})"
      />
      <QuickEditAction v-else-if="action.type === 'edit'"
                       :action="action"
                       :item="item"
                       @refresh="$emit('refresh')"
                       @saved="$emit('pluginEvent', { plugin: 'quickEdit', event: 'saved', payload: $event})"
      />
      <QuickDeleteAction v-else-if="action.type === 'delete'"
                         :action="action"
                         @refresh="$emit('refresh')"
                         @deleted="$emit('pluginEvent', { plugin: 'quickDelete', event: 'deleted', payload: item})"
      />
    </template>
  </div>
</template>

<script setup>
import { defineAsyncComponent, reactive } from 'vue';
import { getUrlWithBindings} from '@/url/composables/url.js';

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },

  settings: {
    required: true,
    type: Object,
  },
});

const ComponentAction = defineAsyncComponent(() => import('./actions/ComponentAction.vue'));
const QuickEditAction = defineAsyncComponent(() => import('./actions/QuickEditAction.vue'));
const QuickDeleteAction = defineAsyncComponent(() => import('./actions/QuickDeleteAction.vue'));

const actions = reactive([]);

props.settings.actions.forEach((action) => {
  const url = action.url ? getUrlWithBindings(decodeURIComponent(action.url), props.item) : null;

  if (!url && action.settings && action.settings.strict) {
    return;
  }

  actions.push({
    url,
    type: action.type,
    title: action.title || '',
    classes: `btn btn-xs btn-default`,
    icon: action.icon,
    settings: action.settings || {},
  });
});
</script>
