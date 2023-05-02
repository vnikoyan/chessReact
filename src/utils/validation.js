import * as Yup from "yup";

export const Validation = {
  required: (msg?) => Yup.string().required(msg),

  name: (msg?) =>
    Yup.string()
      .max(100, "Maximum of 100 charchters allowed!")
      .required(msg || "Company name is required!"),

  customerName: (msg?) =>
    Yup.string()
      .max(100, "Maximum of 100 charchters allowed!")
      .required(msg || "Name is required!"),

  email: (msg?) =>
    Yup.string()
      .email("Email is not valid!")
      .matches(/((\.)+[a-zA-Z]{2,})$/, { message: "Email is not valid!" })
      .required(msg || "Email is required!"),

  password: (msg?) =>
    Yup.string()
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /[a-z]/,
        "Password must contain at least one lowercase character"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .required(msg || "Password is required!"),

  password1: (msg?) =>
    Yup.string()
      .min(8, "Password is to short!")
      .required(msg || "Password is required!"),

  picture: () => Yup.string().required("Profile picture is required!"),

  website: () =>
    Yup.string()
      .url("Website address is not valid!")
      .test("has-at", "Website address is not valid!", (val) => {
        return !/@+/.test(`${val}`);
      })
      .matches(/((\.)+[a-zA-Z]{2,})$/, { message: "Domain is not valid!" })
      // .matches(
      //   // eslint-disable-next-line no-useless-escape
      //   /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
      //   'Website address is not valid!',
      // )
      .required("Company website address is required!"),

  phone: () =>
    Yup.string()
      .matches(/^\+?\d{9,}/, "Phone number is not valid!")
      .test("is-phone", "Phone number is not valid!", (val) => {
        return !/\D/.test(`${val?.replace("+", "")}`);
      })
      .required("Phone number is required!"),

  region: () => Yup.string().required("State/Region is required!"),

  description: (msg?) =>
    Yup.string()
      .max(1000, "Maximum of 1000 charchters allowed!")
      .required(msg || "Company description is required!"),

  confirmPassword: () =>
    Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),

  price: () =>
    Yup.string()
      .matches(/^\d*\.?\d*$/, "Price is invalid!")
      .test("priceMinMax", "Invalid price!", (value) => {
        const isValidInput = /^\d*\.?\d*$/.test(`${value}`);

        if (!isValidInput) {
          return false;
        }

        if (Number(value) < 1 && Number(value) > 1000000) {
          return false;
        }
        return true;
      })
      .required("Price is required!"),

  year: () =>
    Yup.string().test("isYear", "Invalid year", (value) => {
      if (!value) {
        return true;
      }
      const hasNonDigit = /\D/.test(value);

      if (hasNonDigit) {
        return false;
      }

      const today = new Date();
      const year = today.getFullYear();

      return year >= Number(value) && Number(value) >= 1000;
    }),

  onlyNumbers: (msg?) =>
    Yup.string().test("isNumbers", msg || "Only numbers!", (value) => {
      if (!value) {
        return true;
      }
      const hasNonDigit = /\D/.test(value);
      if (hasNonDigit) {
        return false;
      }
      return true;
    }),
  object: (shape: object) => Yup.object().shape(shape),

  address: () => Yup.string().max(100, "Maximum of 100 charchters allowed!"),

  deliveryInfo: () =>
    Yup.string().max(100, "Maximum of 100 charchters allowed!"),

  postcode: () => Yup.string().max(10, "Maximum of 10 charchters allowed!"),
};

export const SignupFormValidation = Validation.object({
  name: Validation.name(),
  email: Validation.email(),
  password: Validation.password(),
});

export const CustomerSignupFormValidation = Validation.object({
  name: Validation.customerName(),
  email: Validation.email(),
  password: Validation.password(),
});

export const ProfileFormValidation = Validation.object({
  profilePicture: Validation.picture().nullable(),
  website: Validation.website(),
  phoneNumber: Validation.phone(),
  regionId: Validation.region().nullable(),
  about: Validation.description(),
});

export const EditProfileFormValidation = Validation.object({
  name: Validation.name(),
  profilePicture: Validation.picture(),
  website: Validation.website(),
  phoneNumber: Validation.phone(),
  regionId: Validation.region(),
  about: Validation.description(),
});

export const LoginFormValidation = Validation.object({
  email: Validation.email(),
  password: Validation.password1(),
});

export const ResetPassRequestForm = Validation.object({
  email: Validation.email(),
});

export const ResetPassSubmitForm = Validation.object({
  password: Validation.password(),
  confirmPassword: Validation.confirmPassword(),
});

export const NewProductForm = Validation.object({
  name: Validation.name("Please enter a name!"),
  regionId: Validation.required("Please select region!"),
  varietalId: Validation.required("Please select varietal!"),
  typeId: Validation.required("Please select type!"),
  price: Validation.price(),
  minPurchase: Validation.required("Please select amount!"),
  releaseYear: Validation.year(),
  size: Validation.onlyNumbers("Invalid volume size!"),
  availableQty: Validation.onlyNumbers("Invalid quantity!"),
  // image,
  description: Validation.required("Please add description!"),
});

export const DeliveryDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Full name is too short!")
    .max(100, "Full name is too long!")
    .required("This field is required"),
  email: Validation.email("This field is required"),
  address: Validation.address().required("This field is required"),
  deliveryInfo: Validation.deliveryInfo(),
  stateId: Yup.number().required("This field is required"),
  postcode: Validation.postcode().required("This field is required"),
});

export const CustomerSettingsSchema = Yup.object().shape({
  name: Validation.customerName(),
  email: Validation.email(),
  address: Validation.address(),
  deliveryInfo: Validation.deliveryInfo(),
  postcode: Validation.postcode(),
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one number"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one number")
    .when("currentPassword", {
      is: (currentPassword) => currentPassword?.length >= 8,
      then: Yup.string().required("New password is required!"),
    }),
});
