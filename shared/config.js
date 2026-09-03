window.WL = {
  API_URL: (function () {
    try {
      var override = localStorage.getItem('wl_api');
      if (override) return override;
    } catch (e) {}
    return 'https://api.healthyplan.ca';
  })(),
  GOOGLE_CLIENT_ID: 'REPLACE_AT_DEPLOY'
};
