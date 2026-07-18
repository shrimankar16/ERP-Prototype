// Core type definitions for the platform

export interface ClassDivision {
  id: string;
  divisionName: string; // A, B, C, etc.
  classTeacherId: string;
  classTeacherName: string;
  numberOfStudents: number;
}

export interface ClassStructure {
  id: string;
  className: string; // 1, 2, 3, ... 12
  divisions: ClassDivision[];
}

export interface StaffMember {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: 'Principal' | 'ClassTeacher' | 'Subject Teacher' | 'Admin';
  username: string;
  password: string; // In production, this would be hashed
  assignedClasses?: string[]; // Class-Division like "10-A", "10-B"
  contactNumber: string;
  dateOfJoining: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  studentCount: number;
  plan: 'Basic' | 'Standard' | 'Premium';
  status: 'Active' | 'Trial' | 'Live Pilot';
  onboardedDate: string;
  mrr: number;
  principalName?: string;
  adminContact: {
    name: string;
    email: string;
    phone: string;
  };
  numberOfTeachingStaff?: number;
  classStructure?: ClassStructure[];
}

export interface Student {
  id: string;
  schoolId: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  contactNumber: string;
  address: string;
  admissionDate: string;
  status: 'Active' | 'Inactive';
  attendancePercentage?: number; // Optional - calculated based on attendance records
}

export interface Applicant {
  id: string;
  schoolId: string;
  name: string;
  class: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  contactNumber: string;
  address: string;
  applicationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  class: string;
  section: string;
  lectureNumber?: number; // For lecture-wise attendance
}

export interface FeeStructure {
  id: string;
  schoolId: string;
  class: string;
  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  sportsFee: number;
  totalFee: number;
  term: string;
}

export interface FeePayment {
  id: string;
  schoolId: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  term: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  receiptNumber: string;
}

export interface Exam {
  id: string;
  schoolId: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  maxMarks: number;
  duration: string;
}

export interface ExamResult {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  grade: string;
}

export interface PlatformStats {
  totalSchools: number;
  totalStudents: number;
  totalMRR: number;
  activeSchools: number;
  trialSchools: number;
  growthData: {
    month: string;
    schools: number;
  }[];
}

export interface OnboardingFormData {
  // Step 1: School Details
  schoolName: string;
  location: string;
  principalName: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  
  // Step 2: Staff Details
  numberOfTeachingStaff: number;
  
  // Step 3: Class Structure
  classStructure: {
    className: string;
    numberOfDivisions: number;
    divisions: {
      divisionName: string;
      classTeacherName: string;
      numberOfStudents: number;
    }[];
  }[];
  
  // Step 4: Plan Selection
  plan: 'Basic' | 'Standard' | 'Premium';
}
