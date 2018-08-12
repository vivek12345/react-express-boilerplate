import axios from 'axios';
import { util } from '@helpers/utils';
import constants from '../constants';

class ApiLibrary {
  constructor() {
    let timeout = Number(constants.REQUEST_TIMEOUT);
    this.instance = axios.create({
      baseURL: constants.DASHBOARD_APP_FRONT_END_URL,
      timeout: timeout
    });
    this.addInterceptor();
  }
  addInterceptor() {
    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error && error.response && error.response.status === 401) {
          const auth2 = window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
          if (auth2 != null) {
            auth2.signOut();
          }
        }
        util.showBackendError(error);
        return Promise.reject(error);
      }
    );
  }
  setAuthorizationToken(token) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }
  request(config) {
    return this.instance.request(config);
  }
}

const api = new ApiLibrary();
export { api };
