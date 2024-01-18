import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

class GetOnlyAPI {
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
      console.log(err.message);
    }

    return null;
  }
}
export default GetOnlyAPI;
