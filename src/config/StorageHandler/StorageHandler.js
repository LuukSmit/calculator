import Storage from 'react-native-storage';

const expire = {
  day: 86400000,
  week: 86400000 * 7,
  month: 86400000 * 30,
  year: 86400000 * 365,
};

const { Raven } = window;

const storage = new Storage({
  storageBackend: window.localStorage || {},
  defaultExpires: expire.day,
  enableCache: true,
  sync: {
  },
});

let StorageHandler;
export default StorageHandler = {

  save: (key, data, expires) => {
    storage.save({
      key: (key.name || key),
      data,
      expires: (expires !== undefined) ? expires : key.expires,
    });
  },

  expire,

  load: key => StorageHandler.exists(key.name || key).then((res) => {
    if (res) {
      return storage.load({
        key: key.name || key,
        autoSync: true, // if data not found or expired, call sync function
        syncInBackground: false, // false = doesn't return old data before syncing.
      }).then(ret => ret)
        .catch((err) => {
          Raven.captureException(err, { extra: { cause: err.name, key } });
          switch (err.name) {
            case 'NotFoundError':
              console.warn(`NotFoundError: ${err}`);
              break;
            case 'ExpiredError':
              console.warn(`ExpiredError: ${err}`);
              break;
            default:
              break;
          }
        });
    }
    return false;
  }),

  removeKeys: (info) => {
    if (info.length !== undefined) {
      info.forEach((key) => {
        StorageHandler.remove(key);
      });
    } else {
      Object.keys(info).forEach((key) => {
        StorageHandler.remove(key);
      });
    }
  },

  remove: (key) => {
    console.info(`Removing key: ${key.name || key}`);
    storage.remove({
      key: (key.name || key),
    });
  },

  isExpired(key) {
    return window.localStorage[key] ? ((JSON.parse(window.localStorage[key], null, 4).expires - Date.now()) < 0) : true;
  },

  exists: key => storage.load({
    key: key.name || key,
    autoSync: false,
    syncInBackground: false,
  }).then(() => true)
    .catch(() => false),
};

if (!window.navigator.cookieEnabled) {
  Object.keys(StorageHandler).forEach((key) => {
    StorageHandler[key] = () => new Promise((resolve) => {
      resolve(false);
    });
  });
} else StorageHandler.storage = (window.storage ? window.storage : global.storage);
