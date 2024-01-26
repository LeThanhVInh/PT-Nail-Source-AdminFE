import axios from 'axios';
import constants, { generateRandomUuid } from '../providers/constants';
import { auth } from '../firebase';

export default class CategoryAPI {
  static controllerName = 'Categories';

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

  static async GetList(SearchValue) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          SearchValue: SearchValue === '' ? null : SearchValue,
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
          'content-type': 'multipart/form-data',
        },
      };

      let formDataApi = new FormData();
      formDataApi.append('Id', generateRandomUuid());
      formDataApi.append('Name', itemData.name);
      formDataApi.append('IsActive', itemData.isActive);
      formDataApi.append('ImageFile', itemData.imageFile);

      const response = await axios.post(`${constants.apiUrl}/${this.controllerName}/Insert`, formDataApi, configs);
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
          'content-type': 'multipart/form-data',
        },
        params: {
          id: itemData.id,
        },
      };

      let formDataApi = new FormData();
      formDataApi.append('Id', itemData.id);
      formDataApi.append('Name', itemData.name);
      formDataApi.append('IsActive', itemData.isActive);
      formDataApi.append('ImageFile', itemData.imageFile);

      const response = await axios.put(`${constants.apiUrl}/${this.controllerName}/Update`, formDataApi, configs);
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

  static async UpdateActiveStatus(id, checkedValue) {
    try {
      let token = await auth.currentUser.getIdToken();

      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
          activeValue: checkedValue,
        },
      };

      const response = await axios.put(`${constants.apiUrl}/${this.controllerName}/UpdateActiveStatus`, null, configs);
      if (response.data != null && response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}
