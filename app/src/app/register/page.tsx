export default function Register() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create account</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-xs text-gray-500">*optional</span>
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Passwords must be at least 5 characters.
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
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
