// Landing page - entry point for investors
'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SchoolERP
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/login"
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/platform"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Multi-Tenant SaaS Platform for Schools
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            School Management,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Built to Scale
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            One platform. Thousands of schools. Complete ERP solution that onboards new institutions in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/platform"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-200 text-lg"
            >
              View Platform Demo
            </Link>
            <Link
              href="/platform/onboard-new"
              className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border-2 border-gray-200 dark:border-gray-600 text-lg"
            >
              See Onboarding Flow
            </Link>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Schools', value: '6+', subtext: 'and growing' },
              { label: 'Students', value: '1,825+', subtext: 'managed' },
              { label: 'Onboarding', value: '<5 min', subtext: 'avg time' },
              { label: 'Uptime', value: '99.9%', subtext: 'guaranteed' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Indian schools struggle with fragmented manual processes, Excel sheets, and expensive on-premise software. 
            Existing solutions require weeks of setup, dedicated IT teams, and don't scale across multiple institutions.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: '📊', title: 'Manual Chaos', desc: 'Paper-based attendance, fee tracking in Excel' },
              { icon: '💰', title: 'High Cost', desc: 'Legacy systems cost ₹5L+ with month-long setup' },
              { icon: '🔒', title: 'No Scale', desc: 'Each school needs custom implementation' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Solution</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A true multi-tenant SaaS platform. One codebase serving hundreds of schools with complete data isolation, 
            instant onboarding, and zero setup complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Complete ERP Suite',
              features: ['Admissions & Enrollment', 'Attendance Tracking', 'Fee Management & Receipts', 'Exams & Gradebook'],
              icon: '🎓'
            },
            {
              title: 'Built for Scale',
              features: ['Multi-tenant architecture', '5-minute onboarding', 'Handles 50-5000 students', 'Auto-scaling infrastructure'],
              icon: '🚀'
            },
            {
              title: 'Zero IT Overhead',
              features: ['Cloud-hosted (Vercel)', 'Automatic updates', 'Mobile responsive', '24/7 availability'],
              icon: '☁️'
            },
            {
              title: 'Affordable & Transparent',
              features: ['₹15K-45K annual pricing', 'No hidden setup fees', 'Cancel anytime', 'Free trial included'],
              icon: '💎'
            }
          ].map((solution, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{solution.title}</h3>
              <ul className="space-y-3">
                {solution.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Explore the live platform dashboard showing multiple schools, onboarding flow, and complete admin features.
          </p>
          <Link
            href="/platform"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg font-bold hover:shadow-xl transition-all duration-200 text-lg"
          >
            Launch Platform Demo →
          </Link>
          <p className="text-sm opacity-75 mt-6">
            * Demo includes illustrative data for presentation purposes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2024 SchoolERP Platform. Built for investor demonstration.</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Note: Platform statistics and most school data are illustrative for demo purposes.
              <br />Items marked "Live Pilot" represent actual deployment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
