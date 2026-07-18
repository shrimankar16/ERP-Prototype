'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCurrentUser, type User } from '@/lib/auth';
import Link from 'next/link';

// Mock users for demo
const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    name: 'DPS Admin',
    email: 'admin@dps.com',
    role: 'school_admin',
    schoolId: 'school-1'
  },
  {
    id: 'user-2',
    name: 'Xavier Admin',
    email: 'admin@xavier.com',
    role: 'school_admin',
    schoolId: 'school-2'
  },
  {
    id: 'user-3',
    name: 'Platform Admin',
    email: 'super@platform.com',
    role: 'super_admin'
  },
  {
    id: 'user-4',
    name: 'Math Teacher',
    email: 'teacher@dps.com',
    role: 'teacher',
    schoolId: 'school-1',
    assignedClasses: ['9', '10']
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = DEMO_USERS.find(u => u.email === email);
    
    if (!user) {
      setError('User not found. Use one of the demo accounts below.');
      return;
    }
    
    setCurrentUser(user);
    
    // Redirect based on role
    if (user.role === 'super_admin') {
      router.push('/platform');
    } else if (user.schoolId) {
      router.push(`/platform/school/${user.schoolId}`);
    } else {
      router.push('/platform');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">SE</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SchoolERP
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access your school dashboard</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="admin@school.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
                defaultValue="demo123"
                disabled
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * Password validation disabled for demo
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Demo Accounts:</p>
            <div className="space-y-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setEmail(user.email)}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user.email} • {user.role}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is a demo login. In production, proper authentication would be required.
          </p>
        </div>
      </div>
    </div>
  );
}
