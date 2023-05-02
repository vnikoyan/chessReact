export const transformSelectItem = (item) => ({
  value: item.id,
  label: item.name,
});

export const getImageUri = (image) => {
  if (image) {
    return typeof image === "string" ? image : URL.createObjectURL(image);
  }
  return undefined;
};

export const generateFileURI = (filename_to_dl, data_to_dl) => {
  let elemx = document.createElement("a");
  elemx.href =
    "data:text/plain;charset=utf-8," + encodeURIComponent(data_to_dl); // ! encodeURIComponent
  elemx.download = filename_to_dl;
  elemx.style.display = "none";
  document.body.appendChild(elemx);
  elemx.click();
  document.body.removeChild(elemx);
};

export const generateFileBlob = (filename_to_dl, data_to_dl) => {
  let blobx = new Blob([data_to_dl], { type: "application/octet-stream" }); // ! Blob
  let elemx = window.document.createElement("a");
  elemx.href = window.URL.createObjectURL(blobx); // ! createObjectURL
  elemx.download = filename_to_dl;
  elemx.style.display = "none";
  document.body.appendChild(elemx);
  elemx.click();
  document.body.removeChild(elemx);
};

export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}/${month}/${year}`;
};

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
