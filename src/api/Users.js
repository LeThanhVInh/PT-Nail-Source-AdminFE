import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

class UserAPI {
  static controllerName = 'Users';

  static async GetById(id) {
    try {
      let token = await auth.currentUser.getIdToken();
      console.log(token)

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/getById`, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }

    return null;
  }

  static async UpdateProfile(userData) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: userData.userId,
        },
      };

      const requestBodyData = {
        "UserId": userData.userId,
        "Fullname": userData.fullName,
        "Email": userData.email,
        "Phone": userData.phone,
        "CurrencyId": userData.currencyId,
        "TimeZoneId": userData.timeZoneId,
        "UilanguageId": userData.uilanguageId,
      };

      const response = await axios.put(`${constants.apiUrl}/${this.controllerName}/UpdateProfile`, requestBodyData, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}
export default UserAPI;
