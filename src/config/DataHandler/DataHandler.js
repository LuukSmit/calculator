import StorageHandler from 'config/StorageHandler';
import { language, storageKeys } from 'settings';

const DataHandler = {

  checkKey(key, APIFunction, override = false) {
    return StorageHandler.load(storageKeys[key.name || key]).then((localKey) => {
      if (localKey !== false && !StorageHandler.isExpired(key.name || key) && override !== true) {
        return StorageHandler.load(storageKeys[key.name || key]).then(result => result);
      } else if (storageKeys[key.name || key]) { // if key is defined, try to get it from the API
        console.warn(`key ${key.name || key} expired: ${StorageHandler.isExpired(key.name || key)}`);
        return APIFunction.then((apiResponse) => {
          if (Object.keys(apiResponse).length > 0 && apiResponse.status !== 'error') {
            StorageHandler.save(storageKeys[key.name || key], apiResponse);
          }
          return apiResponse;
        });
      }
      return false;
    });
  },

  matchAppId() {
    let appId = language[0].id;
    if (window.appId) return new Promise(resolve => resolve(window.appId));
    return StorageHandler.load(storageKeys.lang).then((activeLanguage) => {
      if (activeLanguage) {
        language.forEach((lang) => {
          if (lang.countries.includes(activeLanguage.country.replace('_', ' '))) {
            appId = lang.id;
          }
        });
      }
      window.appId = appId;
      return appId;
    });
  },

  requestWithId(requestFunction, optionalParams) {
    return DataHandler.matchAppId().then(appId => requestFunction(appId, optionalParams).then(response => response));
  },
};

export default DataHandler;
