import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  isLoggedIn,
  login,
  sendConfirmationEmail,
} from '../../firebase/auth';
import { Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    setError(null);
    setInfo(null);

    try {
      await login(
        data.get('email')?.toString() ?? '',
        data.get('password')?.toString() ?? '',
      );

      const user = getCurrentUser();
      if (!user?.emailVerified) {
        setInfo(
          'Your email has not been verified. Click to resend verification.',
        );
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';

      if (message.includes('invalid-credential')) {
        setError('Login failed. Please check your credentials.');
      } else if (message.includes('invalid-email')) {
        setError('You must use a valid email');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn()) {
    return <></>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Mern Template</h1>
        <p className="text-gray-600">Your Application</p>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base disabled:opacity-50"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base disabled:opacity-50"
                placeholder="Password"
              />
            </div>
          </div>

          {info && (
            <div className="text-center">
              <button
                type="button"
                onClick={sendConfirmationEmail}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                {info}
              </button>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 text-sm">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
