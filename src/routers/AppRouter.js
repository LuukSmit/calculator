/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CookieConsent from 'react-cookie-consent';
import ReactPiwik from 'react-piwik';
import i18n from 'i18n-react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createBrowserHistory } from 'history';

import {
  ScrollToTop,
  SubRouter,
  HomeView,
} from 'C4';
// import { demo, piwikSiteid } from 'settings';

const hashLinkScroll = () => {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
};

// function cookieExists(cookieName) {
//   const decodedCookies = decodeURIComponent(document.cookie);
//   const splitCookies = decodedCookies.split('; ');
//   return splitCookies.includes(cookieName);
// }

export default class AppRouter extends Component {
  constructor(props) {
    super(props);

    // const piwik = new ReactPiwik({
    //   url: '//data.travpromobile.com/matomo/',
    //   siteId: piwikSiteid,
    //   trackErrors: true,
    // });

    // piwik.connectToHistory(createBrowserHistory());

    // ReactPiwik.push(['requireConsent']);
    // ReactPiwik.push(['trackPageView']);

    // this.state = {
    //   cookies: cookieExists('cookieConsent=true') ? 'accepted' : '',
    // };

    // this.cookieDecline = this.cookieDecline.bind(this);
    // this.cookieAccept = this.cookieAccept.bind(this);
    // this.showCookieBar = this.showCookieBar.bind(this);
  }

  // componentDidMount() {
    // const { cookies } = this.state;

  //   if (cookieExists('cookieConsent=false')) {
  //     ReactPiwik.push(['forgetConsentGiven']);
  //   } else if (cookies !== 'accepted') {
  //     this.showCookieBar();
  //   }
  // }

  // showCookieBar() {
  //   this.setState({ cookies: 'requiresConsent' });
  // }

  // cookieAccept() {
  //   this.setState({ cookies: 'accepted' });
  //   ReactPiwik.push(['rememberConsentGiven']);
  //   window.location.reload();
  // }

  // cookieDecline() {
  //   this.setState({ cookies: 'declined' });
  //   ReactPiwik.push(['forgetConsentGiven']);
  //   document.cookie = 'cookieConsent=false';
  //   window.location.reload();
  // }

  render() {
    return (
      <BrowserRouter
        onUpdate={(e) => {
          hashLinkScroll(e);
        }}
      >
        <ScrollToTop>
          <div className="container">
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/calculator" />} />
              <Route path="/main" render={() => <SubRouter />} />
              <Route path="/calculator" exact render={() => <HomeView />} />
            </Switch>
            {/* {this.state.cookies === 'requiresConsent' && (
              <CookieConsent
                location="top"
                onAccept={this.cookieAccept}
                buttonText={i18n.translate('cookies.consent')}
                cookieName="cookieConsent"
                expires={365}
                containerClasses="cookieConsent"
                contentClasses="cookieContent"
                buttonClasses="cookieBtn"
                debug
                disableStyles
              >
                <p className="cookieText">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'shield-alt']} />
                  </span>
                  {i18n.translate('cookies.message')}
                </p>
                <button onClick={this.cookieDecline} className="cookieOptOut btnInverse">
                  {i18n.translate('cookies.optout')}
                </button>
              </CookieConsent>
            )} */}
            {/* {demo && (
              <CookieConsent
                location="bottom"
                buttonText={i18n.translate('demo.consent')}
                cookieName="demoConsent"
                expires={365}
                containerClasses="demoConsent"
                contentClasses="cookieContent"
                buttonClasses="demoBtn"
                debug
                disableStyles
              >
                <p className="cookieText">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'bug']} />
                  </span>
                  {i18n.translate('demo.message')}
                </p>
              </CookieConsent>
            )} */}
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

AppRouter.propTypes = {
  match: PropTypes.shape(),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

AppRouter.defaultProps = {
  match: {},
  location: {},
};
