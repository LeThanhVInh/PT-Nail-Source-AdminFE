let apiUrl = 'https://phanmemvas.vn:68';
// let apiUrl = 'http://localhost:5000';

const exportedObject = {
  apiUrl: apiUrl,
  Spacer: <div style={{ flex: '1' }}></div>,
};
export default exportedObject;

export const dataTablePadWidth = 25;

export const modalSizes = {
  mini: '360px',
  tiny: '540px',
  medium: '720px',
  large: '1080px',
  full: 'auto',
};

export const getSizeOfModal = (type) => {
  if (type === modalSizes.mini && window.innerWidth < 360) return modalSizes.full;
  else if (type === modalSizes.tiny && window.innerWidth < 540) return modalSizes.full;
  else if (type === modalSizes.medium && window.innerWidth < 720) return modalSizes.full;
  else if (type === modalSizes.large && window.innerWidth < 1080) return modalSizes.full;
  else return type.toString();
};
export const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export function LoadOptDropdown(jsonList, labelField, valueField, hasNoOption, labelNoOption, valueNoOption) {
  let arr = [];
  if (jsonList != null) {
    arr = jsonList.map((item) => ({
      label: item[labelField],
      value: item[valueField],
    }));
  }

  if (hasNoOption)
    arr.unshift({
      label: labelNoOption,
      value: valueNoOption,
    });
  return arr;
}
export function generateRandomUuid() {
  const hexDigits = '0123456789abcdef';
  const generateRandomDigit = () => hexDigits[Math.floor(Math.random() * 16)];

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, generateRandomDigit)
    .replace(/y/, () => ['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)]);

  return uuid;
}
