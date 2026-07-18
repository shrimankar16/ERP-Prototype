'use client';

// Level 2: Single School Admin Dashboard
import { use } from 'react';
import Link from 'next/link';
import { getSchoolById, getStudentsBySchool, getApplicantsBySchool } from '@/lib/mockData';
import ThemeToggle from '@/components/ThemeToggle';

export default function SchoolDashboard({ params }: { params: Promise<{ schoolId: string }> }) {
  const { schoolId } = use(params);
  const school = getSchoolById(schoolId);
  const students = getStudentsBySchool(schoolId);
  const applicants = getApplicantsBySchool(schoolId);

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">School Not Found</h1>
          <Link href="/platform" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Return to Platform Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const modules = [
    {
      name: 'Admissions',
      href: `/platform/school/${schoolId}/admissions`,
      icon: '📝',
      description: 'Manage applications and enrollment',
      stat: `${applicants.length} pending`,
      color: 'blue'
    },
    {
      name: 'Attendance',
      href: `/platform/school/${schoolId}/attendance`,
      icon: '📊',
      description: 'Track daily attendance',
      stat: 'Mark today',
      color: 'green'
    },
    {
      name: 'Fee Management',
      href: `/platform/school/${schoolId}/fees`,
      icon: '💰',
      description: 'Fee structure and payments',
      stat: 'View receipts',
      color: 'purple'
    },
    {
      name: 'Exams & Grades',
      href: `/platform/school/${schoolId}/exams`,
      icon: '📚',
      description: 'Exam schedule and results',
      stat: 'Enter marks',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/platform" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{school.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{school.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                school.status === 'Live Pilot' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                school.status === 'Active' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
              }`}>
                {school.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                school.plan === 'Premium' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                school.plan === 'Standard' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {school.plan} Plan
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* School Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{school.studentCount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Admin Contact</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{school.adminContact.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{school.adminContact.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Phone</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{school.adminContact.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Onboarded</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {new Date(school.onboardedDate).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{applicants.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Attendance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">--</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">School Management Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-5xl mb-4">{module.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{module.stat}</span>
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New application received', detail: 'Ishaan Verma - Class 6', time: '2 hours ago', icon: '📝' },
              { action: 'Fee payment recorded', detail: 'Aarav Sharma - ₹52,500', time: '5 hours ago', icon: '💰' },
              { action: 'Exam marks entered', detail: 'Class 10 - Mathematics', time: '1 day ago', icon: '📚' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
