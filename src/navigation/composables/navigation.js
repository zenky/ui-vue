export const useNavigation = (props, emit) => {
  const redirect = (url) => {
    emit('selected', url);

    if (!props.noRedirects) {
      location.href = url;
    }
  };

  return {
    redirect,
  };
};

export const useNavigationProps = (prefix) => ({
  items: {
    required: true,
    type: Array,
  },

  prefix: {
    required: false,
    type: String,
    default: prefix,
  },

  noRedirects: {
    required: false,
    type: Boolean,
    default: false,
  },
});
