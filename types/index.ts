export type SchoolType = {
  id: string;
  shortname: string;
  name: string;
  country: string;
  email: string;
  manager: string;
  address: string;
  type: 'primary' | 'middle' | 'high' | 'university';
  createdAt: string;
  updatedAt: string;
  totalClasses: number;
  totalTeachers: number;
  totalStudents: number;
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const teacher = {
  id: '645ad2e1afdb354e08ab3fde',
  school: {
    name: 'Blessing International Secondary School',
    shortname: 'BISS',
    country: 'Nigeria',
  },
  first_name: 'Teacher',
  last_name: 'One',
  email: 'teacher@test.com',
  user: '645ad2e1afdb354e08ab3fdc',
  createdAt: '2023-05-09T23:10:25.653Z',
  updatedAt: '2023-05-09T23:10:25.653Z',
  totalStudents: 0,
};

export type TeacherType = typeof teacher;

export type CourseType = {
  id: string;
  school: {
    shortname: string;
    name: string;
    address: string;
    manager: string;
  };
  category: {
    name: string;
    description: string;
  };
  teacher: {
    first_name: string;
    last_name: string;
    fullname: string;
  };
  name: string;
  description: string;
  image: string | null;
  students: string[];
  units: string[];
  createdAt: string;
  updatedAt: string;
};
