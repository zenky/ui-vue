<template>
  <div class="inline-block">
    <button :title="action.title"
            :class="action.classes"
            @click="show"
    >
      <i :class="action.icon"></i>
    </button>

    <template v-if="action.settings.headless">
      <component v-if="open"
                 :is="action.settings.component"
                 :key="id"
                 v-bind="componentProps"
                 @close="hide"
      />
    </template>
    <div v-else-if="created" class="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="flex min-h-screen text-center md:block md:px-2 lg:px-4" style="font-size: 0;">
        <transition enter-active-class="ease-out duration-300"
                    enter-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100"
                    leave-to-class="opacity-0"
        >
          <div v-if="open" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" aria-hidden="true"></div>
        </transition>

        <span class="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">&#8203;</span>

        <transition enter-active-class="ease-out duration-300"
                    enter-class="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enter-to-class="opacity-100 translate-y-0 md:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100 translate-y-0 md:scale-100"
                    leave-to-class="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        >
          <component v-if="open"
                     :is="action.settings.component"
                     :key="id"
                     v-bind="componentProps"
                     @close="hide"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

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

const created = ref(false);
const open = ref(false);
const id = ref(`datatable-quick-view-plugin-${Math.random().toString().replace('.', '')}`);

const componentProps = computed(() => ({
  ...props.action.settings.props || {},
  item: props.item,
}));

const show = () => {
  if (!created.value) {
    created.value = true;
  }

  nextTick(() => {
    open.value = true;
  });
};

const hide = () => {
  open.value = false;

  setTimeout(() => {
    created.value = false;
  }, 210);
};
</script>
