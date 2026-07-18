'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

interface ClassDivisionForm {
  divisionName: string;
  classTeacherName: string;
  numberOfStudents: string;
}

interface ClassStructureForm {
  className: string;
  numberOfDivisions: string;
  divisions: ClassDivisionForm[];
}

export default function EnhancedOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1: School Basic Details
  const [schoolDetails, setSchoolDetails] = useState({
    schoolName: '',
    location: '',
    principalName: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
  });

  // Step 2: Staff Details
  const [staffDetails, setStaffDetails] = useState({
    numberOfTeachingStaff: '',
  });

  // Step 3: Class Structure
  const [classStructure, setClassStructure] = useState<ClassStructureForm[]>([]);
  
  // Step 4: Plan Selection
  const [selectedPlan, setSelectedPlan] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');

  const totalSteps = 4;

  const plans = {
    Basic: { price: 15000, students: '200', features: ['Core modules', 'Email support', 'Basic reports'] },
    Standard: { price: 28000, students: '500', features: ['All modules', 'Priority support', 'Advanced reports'] },
    Premium: { price: 45000, students: 'Unlimited', features: ['Advanced analytics', '24/7 support', 'Custom features'] }
  };

  const addClass = () => {
    const newClass: ClassStructureForm = {
      className: '',
      numberOfDivisions: '1',
      divisions: [{ divisionName: 'A', classTeacherName: '', numberOfStudents: '' }]
    };
    setClassStructure([...classStructure, newClass]);
  };

  const updateClass = (index: number, field: string, value: string) => {
    const updated = [...classStructure];
    if (field === 'numberOfDivisions') {
      const divCount = parseInt(value) || 1;
      const currentDivisions = updated[index].divisions;
      const divisionNames = ['A', 'B', 'C', 'D', 'E', 'F'];
      
      if (divCount > currentDivisions.length) {
        for (let i = currentDivisions.length; i < divCount; i++) {
          currentDivisions.push({
            divisionName: divisionNames[i] || String.fromCharCode(65 + i),
            classTeacherName: '',
            numberOfStudents: ''
          });
        }
      } else {
        updated[index].divisions = currentDivisions.slice(0, divCount);
      }
    }
    (updated[index] as any)[field] = value;
    setClassStructure(updated);
  };

  const updateDivision = (classIndex: number, divIndex: number, field: string, value: string) => {
    const updated = [...classStructure];
    (updated[classIndex].divisions[divIndex] as any)[field] = value;
    setClassStructure(updated);
  };

  const removeClass = (index: number) => {
    setClassStructure(classStructure.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate total students
    const totalStudents = classStructure.reduce((sum, cls) => {
      return sum + cls.divisions.reduce((divSum, div) => divSum + (parseInt(div.numberOfStudents) || 0), 0);
    }, 0);

    // Generate staff credentials
    const staffCredentials = classStructure.flatMap((cls, clsIdx) => 
      cls.divisions.map((div, divIdx) => ({
        name: div.classTeacherName,
        role: 'Class Teacher',
        class: `${cls.className}-${div.divisionName}`,
        username: `${div.classTeacherName.toLowerCase().replace(/\s+/g, '.')}.${cls.className}${div.divisionName}`,
        password: `SchoolERP@${Math.random().toString(36).slice(2, 10)}`
      }))
    );

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success with credentials
    alert(`School onboarded successfully!\n\nTotal Students: ${totalStudents}\nStaff Members: ${staffCredentials.length}\n\nStaff credentials have been sent to their registered emails.`);
    
    router.push('/platform');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return schoolDetails.schoolName && schoolDetails.location && schoolDetails.principalName && 
               schoolDetails.adminName && schoolDetails.adminEmail && schoolDetails.adminPhone;
      case 2:
        return staffDetails.numberOfTeachingStaff && parseInt(staffDetails.numberOfTeachingStaff) > 0;
      case 3:
        return classStructure.length > 0 && classStructure.every(cls => 
          cls.className && cls.divisions.every(div => 
            div.classTeacherName && div.numberOfStudents && parseInt(div.numberOfStudents) > 0
          )
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/platform" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SchoolERP
              </span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>School Details</span>
            <span>Staff Info</span>
            <span>Classes</span>
            <span>Plan</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-t-xl">
            <h1 className="text-2xl font-bold text-white">
              {currentStep === 1 && 'School Details'}
              {currentStep === 2 && 'Staff Information'}
              {currentStep === 3 && 'Class Structure'}
              {currentStep === 4 && 'Select Plan'}
            </h1>
            <p className="text-blue-100 mt-2">
              {currentStep === 1 && 'Enter your school\'s basic information'}
              {currentStep === 2 && 'Tell us about your teaching staff'}
              {currentStep === 3 && 'Configure classes and divisions'}
              {currentStep === 4 && 'Choose the right plan for your school'}
            </p>
          </div>

          <div className="p-8">
            {/* Step 1: School Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolDetails.schoolName}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, schoolName: e.target.value })}
                    placeholder="e.g., Modern Public School"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolDetails.location}
                      onChange={(e) => setSchoolDetails({ ...schoolDetails, location: e.target.value })}
                      placeholder="e.g., Mumbai, Maharashtra"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Principal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolDetails.principalName}
                      onChange={(e) => setSchoolDetails({ ...schoolDetails, principalName: e.target.value })}
                      placeholder="e.g., Dr. Rajesh Kumar"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="border-t dark:border-gray-600 pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Contact</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Admin Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={schoolDetails.adminName}
                        onChange={(e) => setSchoolDetails({ ...schoolDetails, adminName: e.target.value })}
                        placeholder="e.g., Priya Sharma"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={schoolDetails.adminEmail}
                          onChange={(e) => setSchoolDetails({ ...schoolDetails, adminEmail: e.target.value })}
                          placeholder="admin@school.edu.in"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={schoolDetails.adminPhone}
                          onChange={(e) => setSchoolDetails({ ...schoolDetails, adminPhone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Staff Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Teaching Staff *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={staffDetails.numberOfTeachingStaff}
                    onChange={(e) => setStaffDetails({ numberOfTeachingStaff: e.target.value })}
                    placeholder="e.g., 25"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    This includes all teaching staff including class teachers
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What happens next?</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    In the next step, you'll configure your class structure. Each division will need a class teacher assigned. 
                    We'll generate unique login credentials for each staff member.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Class Structure */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configure Classes</h3>
                  <button
                    type="button"
                    onClick={addClass}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    + Add Class
                  </button>
                </div>

                {classStructure.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No classes added yet</p>
                    <button
                      type="button"
                      onClick={addClass}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Add Your First Class
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {classStructure.map((cls, clsIdx) => (
                      <div key={clsIdx} className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Class #{clsIdx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeClass(clsIdx)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Class Name *
                            </label>
                            <select
                              value={cls.className}
                              onChange={(e) => updateClass(clsIdx, 'className', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="">Select Class</option>
                              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(c => (
                                <option key={c} value={c}>Class {c}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Number of Divisions *
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="6"
                              value={cls.numberOfDivisions}
                              onChange={(e) => updateClass(clsIdx, 'numberOfDivisions', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Divisions */}
                        <div className="space-y-4 mt-4">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Divisions:</p>
                          {cls.divisions.map((div, divIdx) => (
                            <div key={divIdx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                              <p className="font-medium text-gray-900 dark:text-white mb-3">
                                Division {div.divisionName}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Class Teacher Name *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={div.classTeacherName}
                                    onChange={(e) => updateDivision(clsIdx, divIdx, 'classTeacherName', e.target.value)}
                                    placeholder="e.g., Mrs. Anjali Mehta"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Number of Students *
                                  </label>
                                  <input
                                    type="number"
                                    required
                                    min="1"
                                    value={div.numberOfStudents}
                                    onChange={(e) => updateDivision(clsIdx, divIdx, 'numberOfStudents', e.target.value)}
                                    placeholder="e.g., 40"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {classStructure.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-400">
                      <strong>Total:</strong> {classStructure.length} classes, {' '}
                      {classStructure.reduce((sum, cls) => sum + cls.divisions.length, 0)} divisions, {' '}
                      {classStructure.reduce((sum, cls) => 
                        sum + cls.divisions.reduce((divSum, div) => divSum + (parseInt(div.numberOfStudents) || 0), 0), 0
                      )} students
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Plan Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400">Select the plan that best fits your school's needs</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(plans).map(([planName, details]) => (
                    <label
                      key={planName}
                      className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedPlan === planName
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={planName}
                        checked={selectedPlan === planName}
                        onChange={(e) => setSelectedPlan(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{planName}</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          ₹{details.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">/year</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                          Up to {details.students} students
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
                          {details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedPlan === planName && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Note:</strong> Login credentials will be automatically generated for all class teachers and sent to the admin email.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-between rounded-b-xl">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Onboarding...
                  </span>
                ) : (
                  'Complete Onboarding'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
