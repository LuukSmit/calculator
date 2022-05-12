import 'isomorphic-fetch';

const { Raven } = window;

let APIHandler;
export default APIHandler = {

  makeRequest: (request, settings, customErrorHandler) => fetch(request, settings).then((response) => {
    if (response.ok) {
      return response.json()
        .then(json => json)
        .catch(() => false);
    }
    return { ok: response.ok, response };
  }).catch((err) => {
    if (customErrorHandler) {
      customErrorHandler(err);
    } else {
      Raven.captureException('API call failed', { extra: { requestURL: request, requestSettings: settings, err } });
    }
    return false;
  }),

  ok: (response) => {
    if (Object.keys(response).length > 0) {
      return true;
    }
    return false;
  },

  timeout(ms, promise) {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'));
      }, ms);
      promise.then(resolve, reject);
    }));
  },

  getUser: (appId, email) => {
    const request = `https://accounts.travpromobile.com/api/v2/get_user/?email=${encodeURI(email)}&app_id=${appId}`;
    return APIHandler.makeRequest(request);
  },

  setUser: (appId, params) => {
    // Format Date to dd-mm-yyyy, by adding a leading 0 and
    // slice last 2 characters to get Month and Day in two decimals.
    const date = new Date();
    const Month = `0${date.getMonth() + 1}`;
    const Day = `0${date.getDay()}`;
    const Year = date.getFullYear();
    const dateFormat = `${Year}-${Month.slice(-2)}-${Day.slice(-2)}`;

    let request = 'https://accounts.travpromobile.com/api/v2/user/?';
    request += `sales_companion_registered=${dateFormat}&`;
    request += `app_id=${appId}&`;
    request += 'type_of_user=pro';

    Object.keys(params)
      .forEach((key) => {
        request += `&${key.replace(new RegExp('reg_', 'g'), '')}=${encodeURI(params[key])}`;
      });

    return APIHandler.makeRequest(request);
  },

  updateUser: (appId, email, params) => {
    const parameters = params.map((p, i) => `${i > 0 ? '&' : ''}${p.param}=${p.val}`).join('');
    const request = `https://accounts.travpromobile.com/api/v2/user/?email=${email}&${parameters}&app_id=${appId}`;
    return APIHandler.makeRequest(request, null, (err) => {
      Raven.captureException('Updating user failed', { extra: { requestURL: request, requestSettings: null, err } });
    });
  },

  updateSearchIndex: (appId) => {
    const request = `https://search.travpromobile.com/updateindex.php?app_id=${appId}`;
    return APIHandler.makeRequest(request);
  },

  getSearchResults: (appId, query) => {
    const request = `https://stack.travpromobile.com/query.php?app_id=${appId}&q=${encodeURIComponent(query)}`;
    return APIHandler.makeRequest(request);
  },

  getUserProgress: (appId, email) => {
    let request = `https://progress.travpromobile.com/progress_user/?email=${encodeURI(email)}`;
    if (['number', 'string'].includes(typeof appId)) {
      request += `&app_id=${appId}`;
    }
    if (typeof appId === 'object') {
      appId.forEach((id) => {
        request += `&app_id[]=${id}`;
      });
    }
    return APIHandler.makeRequest(request);
  },

  registerUserProgress: (email) => {
    const request = 'https://progress.travpromobile.com/users/';
    const requestSettings = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      timeout: 5000,
      body: JSON.stringify({ user: { email } }),
    };

    const onError = (err) => {
      Raven.captureException('Registering user progress failed', { extra: { requestURL: request, requestSettings, err } });
    };

    return APIHandler.makeRequest(request, requestSettings, onError)
      .then((res) => {
        if (res.status !== 422) {
          return res;
        }
        return false;
      });
  },

  getFavoriteContent: (favorites) => {
    const request = 'https://travpro.yourworldapps.nl/API/app/v2/favorites.php?old=true&';
    let params = '';

    favorites.forEach((item) => {
      if (item.type === 'p') {
        params += `page[]=${item.unid}&`;
      } else {
        params += `page[]=${item.type}${item.unid}&`;
      }
    });

    return APIHandler.makeRequest(`${request}${params}`);
  },

  getFavorite: (appId, email) => {
    const request = `https://progress.travpromobile.com/favorites_by_app/${appId}/?email=${email}`;
    return APIHandler.makeRequest(request);
  },

  addFavorite: (params) => {
    const request = 'https://progress.travpromobile.com/favorites/';
    return APIHandler.makeRequest(request, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      timeout: 5000,
      body: JSON.stringify(params),
    });
  },

  removeFavorite: (params) => {
    const request = 'https://progress.travpromobile.com/favorites';

    return APIHandler.makeRequest(request, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      timeout: 5000,
      body: JSON.stringify(params),
    });
  },

  setUserProgress: (params) => {
    const request = 'https://progress.travpromobile.com/progress';

    const requestObject = {
      chapter_id: +params.chapterId,
      lastpage: params.lastPage,
      progress: params.progress,
      email: params.email,
    };


    const valid = Object.values(requestObject).every(param => param || param === 0);
    const NaNCheck = (!Number.isNaN(+requestObject.lastpage) && !Number.isNaN(+requestObject.progress));
    const positive = (+requestObject.lastpage >= 0 && +requestObject.progress >= 0);
    if (valid && NaNCheck && positive) {
      return APIHandler.makeRequest(request, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        timeout: 5000,
        body: JSON.stringify(requestObject),
      });
    }
    return new Promise(resolve => resolve(new Error('One of the supplied values was invalid.')));
  },

  getLocation: () => {
    const request = 'https://pro.ip-api.com/json?key=lsCvt9AP5YqiVgL';
    return APIHandler.makeRequest(request);
  },

  getMessage: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/message.php?app_id=${appId}&format=json`;
    return APIHandler.makeRequest(request);
  },

  getAnnouncement: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/announcements.php?app_id=${appId}`;
    return APIHandler.makeRequest(request);
  },

  getUnreadMessages: (appId, lastChecked) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/latest_message_v2.php?app_id=${appId}&date=${lastChecked}`;
    return APIHandler.makeRequest(request);
  },

  getChapters: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/chapter-info.php?appID=${appId}&format=json`;
    return APIHandler.makeRequest(request);
  },

  getFastFacts: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/sales-companion.php?appID=${appId}&type=fastfacts&format=json`;
    return APIHandler.makeRequest(request);
  },

  getToolbox: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/sales-companion.php?appID=${appId}&type=toolbox&format=json`;
    return APIHandler.makeRequest(request);
  },

  getTrainingPages: (chapterId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v3/chapter-content.php?chapterID=${chapterId}&format=json`;
    return APIHandler.makeRequest(request);
  },

  getDLC: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/getDLC.php?appID=${appId}&format=json`;
    return APIHandler.makeRequest(request);
  },

  getVideos: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/carousel-video.php?appID=${appId}&type=both&autoPlay=true&format=json&object=true&app=new`;
    return APIHandler.makeRequest(request);
  },

  getImages: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/carousel-photo.php?appID=${appId}&format=json&object=true`;
    return APIHandler.makeRequest(request);
  },

  getCollection: (appId, type, object) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/collection.php?appID=${appId}&type=${type}&object=${object}`;
    return APIHandler.makeRequest(request);
  },

  getAppQuestions: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/chapter-content.php?appID=${appId}&format=json&type=questions`;
    return APIHandler.makeRequest(request);
  },

  getDownloadURL: file => `https://stack.travpromobile.com/download.php?url=${file}`,

  getAppInfo: (appId, format) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/app-info.php?app_id=${appId}&format=${format || 'json'}`;
    return APIHandler.makeRequest(request);
  },

  getSubApps: (appId) => {
    const request = `https://travpro.yourworldapps.nl/API/app/v2/subapps.php?format=json&app_id=${appId}`;
    return APIHandler.makeRequest(request);
  },

  fbSubscribe: (appId, token) => {
    const request = `https://cms.travpromobile.com/api/user/subscribe?app=${appId}&token=${token}`;
    return APIHandler.makeRequest(request);
  },

  fbUnsubscribe: (appId, token) => {
    const request = `https://cms.travpromobile.com/api/user/unsubscribe?app=${appId}&token=${token}`;
    return APIHandler.makeRequest(request);
  },

  fbSendMessage: (appId, title, body) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedBody = encodeURIComponent(body);
    const request = `https://cms.travpromobile.com/api/app/send-message?app=${appId}title=${encodedTitle}&body=${encodedBody}`;
    return APIHandler.makeRequest(request);
  },

  fbListUsers: (token) => {
    const request = `https://cms.travpromobile.com/api/user/list-user-topics?token=${token}`;
    return APIHandler.makeRequest(request);
  },

  getUserPoints(appId, email) {
    const request = `https://crm.travpromobile.com/api/points?email=${email}&app_id=${appId}`;
    return APIHandler.makeRequest(request);
  },

  setUserPoints(appId, { email, action, value }) {
    const request = `https://crm.travpromobile.com/api/point?email=${email}&action=${action}&action_value=${value}&app_id=${appId}`;
    return APIHandler.makeRequest(request, { method: 'POST' });
  },

  trackEvent: (appId, email, category, name, value) => {
    const action = 'click';
    const request = 'https://crm.travpromobile.com/api/event';
    const data = {
      app_id: appId, email, action, category, name, value,
    };

    const formData = new FormData();
    for (const item in data) {
      formData.append(item, data[item]);
    }

    const requestSettings = {
      method: 'POST',
      timeout: 5000,
      body: formData,
    };

    return APIHandler.makeRequest(request, requestSettings)
      .then(() => false);
  },
};
