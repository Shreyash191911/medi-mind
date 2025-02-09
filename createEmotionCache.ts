import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default createEmotionCache; 