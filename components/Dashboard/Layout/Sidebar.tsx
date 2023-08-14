import BWLogo from "@/assets/Logo.svg";
import {
  ClassIcon,
  CourseIcon,
  DashboardIcon,
  ProfileIcon,
  SchoolIcon,
  StatIcon,
  StudentIcon,
  TeacherIcon,
  TicketIcon
} from "@/assets/icons";
import LogoutButton from "@/components/Button/LogoutButton";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import NavLink from "./NavLink";

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
  {
    name: "Classes",
    href: "/admin/classes",
    icon: ClassIcon,
  },
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
    icon: TicketIcon,
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
    name: "Profile",
    href: "/teacher/profile",
    icon: ProfileIcon,
  },
  {
    name: "Schools",
    href: "/teacher/school",
    icon: SchoolIcon,
  },
  {
    name: "Average score",
    href: "/teacher/averageScore",
    icon: StatIcon,
  },
  {
    name: "Students",
    href: "/teacher/students",
    icon: StudentIcon,
  },
  {
    name: "Ticket",
    href: "/teacher/tickets",
    icon: TicketIcon,
  },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="hidden md:block w-full max-w-[270px] h-screen bg-bw-silver px-5 overflow-y-scroll hide-scrollbar">
      <Image src={BWLogo} alt="Beyond Words Logo" className="mx-auto my-5" />
      <nav className="flex flex-col gap-2">
        {user?.is_admin &&
          adminNavLinks.map((link, index) => (
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
        {user?.is_student &&
          studentNavLinks.map((link, index) => (
            <NavLink
              name={link.name}
              href={link.href}
              Icon={link.icon}
              key={index}
            />
          ))}
        <LogoutButton />
      </nav>
    </div>
  );
}
