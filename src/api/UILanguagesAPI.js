import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

class UILanguagesAPI {
  static controllerName = 'UILanguages';

  static async GetList() {
    try {
      let token = await auth.currentUser.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/GetList`, config);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }

    return null;
  }
}
export default UILanguagesAPI;
