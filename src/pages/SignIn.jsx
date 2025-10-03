import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),

    onSubmit: (values) => {
      console.log('Sign in attempt:', values)
    },
  })

  const getInputStyles = (fieldName) => {
    const isTouched = formik.touched[fieldName]
    const hasError = formik.errors[fieldName]
    
    const baseStyles = "block w-full rounded-md bg-white px-3 py-2.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border"
    
    if (isTouched && hasError) {
      return `${baseStyles} border-red-500 outline-none focus:outline-red-500`
    }
    
    return `${baseStyles} border-gray-300 focus:outline-blue-500 focus:border-blue-500`
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    formik.handleSubmit()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="./public/skillLinkLogo.jpg" 
            alt="Skill Link Logo" 
            className="mx-auto h-20 w-auto" 
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back to Skill Link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  autoComplete="email"
                  className={getInputStyles('email')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter your email address"
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.email}
                  </small>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a 
                    href="#" 
                    className="font-medium text-blue-500 hover:text-blue-400 transition duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  autoComplete="current-password"
                  className={getInputStyles('password')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-red-500 text-xs mt-1 block">
                    {formik.errors.password}
                  </small>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="rememberMe"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="rememberMe" 
                className="block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition duration-200 shadow-sm"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to Skill Link?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                to={'/register'} 
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition duration-200 shadow-sm w-full"
              >
                Register for free
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn