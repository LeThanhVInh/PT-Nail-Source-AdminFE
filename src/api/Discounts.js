import axios from 'axios';
import constants, { generateRandomUuid } from '../providers/constants';
import { auth } from '../firebase';

export default class DiscountsAPI {
  static controllerName = 'Discounts';

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
        },
      };

      // const storeIds = itemData.storeIdList.map((i) => i.value);

      const requestBodyData = {
        id: generateRandomUuid(),
        name: itemData.name,
        discountTypeId: itemData.discountTypeId,
        value: itemData.value,
        startDate: itemData.startDate,
        endDate: itemData.endDate,
        storeIdList: itemData.storeIdList.map((i) => i.value),
      };

      console.log('requestBodyData', requestBodyData);

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

      const requestBodyData = {
        id: itemData.id,
        name: itemData.name,
        discountTypeId: itemData.discountTypeId,
        value: itemData.value,
        startDate: itemData.startDate,
        endDate: itemData.endDate,
        storeIdList: itemData.storeIdList.map((i) => i.value),
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
