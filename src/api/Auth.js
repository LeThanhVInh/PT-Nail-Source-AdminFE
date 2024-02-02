import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

export default class AuthAPI {
  static controllerName = 'Auth';

  static async CheckToken() {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/CheckToken`, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}
