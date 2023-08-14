import { createContext, useContext, useState } from 'react';

type DashboardContextType = ReturnType<typeof useDashboardContextFactory>;

const useDashboardContextFactory = () => {
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingSchool, setIsAddingSchool] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const toggleAddClass = () => {
    setIsAddingClass(!isAddingClass);
  };

  const toggleAddStudent = () => {
    setIsAddingStudent(!isAddingStudent);
  };

  const toggleAddTeacher = () => {
    setIsAddingTeacher(!isAddingTeacher);
  };

  const toggleAddCourse = () => {
    setIsAddingCourse(!isAddingCourse);
  };

  const toggleAddSchool = () => {
    setIsAddingSchool(!isAddingSchool);
  };

  const toggleExport = () => {
    setIsExporting(!isExporting);
  };

  return {
    isAddingClass,
    isAddingStudent,
    isAddingTeacher,
    isAddingCourse,
    isAddingSchool,
    isExporting,
    toggleAddClass,
    toggleAddStudent,
    toggleAddTeacher,
    toggleAddCourse,
    toggleAddSchool,
    toggleExport,
  };
};

const initialState: DashboardContextType = {
  isAddingClass: false,
  isAddingStudent: false,
  isAddingTeacher: false,
  isAddingCourse: false,
  isAddingSchool: false,
  isExporting: false,
  toggleAddClass: () => {},
  toggleAddStudent: () => {},
  toggleAddTeacher: () => {},
  toggleAddCourse: () => {},
  toggleAddSchool: () => {},
  toggleExport: () => {},
};

export const DashboardContext =
  createContext<DashboardContextType>(initialState);

interface Props {
  children: React.ReactNode;
}

export const DashboardProvider = ({ children }: Props) => {
  const value = useDashboardContextFactory();

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

export default DashboardContext;
