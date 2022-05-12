import { languageWarnings } from 'settings';

import en from './locales/en';
import nl from './locales/nl';

let errorsFound = false;

if (languageWarnings) {
  console.warn('You can toggle these warnings in settings.json');
}

const locales = {
  en, nl,
};

Object.keys(locales).forEach((language) => {
  const missingKeys = [];
  const missingSubKeys = [];
  if (Object.keys(locales[language]).length !== Object.keys(locales.en).length) {
    Object.keys(locales.en).forEach((key) => {
      if (locales[language][key] === undefined) {
        missingKeys.push(key);
        errorsFound = true;
      } else if (typeof locales[language][key] === 'object' && Object.keys(locales[language][key]).length < Object.keys(locales.en[key]).length) {
        Object.keys(locales.en[key]).forEach((subKey) => {
          if (locales[language][key][subKey] === undefined) {
            missingSubKeys.push({ key, subKey });
            errorsFound = true;
          }
        });
      }
    });
  }
  if (missingKeys.length > 0 && languageWarnings) {
    console.warn(`[High Priority] There are undefined translation keys in ${locales[language].lang}`, missingKeys);
  }
  if (missingSubKeys.length > 0 && languageWarnings) {
    console.warn(`[Low Priority] ${locales[language].lang} is missing the following keys: `, missingSubKeys);
  }
});

if (errorsFound && !languageWarnings) {
  console.warn('There are translation errors but individual warnings are disabled.');
}

export default locales;
