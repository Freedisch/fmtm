// import { fetchLocalJSONAPI } from '../network/genericJSONRequest';
// import * as safeStorage from '../utils/safe_storage';

import environment from "../environment";

// import { OSM_REDIRECT_URI } from '../config';
const OSM_REDIRECT_URI = "http://127.0.0.1:8080/authorized"
// Code taken from https://github.com/mapbox/osmcha-frontend/blob/master/src/utils/create_popup.js
export function createPopup(title: string = 'Authentication', location: string) {
  const width = 500;
  const height = 630;
  const settings = [
    ['width', width],
    ['height', height],
    ['left', window.innerWidth / 2 - width / 2],
    ['top', window.innerHeight / 2 - height / 2],
  ]
    .map((x) => x.join('='))
    .join(',');

  const popup = window.open(location, '_blank', settings);
  if (!popup) return;

  return popup;
}

export const createLoginWindow = (redirectTo) => {
  const popup = createPopup('OSM auth', '');
  // let url = `system/authentication/login/?redirect_uri=${OSM_REDIRECT_URI}`;
  fetch(`${environment.baseApiUrl}/auth/osm_login/`).then((resp) => resp.json()).then((resp) => {
    popup.location = resp.login_url;
    // Perform token exchange.
    // Get the URL from which you want to extract parameters
    const url = new URL(resp.login_url);

    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);

    // Retrieve individual parameters by name
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    window.authComplete = () => {
      let callback_url = `${environment.baseApiUrl}/auth/callback/?code=${code}&state=${state}`;

      try {
        if (resp.state === state) {
          fetch(callback_url).then((res) => {
            const params = new URLSearchParams({
              // username: res.username,
              osm_oauth_token: res.access_token,
              // session_token: res.session_token,
              // picture: res.picture,
              redirect_to: redirectTo,
            }).toString();
            let redirectUrl = `/osmauth?${params}`;
            window.location.href = redirectUrl;
            fetch(`${environment.baseApiUrl}/auth/me/?access`, {
              headers: {
                "access-token": res.access_token
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
            }).then((resp) => resp.json()).then((resp) => {
              console.log(resp, 'resp');
              alert(resp);
            });
            // window.close();
          });
        } else {
          throw new Error('States do not match');
        }
      } catch (error) {
        console.log(error, 'error');
      }
    };
  });
};
