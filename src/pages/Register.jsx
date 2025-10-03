import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Asterisk } from "lucide-react";

const Register = () => {
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: yup.object({
      fullname: yup
        .string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters"),
      email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
      username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      let upload = new FileReader();
      upload.onload = () => {
        setImage(upload.result);
      };
      upload.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // Helper function to determine input styles
  const getInputStyles = (fieldName) => {
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];

    const baseStyles = "block w-full rounded-md bg-white px-3 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6";

    if (isTouched && hasError) {
      return `${baseStyles} border-2 border-red-500 outline-none focus:outline-red-500`;
    }

    return `${baseStyles} border border-gray-300 focus:outline-blue-500`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src="./skillLinkLogo.png"
            alt="Skill Link Logo"
            className="mx-auto h-20 w-auto mt-2"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join Skill Link today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Profile Image Upload */}
            <div className="flex justify-center flex-col items-center gap-3 mb-6">
              <div className="relative">
                <img
                  src={image || "/api/placeholder/80/80"}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-blue-500 object-cover"
                />
              </div>
              <div className="text-center">
                <label
                  htmlFor="profile-image"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={getFile}
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <div className="flex align-center">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Asterisk size={12} color='red' />
              </div>
              <div className="mt-1">
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  required
                  autoComplete="name"
                  className={getInputStyles("fullname")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.fullname}
                  </small>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex align-center">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Asterisk size={12} color='red' />
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={getInputStyles("email")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.email}
                  </small>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <div className="flex align-center">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Asterisk size={12} color='red' />
              </div>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  className={getInputStyles("username")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.username}
                  </small>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex align-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Asterisk size={12} color='red' />
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  className={getInputStyles("password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.password}
                  </small>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex align-center">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Asterisk size={12} color='red' />
              </div>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                  autoComplete="new-password"
                  className={getInputStyles("confirmPassword")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.confirmPassword}
                  </small>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition duration-200 shadow-sm"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already a member?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold text-blue-500 hover:text-blue-400 transition duration-200"
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;