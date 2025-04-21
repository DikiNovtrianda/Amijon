export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Registration Form */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create account</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your name
            </label>
            <input
              type="text"
              id="name"
              placeholder="First and last name"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="At least 6 characters"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-gray-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Re-enter password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Re-enter your password"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded w-full"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-500">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </footer>
    </div>
  );
}
