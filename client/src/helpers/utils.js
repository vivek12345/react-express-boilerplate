import { notification } from 'antd';
import { storage } from './Storage';

class Utilility {
  isLoggedIn() {
    return !!storage.get('user');
  }
  getCurrentActiveRoute(path) {
    let splittedPath = path.split('/');
    if (splittedPath && Array.isArray(splittedPath) && splittedPath.length > 1) {
      return splittedPath[1];
    }
    return null;
  }
  openNotification(type, message, description) {
    notification[type]({
      message: message,
      description: description,
      style: {
        width: 600,
        marginLeft: 335 - 600
      }
    });
  }
  showBackendError(error) {
    let errorMessage = null;
    if (error) {
      let { response } = error;
      if (response && response['data']) {
        let { data } = response;
        errorMessage = data['error'];
      }
    }
    this.openNotification('error', 'Not Allowed', errorMessage || 'Some error occurred');
  }
}
const util = new Utilility();

export { util };
