import {
  ClassIcon,
  CourseIcon,
  DashboardIcon,
  ProfileIcon,
  SchoolIcon,
  StatIcon,
  StudentIcon,
  TeacherIcon,
  TicketIcon,
} from "@/assets/icons";
import NavLink from "../Dashboard/Layout/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from '@/components/Button/LogoutButton';


interface Props {
  navbar: Boolean;
  handleOpen: () => void;
}

// navbar={navbar} handleOpen={handleOpen}
export default function Main({ navbar, handleOpen }: Props) {
  const { user } = useAuth();

  const adminNavLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: DashboardIcon,
    },
    {
      name: "Schools",
      href: "/admin/schools",
      icon: SchoolIcon,
    },
    // {
    //   name: "Classes",
    //   href: "/admin/classes",
    //   icon: ClassIcon,
    // },
    {
      name: "Students",
      href: "/admin/students",
      icon: StudentIcon,
    },
    {
      name: "Teachers",
      href: "/admin/teachers",
      icon: TeacherIcon,
    },
    {
      name: "Courses",
      href: "/admin/courses",
      icon: CourseIcon,
    },
    {
      name: "Statistics",
      href: "/admin/statistics",
      icon: StatIcon,
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: ProfileIcon,
    },
    {
      name: "Tickets",
      href: "/admin/tickets",
      icon: TicketIcon
    },
  ];

  const studentNavLinks = [
    {
      name: "Dashboard",
      href: "/student",
      icon: DashboardIcon,
    },
    {
      name: "Classes",
      href: "/student/classes",
      icon: ClassIcon,
    },
    {
      name: "Courses",
      href: "/student/courses",
      icon: CourseIcon,
    },
    {
      name: "Scores",
      href: "/student/scores",
      icon: StatIcon,
    },
    {
      name: "Profile",
      href: "/student/profile",
      icon: ProfileIcon,
    },
  ];
  const teacherNavLinks = [
    {
      name: "Dashboard",
      href: "/teacher",
      icon: DashboardIcon,
    },
    {
      name: "Classes",
      href: "/teacher/class",
      icon: ClassIcon,
    },
    {
      name: "Courses",
      href: "/teacher/course",
      icon: CourseIcon,
    },
    {
      name: 'Average score',
      href: '/teacher/averageScore',
      icon: StatIcon,
    },
    {
      name: 'Students',
      href: '/teacher/students',
      icon: StudentIcon,
    },
    {
      name: "Profile",
      href: "/teacher/profile",
      icon: ProfileIcon,
    },
    {
      name: "Ticket",
      href: "/teacher/tickets",
      icon: TicketIcon,
    },
  ];

  if (!navbar) return null;
  return (
    <div className="fixed top-0 z-50 bg-white h-screen w-[70%] p-8 ani__slideF">
      <div className="flex items-center justify-between mb-8">
        {/* <img
          className="-ml-[20px] md:-ml-0 xl:-ml-12 w-[250px] md:w-[400px] xl:w-[800px] h-[70px] md:h-[110px] xl:h-[250px] object-cover"
          src={darkMode === "light" ? logoRB : logoRB2}
          alt="logo"
        /> */}
        <button onClick={handleOpen} className=" text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <ul className="relative z-50 md:hidden grid space-y-4">
        {user?.is_admin &&
          adminNavLinks.map((link, index) => (
            <NavLink
              name={link.name}
              href={link.href}
              Icon={link.icon}
              key={index}
            />
          ))}
        {user?.is_student &&
          studentNavLinks.map((link, index) => (
            <NavLink
              name={link.name}
              href={link.href}
              Icon={link.icon}
              key={index}
            />
          ))}
        {user?.is_teacher &&
          teacherNavLinks.map((link, index) => (
            <NavLink
              name={link.name}
              href={link.href}
              Icon={link.icon}
              key={index}
            />
          ))}
          <LogoutButton/>
      </ul>
    </div>
  );
}
