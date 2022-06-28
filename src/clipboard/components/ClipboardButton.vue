<template>
  <div class="inline">
    <template v-if="type === 'link'">
      <a :id="id"
         href="javascript:;"
         class="text-primary-500 hover:underline"
         :data-clipboard-text="text"
      >
        <span v-if="label">{{ label }}</span>
        <transition name="clipboard-fade" mode="out-in">
          <i key="initial" v-if="!copied && !failed" class="fa-regular fa-copy"></i>
          <i key="copied" v-else-if="copied" class="fa-regular fa-check text-primary-500"></i>
          <i key="failed" v-else-if="failed" class="fa-regular fa-xmark text-red-500"></i>
        </transition>
      </a>
    </template>
    <button v-else
            :id="id"
            type="button"
            class="btn btn-default btn-xs dark:bg-gray-700 dark:text-white"
            :data-clipboard-text="text"
    >
      <transition name="clipboard-fade" mode="out-in">
        <i key="initial" v-if="!copied && !failed" class="fa-regular fa-copy"></i>
        <i key="copied" v-else-if="copied" class="fa-regular fa-check text-primary-500"></i>
        <i key="failed" v-else-if="failed" class="fa-regular fa-xmark text-red-500"></i>
      </transition>
    </button>
  </div>
</template>

<style lang="css">
.clipboard-fade-enter-active, .clipboard-fade-leave-active {
  transition: opacity 150ms ease;
}
.clipboard-fade-enter, .clipboard-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import ClipboardJS from 'clipboard';

const props = defineProps({
  text: {
    required: true,
  },

  type: {
    required: false,
    type: String,
    default: 'button',
  },

  label: {
    required: false,
    type: String,
    default: '',
  },
});

const id = ref(`clipboard-button-${Math.random().toString().replace('.', '')}`);
const copied = ref(false);
const failed = ref(false);

onMounted(() => {
  const clipboard = new ClipboardJS(document.getElementById(id.value));

  clipboard.on('success', () => {
    copied.value = true
    setTimeout(() => copied.value = false, 1000)
  });

  clipboard.on('error', () => {
    failed.value = true
    setTimeout(() => failed.value = false, 1000)
  });
});
</script>
