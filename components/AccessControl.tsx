'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { canAccessSchool, getCurrentUser, isAuthenticated } from '@/lib/auth';

interface AccessControlProps {
  schoolId: string;
  children: React.ReactNode;
}

export default function AccessControl({ schoolId, children }: AccessControlProps) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Check school access
    if (!canAccessSchool(schoolId)) {
      const user = getCurrentUser();
      // Redirect to their own school or platform
      if (user?.schoolId) {
        router.push(`/platform/school/${user.schoolId}`);
      } else {
        router.push('/platform');
      }
      return;
    }

    setHasAccess(true);
  }, [schoolId, router]);

  // Show loading state while checking access
  if (hasAccess === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Render children if access granted
  return <>{children}</>;
}
