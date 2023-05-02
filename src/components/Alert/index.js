import Swal from "sweetalert2/src/sweetalert2.js";

const MyAlert = ({
  title,
  text,
  icon = "error",
  cancelButton = false,
  confirmButton = false,
  method = false,
  cancelMethod = false,
  allowOutsideClick = true,
}) => {
  const swalWithCustomButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary m-1",
      cancelButton:
        "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary m-1",
    },
    buttonsStyling: false,
  });

  return swalWithCustomButtons
    .fire({
      title: title,
      text: text,
      icon: icon,
      background: "#424242",
      showCancelButton: Boolean(cancelButton),
      showConfirmButton: Boolean(confirmButton),
      confirmButtonText: confirmButton,
      cancelButtonText: cancelButton,
      allowOutsideClick: false,
    })
    .then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        method && method();
      } else {
        cancelMethod && cancelMethod();
      }
    });
};

export default MyAlert;
