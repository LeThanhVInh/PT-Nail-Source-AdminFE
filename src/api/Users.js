import axios from 'axios';
import constants from '../providers/constants';
import { auth } from '../firebase';

class UserAPI {
  static controllerName = 'Users';

  static async GetById(id) {
    try {
      let token = await auth.currentUser.getIdToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/getById`, config);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }

    return null;
  }
}
export default UserAPI;
