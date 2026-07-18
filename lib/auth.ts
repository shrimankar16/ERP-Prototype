// Authentication and Authorization Layer
// This is a simplified auth system for demo purposes
// In production, use NextAuth.js, Clerk, or similar

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string; // Only for school-level users
  assignedClasses?: string[]; // For teachers
}

// Mock current user - In production, this would come from session
let currentUser: User | null = null;

// Initialize with a default user for demo
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  } else {
    // Default to school-1 admin for demo
    currentUser = {
      id: 'user-1',
      name: 'Admin User',
      email: 'admin@school1.com',
      role: 'school_admin',
      schoolId: 'school-1'
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

/**
 * Get the currently logged-in user
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  if (!currentUser) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  }
  
  return currentUser;
}

/**
 * Get the current user's school ID
 */
export function getCurrentSchoolId(): string | null {
  const user = getCurrentUser();
  return user?.schoolId || null;
}

/**
 * Check if current user can access a specific school
 */
export function canAccessSchool(schoolId: string): boolean {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Super admins can access all schools
  if (user.role === 'super_admin') return true;
  
  // School-level users can only access their own school
  return user.schoolId === schoolId;
}

/**
 * Check if current user can access a specific class
 */
export function canAccessClass(schoolId: string, classNumber: number): boolean {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Super admins can access everything
  if (user.role === 'super_admin') return true;
  
  // Must be from the same school
  if (user.schoolId !== schoolId) return false;
  
  // School admins can access all classes in their school
  if (user.role === 'school_admin') return true;
  
  // Teachers can only access their assigned classes
  if (user.role === 'teacher' && user.assignedClasses) {
    return user.assignedClasses.includes(classNumber.toString());
  }
  
  return false;
}

/**
 * Set the current user (for demo/testing purposes)
 */
export function setCurrentUser(user: User | null): void {
  currentUser = user;
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
}

/**
 * Switch to a different school (for super admin demo)
 */
export function switchSchool(schoolId: string): void {
  const user = getCurrentUser();
  if (user && user.role === 'super_admin') {
    user.schoolId = schoolId;
    setCurrentUser(user);
  }
}

/**
 * Logout the current user
 */
export function logout(): void {
  setCurrentUser(null);
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Check if user has a specific role
 */
export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Validate school access and throw error if unauthorized
 */
export function validateSchoolAccess(schoolId: string): void {
  if (!canAccessSchool(schoolId)) {
    throw new Error('Unauthorized: You do not have access to this school');
  }
}

/**
 * Validate class access and throw error if unauthorized
 */
export function validateClassAccess(schoolId: string, classNumber: number): void {
  if (!canAccessClass(schoolId, classNumber)) {
    throw new Error('Unauthorized: You do not have access to this class');
  }
}
