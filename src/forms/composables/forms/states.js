import { ref } from 'vue';

export const useStates = (sectionsCount) => {
  const formIsBusy = ref(false);
  const isRedirecting = ref(false);
  const wasInitialized = ref(false);
  const valuesWereChanged = ref(false);
  const isDeleting = ref(false);
  const initializedSections = ref(0);
  const sectionInitialized = () => {
    initializedSections.value += 1;

    if (initializedSections.value === sectionsCount) {
      wasInitialized.value = true;
    }
  };

  return {
    formIsBusy,
    isRedirecting,
    wasInitialized,
    valuesWereChanged,
    isDeleting,
    sectionInitialized,
  };
};
