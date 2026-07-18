// Mock data for demonstration purposes
// Note: All data except items marked "Live Pilot" is illustrative for demo purposes only

import { School, Student, Applicant, AttendanceRecord, FeeStructure, FeePayment, Exam, ExamResult, PlatformStats } from './types';

export const schools: School[] = [
  {
    id: 'school-1',
    name: 'Delhi Public School, Vasant Kunj',
    location: 'New Delhi, Delhi',
    studentCount: 450,
    plan: 'Premium',
    status: 'Live Pilot',
    onboardedDate: '2024-01-15',
    mrr: 45000,
    principalName: 'Dr. Rajesh Kumar',
    adminContact: {
      name: 'Mrs. Priya Sharma',
      email: 'admin@dpsvasantkunj.edu.in',
      phone: '+91 98765 43210'
    },
    numberOfTeachingStaff: 30,
    classStructure: [
      {
        id: 'cls-10',
        className: '10',
        divisions: [
          {
            id: 'div-10a',
            divisionName: 'A',
            classTeacherId: 'staff-1',
            classTeacherName: 'Mrs. Anjali Mehta',
            numberOfStudents: 40
          },
          {
            id: 'div-10b',
            divisionName: 'B',
            classTeacherId: 'staff-2',
            classTeacherName: 'Mr. Vikram Singh',
            numberOfStudents: 38
          }
        ]
      }
    ]
  },
  {
    id: 'school-2',
    name: 'St. Xavier\'s High School',
    location: 'Mumbai, Maharashtra',
    studentCount: 320,
    plan: 'Standard',
    status: 'Active',
    onboardedDate: '2024-02-20',
    mrr: 28000,
    adminContact: {
      name: 'Mrs. Priya Sharma',
      email: 'admin@stxaviers-mumbai.edu.in',
      phone: '+91 98234 56789'
    }
  },
  {
    id: 'school-3',
    name: 'Kendriya Vidyalaya, Bangalore',
    location: 'Bangalore, Karnataka',
    studentCount: 500,
    plan: 'Standard',
    status: 'Active',
    onboardedDate: '2024-03-10',
    mrr: 32000,
    adminContact: {
      name: 'Mr. Sanjay Reddy',
      email: 'principal@kvbangalore.edu.in',
      phone: '+91 97654 32108'
    }
  },
  {
    id: 'school-4',
    name: 'Lotus Valley International School',
    location: 'Noida, Uttar Pradesh',
    studentCount: 280,
    plan: 'Premium',
    status: 'Active',
    onboardedDate: '2024-04-05',
    mrr: 38000,
    adminContact: {
      name: 'Dr. Meera Nair',
      email: 'admin@lotusvalley.edu.in',
      phone: '+91 99887 76543'
    }
  },
  {
    id: 'school-5',
    name: 'DAV Public School',
    location: 'Pune, Maharashtra',
    studentCount: 180,
    plan: 'Basic',
    status: 'Active',
    onboardedDate: '2024-05-12',
    mrr: 15000,
    adminContact: {
      name: 'Mr. Anil Deshmukh',
      email: 'principal@davpune.edu.in',
      phone: '+91 98123 45678'
    }
  },
  {
    id: 'school-6',
    name: 'Brightland School',
    location: 'Jaipur, Rajasthan',
    studentCount: 95,
    plan: 'Basic',
    status: 'Trial',
    onboardedDate: '2024-06-18',
    mrr: 0,
    adminContact: {
      name: 'Mrs. Kavita Mehta',
      email: 'admin@brightlandjaipur.edu.in',
      phone: '+91 97556 88990'
    }
  }
];

// Sample students for each school (showing a few per school)
export const students: Student[] = [
  // School 1 students
  {
    id: 'stu-1-1',
    schoolId: 'school-1',
    name: 'Aarav Sharma',
    rollNumber: '2024001',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-05-15',
    fatherName: 'Vikram Sharma',
    motherName: 'Neha Sharma',
    contactNumber: '+91 98765 11111',
    address: '123, Vasant Kunj, New Delhi - 110070',
    admissionDate: '2020-04-01',
    status: 'Active'
  },
  {
    id: 'stu-1-2',
    schoolId: 'school-1',
    name: 'Diya Patel',
    rollNumber: '2024002',
    class: '10',
    section: 'A',
    dateOfBirth: '2009-08-22',
    fatherName: 'Arjun Patel',
    motherName: 'Pooja Patel',
    contactNumber: '+91 98765 22222',
    address: '456, Vasant Vihar, New Delhi - 110057',
    admissionDate: '2020-04-01',
    status: 'Active'
  },
  // School 2 students
  {
    id: 'stu-2-1',
    schoolId: 'school-2',
    name: 'Rohan Desai',
    rollNumber: '2024101',
    class: '9',
    section: 'B',
    dateOfBirth: '2010-03-10',
    fatherName: 'Kiran Desai',
    motherName: 'Sneha Desai',
    contactNumber: '+91 98234 11111',
    address: '789, Bandra West, Mumbai - 400050',
    admissionDate: '2021-06-15',
    status: 'Active'
  },
  {
    id: 'stu-2-2',
    schoolId: 'school-2',
    name: 'Ananya Gupta',
    rollNumber: '2024102',
    class: '9',
    section: 'B',
    dateOfBirth: '2010-07-18',
    fatherName: 'Rahul Gupta',
    motherName: 'Kavita Gupta',
    contactNumber: '+91 98234 22222',
    address: '321, Andheri East, Mumbai - 400069',
    admissionDate: '2021-06-15',
    status: 'Active'
  },
  // School 3 students
  {
    id: 'stu-3-1',
    schoolId: 'school-3',
    name: 'Arjun Kumar',
    rollNumber: '2024201',
    class: '8',
    section: 'C',
    dateOfBirth: '2011-11-05',
    fatherName: 'Suresh Kumar',
    motherName: 'Lakshmi Kumar',
    contactNumber: '+91 97654 11111',
    address: '654, Koramangala, Bangalore - 560034',
    admissionDate: '2022-04-10',
    status: 'Active'
  }
];

export const applicants: Applicant[] = [
  {
    id: 'app-1-1',
    schoolId: 'school-1',
    name: 'Ishaan Verma',
    class: '6',
    dateOfBirth: '2013-02-14',
    fatherName: 'Deepak Verma',
    motherName: 'Anjali Verma',
    contactNumber: '+91 98765 33333',
    address: '111, Dwarka, New Delhi - 110075',
    applicationDate: '2024-06-25',
    status: 'Pending'
  },
  {
    id: 'app-1-2',
    schoolId: 'school-1',
    name: 'Saanvi Kapoor',
    class: '6',
    dateOfBirth: '2013-04-20',
    fatherName: 'Ravi Kapoor',
    motherName: 'Priya Kapoor',
    contactNumber: '+91 98765 44444',
    address: '222, Saket, New Delhi - 110017',
    applicationDate: '2024-06-26',
    status: 'Approved'
  },
  {
    id: 'app-2-1',
    schoolId: 'school-2',
    name: 'Vivaan Singh',
    class: '7',
    dateOfBirth: '2012-09-12',
    fatherName: 'Amit Singh',
    motherName: 'Rina Singh',
    contactNumber: '+91 98234 33333',
    address: '555, Juhu, Mumbai - 400049',
    applicationDate: '2024-06-20',
    status: 'Pending'
  }
];

export const feeStructures: FeeStructure[] = [
  {
    id: 'fee-1-10',
    schoolId: 'school-1',
    class: '10',
    tuitionFee: 45000,
    examFee: 3000,
    libraryFee: 2000,
    sportsFee: 2500,
    totalFee: 52500,
    term: 'Annual'
  },
  {
    id: 'fee-2-9',
    schoolId: 'school-2',
    class: '9',
    tuitionFee: 38000,
    examFee: 2500,
    libraryFee: 1500,
    sportsFee: 2000,
    totalFee: 44000,
    term: 'Annual'
  },
  {
    id: 'fee-3-8',
    schoolId: 'school-3',
    class: '8',
    tuitionFee: 32000,
    examFee: 2000,
    libraryFee: 1500,
    sportsFee: 1500,
    totalFee: 37000,
    term: 'Annual'
  }
];

export const feePayments: FeePayment[] = [
  {
    id: 'pay-1-1',
    schoolId: 'school-1',
    studentId: 'stu-1-1',
    amount: 52500,
    paymentDate: '2024-04-05',
    term: 'Annual 2024-25',
    status: 'Paid',
    receiptNumber: 'REC/2024/001'
  },
  {
    id: 'pay-1-2',
    schoolId: 'school-1',
    studentId: 'stu-1-2',
    amount: 52500,
    paymentDate: '2024-04-08',
    term: 'Annual 2024-25',
    status: 'Paid',
    receiptNumber: 'REC/2024/002'
  },
  {
    id: 'pay-2-1',
    schoolId: 'school-2',
    studentId: 'stu-2-1',
    amount: 44000,
    paymentDate: '2024-04-10',
    term: 'Annual 2024-25',
    status: 'Paid',
    receiptNumber: 'REC/2024/101'
  }
];

export const exams: Exam[] = [
  {
    id: 'exam-1-1',
    schoolId: 'school-1',
    name: 'Mid-Term Examination',
    class: '10',
    subject: 'Mathematics',
    date: '2024-08-15',
    maxMarks: 100,
    duration: '3 hours'
  },
  {
    id: 'exam-1-2',
    schoolId: 'school-1',
    name: 'Mid-Term Examination',
    class: '10',
    subject: 'Science',
    date: '2024-08-17',
    maxMarks: 100,
    duration: '3 hours'
  },
  {
    id: 'exam-2-1',
    schoolId: 'school-2',
    name: 'Unit Test 1',
    class: '9',
    subject: 'English',
    date: '2024-07-20',
    maxMarks: 50,
    duration: '2 hours'
  }
];

export const examResults: ExamResult[] = [
  {
    id: 'result-1-1',
    schoolId: 'school-1',
    examId: 'exam-1-1',
    studentId: 'stu-1-1',
    marksObtained: 87,
    grade: 'A1'
  },
  {
    id: 'result-1-2',
    schoolId: 'school-1',
    examId: 'exam-1-1',
    studentId: 'stu-1-2',
    marksObtained: 92,
    grade: 'A1'
  }
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-1-1',
    schoolId: 'school-1',
    studentId: 'stu-1-1',
    date: '2024-07-01',
    status: 'Present',
    class: '10',
    section: 'A'
  },
  {
    id: 'att-1-2',
    schoolId: 'school-1',
    studentId: 'stu-1-2',
    date: '2024-07-01',
    status: 'Present',
    class: '10',
    section: 'A'
  },
  {
    id: 'att-2-1',
    schoolId: 'school-2',
    studentId: 'stu-2-1',
    date: '2024-07-01',
    status: 'Present',
    class: '9',
    section: 'B'
  }
];

export const platformStats: PlatformStats = {
  totalSchools: 6,
  totalStudents: 1825,
  totalMRR: 158000,
  activeSchools: 4,
  trialSchools: 1,
  growthData: [
    { month: 'Jan 2024', schools: 1 },
    { month: 'Feb 2024', schools: 2 },
    { month: 'Mar 2024', schools: 3 },
    { month: 'Apr 2024', schools: 4 },
    { month: 'May 2024', schools: 5 },
    { month: 'Jun 2024', schools: 6 }
  ]
};

// Helper functions to get data by school
export const getSchoolById = (schoolId: string): School | undefined => {
  return schools.find(s => s.id === schoolId);
};

export const getStudentsBySchool = (schoolId: string): Student[] => {
  return students.filter(s => s.schoolId === schoolId);
};

export const getApplicantsBySchool = (schoolId: string): Applicant[] => {
  return applicants.filter(a => a.schoolId === schoolId);
};

export const getFeeStructuresBySchool = (schoolId: string): FeeStructure[] => {
  return feeStructures.filter(f => f.schoolId === schoolId);
};

export const getFeePaymentsBySchool = (schoolId: string): FeePayment[] => {
  return feePayments.filter(f => f.schoolId === schoolId);
};

export const getExamsBySchool = (schoolId: string): Exam[] => {
  return exams.filter(e => e.schoolId === schoolId);
};

export const getAttendanceBySchool = (schoolId: string): AttendanceRecord[] => {
  return attendanceRecords.filter(a => a.schoolId === schoolId);
};
