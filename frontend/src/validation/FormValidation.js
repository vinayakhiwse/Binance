import * as yup from "yup";

const SignUpValidations = yup.object({
  email: yup
    .string()
    .matches(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Please enter valid email"
    )
    .required("email is required"),
});

const OtpVerificationValidation = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
});

const PasswordValidation = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least 1 number")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
});

const ResetPasswordValidation = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least 1 number")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least 1 number")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
});

const PersonalDetailValidation = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Invalid characters. Only alphabets and spaces are allowed."
    ),
  panNumber: yup
    .string()
    .required("PAN Number is required")
    .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Invalid PAN Number"),
  aadharNumber: yup
    .string()
    .required("Aadhar Number is required")
    .matches(/^[0-9]{12}$/, "Invalid Aadhar Number"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  DOB: yup
    .date()
    .nullable()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth must be in the past"),
});

const PaymentValidation = yup.object({
  currency: yup.string().required("Currency is required."),
  Amount: yup.number().required("Amount is Required"),
});

export {
  SignUpValidations,
  OtpVerificationValidation,
  PasswordValidation,
  ResetPasswordValidation,
  PersonalDetailValidation,
  PaymentValidation,
};
