let apiUrl = "https://phanmemvas.vn:444";

const exportedObject = {
    'apiUrl': apiUrl,
};
export default exportedObject

export const dataTablePadWidth = 25;

export const modalSizes = {
    mini: "360px",
    tiny: "540px",
    medium: "720px",
    large: "1080px",
    full: "auto",
};

export const getSizeOfModal = (type) => {
    if (type === modalSizes.mini && window.innerWidth < 360)
        return modalSizes.full;
    else if (type === modalSizes.tiny && window.innerWidth < 540)
        return modalSizes.full;
    else if (type === modalSizes.medium && window.innerWidth < 720)
        return modalSizes.full;
    else if (type === modalSizes.large && window.innerWidth < 1080)
        return modalSizes.full;
    else
        return type.toString();
}