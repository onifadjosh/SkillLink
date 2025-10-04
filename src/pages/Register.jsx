import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Asterisk } from "lucide-react";
import Axios from "axios";
import { ToastService } from "../components/Toast";

const Register = () => {
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);

  const skillOptions = [
    "Barber",
    "Hair Stylist",
    "Makeup Artist",
    "Nail Technician",
    "Massage Therapist",
    "Skincare Specialist",
    "Fashion Designer",
    "Tailor",
    "Personal Stylist",
    "Graphic Designer",
    "Photographer",
    "Videographer",
    "Interior Designer",
    "Architect",
    "Personal Trainer",
    "Yoga Instructor",
    "Nutritionist",
    "Chef",
    "Baker",
    "Event Planner",
    "Florist",
    "Gardener",
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Mechanic",
    "Tutor",
    "Music Teacher",
    "Language Instructor",
    "Web Developer",
    "Mobile App Developer",
    "Social Media Manager",
    "Content Writer",
    "Virtual Assistant",
    "Accountant",
    "Consultant",
    "Life Coach",
    "Therapist",
    "Childcare Provider",
  ];

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateOfBirth: "",
      skill: [],
      profilePicture: null,
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
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
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
      gender: yup
        .string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Please select a valid gender"),
      dateOfBirth: yup
        .string()
        .required("Date of birth is required")
        .test("age", "You must be at least 13 years old", (value) => {
          if (!value) return false;
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            return age - 1 >= 13;
          }
          return age >= 13;
        })
        .test("max-age", "You must be under 120 years old", (value) => {
          if (!value) return false;
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          return age <= 120;
        }),
      skill: yup
        .array()
        .min(1, "Please select at least one skill")
        .max(10, "You can select up to 10 skills"),
      profilePicture: yup
        .mixed()
        .nullable()
        .required("Profile picture is required")
        .test("fileSize", "File too large", (value) => {
          if (!value) return false;
          const base64Length = value.length;
          const sizeInBytes = Math.floor((base64Length * 3) / 4);
          return sizeInBytes <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (!value) return false;
          return (
            value.startsWith("data:image/jpeg;") ||
            value.startsWith("data:image/jpg;") ||
            value.startsWith("data:image/png;")
          );
        }),
    }),

    onSubmit: async (values) => {
      setloading(true);
      console.log("Form values:", values);

      const submitData = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth),
      };

      console.log("Submitting data:", submitData);

      try {
        let response = await Axios.post("http://localhost:5007/user/signup", {
          fullname: submitData.fullname,
          email: submitData.email,
          username: submitData.username,
          password: submitData.password,
          gender: submitData.gender,
          dateOfBirth: submitData.dateOfBirth,
          skill: submitData.skill,
          profilePicture: submitData.profilePicture
            ? submitData.profilePicture
            : null,
        });
        console.log("Registration successful:", response.data);
        ToastService.info('Account created successfully.🥳');

        

       
      } catch (error) {
        console.log("Registration error:", error);
        if (error.response?.status === 409) {
          ToastService.error('Email or username already exists');
        } else {
          ToastService.error('Registration failed. Please try again.');
        }
      } finally {
        setloading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      formik.setFieldValue("profilePicture", null);
      setImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      formik.setFieldError("profilePicture", "Please select an image file");
      formik.setFieldValue("profilePicture", null);
      setImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      formik.setFieldError("profilePicture", "File size must be less than 5MB");
      formik.setFieldValue("profilePicture", null);
      setImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImage(base64String);
      formik.setFieldValue("profilePicture", base64String);
      formik.setFieldError("profilePicture", null);
    };
    reader.onerror = () => {
      formik.setFieldError("profilePicture", "Error reading file");
      formik.setFieldValue("profilePicture", null);
      setImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSkillChange = (skill) => {
    const currentSkills = formik.values.skill;
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    formik.setFieldValue("skill", updatedSkills);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const getInputStyles = (fieldName) => {
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];

    const baseStyles =
      "block w-full rounded-md bg-white px-3 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6";

    if (isTouched && hasError) {
      return `${baseStyles} border-2 border-red-500 outline-none focus:outline-red-500`;
    }

    return `${baseStyles} border border-gray-300 focus:outline-blue-500`;
  };

  const getSelectStyles = (fieldName) => {
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];

    const baseStyles =
      "block w-full rounded-md bg-white px-3 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6";

    if (isTouched && hasError) {
      return `${baseStyles} border-2 border-red-500 outline-none focus:outline-red-500`;
    }

    return `${baseStyles} border border-gray-300 focus:outline-blue-500`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
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
          Join Skill Link today and showcase your services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Profile Image Upload */}
            <div className="flex justify-center flex-col items-center gap-3 mb-6">
              <div className="relative">
                <img
                  src={image || "./skillLinkLogo.png"}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-blue-500 object-cover w-20 h-20"
                />
              </div>
              <div className="text-center">
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png"
                  onBlur={formik.handleBlur}
                  onChange={handleFileChange}
                />
                {formik.touched.profilePicture &&
                  formik.errors.profilePicture && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {formik.errors.profilePicture}
                    </small>
                  )}
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
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
                <div className="flex items-center">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
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
                <div className="flex items-center">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
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

              {/* Gender */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
                </div>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    className={getSelectStyles("gender")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {formik.errors.gender}
                    </small>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
                </div>
                <div className="mt-1">
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    required
                    className={getInputStyles("dateOfBirth")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <small className="text-red-500 text-xs mt-1 block">
                      {formik.errors.dateOfBirth}
                    </small>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
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
                <div className="flex items-center">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Asterisk size={12} color="red" className="ml-1" />
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
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <small className="text-red-500 text-xs mt-1 block">
                        {formik.errors.confirmPassword}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Services & Skills
                </label>
                <Asterisk size={12} color="red" className="ml-1" />
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Select the services you offer (1-10 skills)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md">
                {skillOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formik.values.skill.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
              {formik.touched.skill && formik.errors.skill && (
                <small className="text-red-500 text-xs mt-1 block">
                  {formik.errors.skill}
                </small>
              )}
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Selected: {formik.values.skill.length} services
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition duration-200 shadow-sm"
              >
                {loading ? 'Creating Account ...': 'Create Account' }
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
