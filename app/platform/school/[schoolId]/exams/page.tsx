'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getSchoolById, getStudentsBySchool, getExamsBySchool } from '@/lib/mockData';
import ThemeToggle from '@/components/ThemeToggle';

export default function ExamsPage({ params }: { params: Promise<{ schoolId: string }> }) {
  const { schoolId } = use(params);
  const school = getSchoolById(schoolId);
  const students = getStudentsBySchool(schoolId);
  const exams = getExamsBySchool(schoolId);
  const [selectedExam, setSelectedExam] = useState('');
  const [marks, setMarks] = useState<Record<string, number>>({});

  if (!school) return null;

  const handleSaveMarks = () => {
    alert('Marks saved successfully!');
  };

  const getGrade = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'A1';
    if (percentage >= 80) return 'A2';
    if (percentage >= 70) return 'B1';
    if (percentage >= 60) return 'B2';
    if (percentage >= 50) return 'C1';
    if (percentage >= 40) return 'C2';
    if (percentage >= 33) return 'D';
    return 'E';
  };

  const selectedExamDetails = exams.find(e => e.id === selectedExam);
  const eligibleStudents = selectedExamDetails 
    ? students.filter(s => s.class === selectedExamDetails.class)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href={`/platform/school/${schoolId}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams & Grades</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{school.name}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Exam Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Exam Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Duration</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Max Marks</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{exam.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Class {exam.class}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{exam.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(exam.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{exam.duration}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">{exam.maxMarks}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enter Marks Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Enter Exam Marks</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an exam</option>
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} - Class {exam.class} - {exam.subject}
                  </option>
                ))}
              </select>
            </div>

            {selectedExamDetails && (
              <div>
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 dark:text-blue-300 font-medium">Exam</p>
                      <p className="text-blue-900 dark:text-white font-semibold">{selectedExamDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 dark:text-blue-300 font-medium">Subject</p>
                      <p className="text-blue-900 dark:text-white font-semibold">{selectedExamDetails.subject}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 dark:text-blue-300 font-medium">Max Marks</p>
                      <p className="text-blue-900 dark:text-white font-semibold">{selectedExamDetails.maxMarks}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 dark:text-blue-300 font-medium">Date</p>
                      <p className="text-blue-900 dark:text-white font-semibold">
                        {new Date(selectedExamDetails.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Roll No.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Student Name</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          Marks Obtained (out of {selectedExamDetails.maxMarks})
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {eligibleStudents.map((student) => {
                        const studentMarks = marks[student.id] || 0;
                        const grade = studentMarks > 0 ? getGrade(studentMarks, selectedExamDetails.maxMarks) : '-';
                        
                        return (
                          <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{student.rollNumber}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{student.name}</td>
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                min="0"
                                max={selectedExamDetails.maxMarks}
                                value={marks[student.id] || ''}
                                onChange={(e) => setMarks({ ...marks, [student.id]: Number(e.target.value) })}
                                placeholder="Enter marks"
                                className="w-32 mx-auto block px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                              />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                grade === '-' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                                grade.startsWith('A') ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                                grade.startsWith('B') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                                grade.startsWith('C') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' :
                                'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                              }`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSaveMarks}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Save All Marks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Report Card Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Report Card</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Report Card Generation</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Select a student and term to generate their report card</p>
              <button className="mt-4 px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600">
                Generate Report Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
