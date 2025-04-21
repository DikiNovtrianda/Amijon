export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Login Form */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign-In</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or mobile phone number
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
              placeholder="Enter your password"
              className="mt-1 p-2 border border-gray-300 rounded w-full text-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded w-full"
          >
            Sign-In
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-500">
        <p>
          New to Amazon?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Create your Amazon account
          </a>
        </p>
      </footer>
    </div>
  );
}
