import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-25 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src="./public/skillLinkLogo.jpg" alt="Skill Link Logo" className="mx-auto h-30 w-auto" />
              <h2 className="text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input id="email" type="email" name="email" required autocomplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/55 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-blue-400 hover:text-blue-300">Forgot password?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input id="password" type="password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/55 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Sign in</button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-400">
                Not a member?
                <Link to={'/register'} className="font-semibold text-blue-400 hover:text-blue-300">Register for free</Link>
              </p>
            </div>
          </div>

        </div>
        )
}

        export default SignIn