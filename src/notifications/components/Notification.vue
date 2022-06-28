<template>
  <div class="z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
       :class="notificationClasses"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="shrink-0">
          <svg class="h-6 w-6 text-white" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path v-if="notification.type === 'success'" fill="currentColor" d="M340.7 180.7L224 297.4L171.3 244.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62l64 64C215.8 334.4 219.9 336 224 336s8.188-1.562 11.31-4.688l128-128c6.25-6.25 6.25-16.38 0-22.62S346.9 174.4 340.7 180.7zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480z"></path>
            <path v-else-if="notification.type === 'error'" fill="currentColor" d="M331.3 180.7c-6.25-6.25-16.38-6.25-22.62 0L256 233.4L203.3 180.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62L233.4 256L180.7 308.7c-6.25 6.25-6.25 16.38 0 22.62c6.246 6.246 16.37 6.254 22.62 0L256 278.6l52.69 52.69c6.246 6.246 16.37 6.254 22.62 0c6.25-6.25 6.25-16.38 0-22.62L278.6 256l52.69-52.69C337.6 197.1 337.6 186.9 331.3 180.7zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256S512 397.4 512 256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480z"></path>
            <path v-else-if="notification.type === 'warning'" fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 304c8.844 0 16-7.156 16-16V128c0-8.844-7.156-16-16-16S240 119.2 240 128v160C240 296.8 247.2 304 256 304zM256 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S269.3 344 256 344z"></path>
            <path v-else-if="notification.type === 'info'" fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 184c13.25 0 24-10.74 24-24c0-13.25-10.75-24-24-24S232 146.7 232 160C232 173.3 242.7 184 256 184zM304 352h-32V240C272 231.2 264.8 224 256 224H224C215.2 224 208 231.2 208 240S215.2 256 224 256h16v96h-32C199.2 352 192 359.2 192 368C192 376.8 199.2 384 208 384h96c8.836 0 16-7.164 16-16C320 359.2 312.8 352 304 352z"></path>
          </svg>
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-white">
            {{ notification.title }}
          </p>
          <p v-if="notification.message" class="mt-1 text-sm text-white">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 shrink-0 flex">
          <button class="bg-transparent rounded-md inline-flex text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  @click="close"
          >
            <span class="sr-only">Закрыть</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNotifications } from '../stores/notifications';

const props = defineProps({
  notification: {
    required: true,
    type: Object,
  },
});

const { setNotification } = useNotifications();
const close = () => setNotification(null);
const notificationClasses = computed(() => {
  switch (props.notification.type) {
    case 'error':
      return ['bg-red-500'];
    case 'success':
      return ['bg-primary-500'];
    case 'info':
      return ['bg-blue-500'];
    case 'warning':
      return ['bg-yellow-500'];
  }

  return ['bg-primary-500'];
});
</script>
