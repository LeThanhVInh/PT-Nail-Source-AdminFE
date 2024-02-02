import axios from 'axios';
import constants, { generateRandomUuid } from '../providers/constants';
import { auth } from '../firebase';

export default class UILanguageAPI {
  static controllerName = 'UILanguages';

  static async GetById(id) {
    try {
      let token = await auth.currentUser.getIdToken();

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
      console.log(err);
    }

    return null;
  }

  static async GetList() {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${constants.apiUrl}/${this.controllerName}/getList`, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async Insert(itemData) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const requestBodyData = {
        id: generateRandomUuid(),
        name: itemData.name === '' ? null : itemData.name,
        jsonData: itemData.jsonData === '' ? null : itemData.jsonData,
      };

      const response = await axios.post(`${constants.apiUrl}/${this.controllerName}/Insert`, requestBodyData, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async Update(itemData) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: itemData.id,
        },
      };

      let requestBodyData = {
        id: itemData.id,
        name: itemData.name === '' ? null : itemData.name,
        jsonData: itemData.jsonData.toString() === '' ? null : JSON.stringify(itemData.jsonData),
      };

      const response = await axios.put(`${constants.apiUrl}/${this.controllerName}/Update`, requestBodyData, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async Delete(id) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      };

      const response = await axios.delete(`${constants.apiUrl}/${this.controllerName}/Delete`, configs);
      if (response.data != null && response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  static async DeleteMultiple(ids) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: ids,
      };

      const response = await axios.delete(`${constants.apiUrl}/${this.controllerName}/DeleteMultiple`, configs);
      if (response.data != null && response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }

    return false;
  }
}
