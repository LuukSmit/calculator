import equal from 'fast-deep-equal';

import { APIHandler, DataHandler, StorageHandler } from 'C4';

import { storageKeys } from 'settings';

export default class PointsHandler {
  constructor(appId = null, email = null) {
    this.props = { appId, email };

    this.tiers = null;
    this.totalPoints = null;
    this.completedItems = null;
    this.latestUpdate = null;
    this.latestLevel = null;
    this.usedActionValues = [];
    this.startingTier = {
      points: 0,
      title: 'None',
      copy: 'Congratulations, you have unlocked the first level!',
      image: null,
    };

    this.errors = {
      noStoredUser: 'Failed to fetch user from localstorage. User may not be logged in.',
      notInit: 'Handler is not initialized, either provide props in the constructor or call the init function.',
    };

    this.initialized = (appId !== null && email !== null);
  }

  async init() {
    const { appId, email } = this.props;
    const { noStoredUser } = this.errors;

    const newProps = {};

    if (!appId) { // Fetch appId from window if available or tries to match it if not
      newProps.appId = ((window || global) || {}).appId || await DataHandler.matchAppId();
    }
    if (!email) { // Attempt to fetch email from localStorage
      const { result, response } = await StorageHandler.load(storageKeys.user);
      if (result === 'success') {
        newProps.email = response.email;
      } else throw new Error(noStoredUser);
    }

    if (newProps.appId && newProps.email) {
      this.props = newProps;
      this.initialized = true;
      return true;
    } return false;
  }

  isInit() {
    const { notInit } = this.errors;
    if (this.initialized === false) throw new Error(notInit);
  }

  async getPoints() {
    const { appId, email } = this.props;
    const { tiers, totalPoints, completedItems } = this;

    this.isInit();

    const { result, response } = await APIHandler.getUserPoints(appId, email) || {};

    if (result === 'success' && equal({ tiers, totalPoints, completedItems }, response) === false) { // Store response on success
      const [{ points }] = tiers || response.tiers;


      this.tiers = points === 0 ? response.tiers : [this.startingTier, ...response.tiers]; // Insert default starting tier if necessary;
      this.totalPoints = response.totalPoints;
      this.completedItems = response.completedItems;
    }
    return { result, response };
  }

  async setPoints({ action, value }) {
    const { appId, email } = this.props;

    this.isInit();

    if (this.usedActionValues.some(val => equal(val, { action, value }))) { // Check if request was performed before
      return { result: 'error', response: 'Already used' };
    }

    const { result, response } = await APIHandler.setUserPoints(appId, { email, action, value });
    if (result === 'success') {
      const {
        tiers, totalPoints, update, leveled,
      } = response;

      const [{ points }] = tiers;

      this.tiers = points === 0 ? tiers : [this.startingTier, ...tiers]; // Insert default starting tier if necessary
      this.totalPoints = totalPoints;
      this.latestUpdate = update;
      this.latestLevel = leveled;

      this.usedActionValues.push({ action, value }); // Ensures request is not repeated

      return { result, response: { update, leveled } };
    }
    if (result === 'error' && response !== 'Already used') {
      throw new Error(response);
    } else return { result, response };
  }
}
