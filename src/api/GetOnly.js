import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

export default class GetOnlyAPI {
  static controllerName = 'GetOnly';

  static async GetCurrencyList() {
    try {
      let token = await auth.currentUser.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/GetCurrencyList`, config);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async GetTimeZoneList() {
    try {
      let token = await auth.currentUser.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/GetTimeZoneList`, config);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }
} 
