import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import i18n from 'i18n-react';

import { APIHandler, AppRouter, DataHandler, StorageHandler, locales } from 'C4';
import { storageKeys, language } from 'settings';

import 'normalize.css/normalize.css';

import 'config/FontAwesome';
import 'assets/styles/styles.scss';


class App extends Component {
  constructor(props) {
    super(props);

    const mobileRegex = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini', 'i');
    const mobilePathRegex = new RegExp('mobile', 'i');

    this.state = {
      onMobile: mobileRegex.test(window.navigator.userAgent) && !mobilePathRegex.test(window.location.pathname),
      askedBefore: null,
      appLanguage: null,
      appId: null,
    };

    this.setAsked = this.setAsked.bind(this);
  }

  componentDidMount() {
    this.checkMobile();
    this.setLanguage();
    this.getAppId();
  }

  componentDidUpdate() {
    const { appLanguage } = this.state;
    const { texts } = i18n;

    if (JSON.stringify(appLanguage) !== JSON.stringify(texts)) {
      i18n.setTexts(appLanguage);
    }
  }

  async getAppId() {
    const appId = await DataHandler.matchAppId();
    const localId = await StorageHandler.load(storageKeys.appId);

    if (localId !== appId) {
      StorageHandler.removeKeys(Object.keys(storageKeys)
        .filter(key => ![storageKeys.appId, storageKeys.lang].includes(storageKeys[key])));
    }

    StorageHandler.save(storageKeys.appId, appId, 86400000 * 365);
    this.setState({ appId });
  }

  async getLocation() {
    const { countryCode, country } = await APIHandler.getLocation() || {};
    const languageData = {
      country: 'United_States',
      code: 'en',
      langFile: 'en',
    };

    const availableLanguages = language
      .map(({ code }) => (typeof code === 'string' ? code : code.map(c => c.toLowerCase())))
      .flat();

    if (countryCode && country && availableLanguages.includes(countryCode.toLowerCase())) {
      const [file] = language
        .filter(({ code }) => (typeof code === 'string' ? code === countryCode : code.includes(code)))
        .map(({ langFile }) => langFile);

      Object.assign(languageData, {
        country: country.replace(/[ ]/g, '_'),
        code: countryCode.toLowerCase(),
        langFile: file,
      });
    }

    StorageHandler.save(storageKeys.lang, languageData);
    this.setState({ appLanguage: locales[languageData.langFile] || locales.en });
  }

  async setLanguage() {
    const languageExists = await StorageHandler.exists(storageKeys.lang);
    if (languageExists) {
      const { langFile } = await StorageHandler.load(storageKeys.lang) || {};
      this.setState({ appLanguage: locales[langFile] || locales.en });
    } else {
      this.getLocation();
    }
  }

  setAsked() {
    this.setState({ askedBefore: true });
    StorageHandler.save('askedMobile', true);
  }

  async checkMobile() {
    const askedBefore = await StorageHandler.load('askedMobile');
    this.setState({ askedBefore });
  }

  render() {
    const {
      onMobile, askedBefore, appLanguage, appId,
    } = this.state;

    return (
      <div className="container__router">
        {(!onMobile || askedBefore) && appId && (
          <AppRouter key={JSON.stringify(appLanguage)} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
