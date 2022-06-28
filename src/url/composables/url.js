import URL from 'url-parse';

export const getUrlWithBindings = (url, data) => {
  if (!data) {
    return url;
  }

  const placeholders = [...url.matchAll(/:(\w+)/g)];

  if (!placeholders.length) {
    return url;
  }

  let urlWithBindings = url;

  placeholders.forEach(placeholder => urlWithBindings = urlWithBindings.replaceAll(
    placeholder[0],
    data[placeholder[1]])
  );

  return urlWithBindings;
};

export const urlUpdater = {
  capture() {
    this.defaultUrl = location.href;
    this.defaultParsedUrl = new URL(this.defaultUrl, true);
  },

  getDefaultUrl() {
    return this.defaultUrl || location.href;
  },

  getDefaultParsedUrl() {
    return this.defaultParsedUrl;
  },

  getUpdatedUrl(url, query, removeEmpty = true, ignoredKeys = []) {
    const pageUrl = new URL(url, true);

    if (!Object.keys(query).length) {
      return pageUrl.href;
    }

    pageUrl.query = pageUrl.query || {};

    for (let i in query) {
      if (!query.hasOwnProperty(i)) {
        continue;
      } else if (ignoredKeys.indexOf(i) !== -1) {
        continue;
      } else if (removeEmpty && (query[i] === '' || query[i] === undefined || query[i] === null)) {
        if (!!pageUrl.query[i]) {
          delete pageUrl.query[i];
        }

        continue;
      }

      pageUrl.query[i] = query[i];
    }

    pageUrl.set('query', pageUrl.query, null);

    return pageUrl.href;
  },
}
