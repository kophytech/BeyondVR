import { IconProps } from "@/interfaces/iconInterface";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  name: string;
  href: string;
  Icon: React.FC<IconProps>;
}

export default function NavLink({ name, href, Icon }: Props) {
  const router = useRouter();
  const isActive =
    router.pathname.split("/")[2] === name.toLocaleLowerCase() ||
    router.pathname === href ||
    router.pathname.split("/")[1] === name.toLocaleLowerCase();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`${
        isActive || isHovered
          ? "bg-bw-black-400 text-bw-silver "
          : "text-bw-black-100 "
      } relative grid items-center py-2 px-3 w-full rounded-md hover:bg-bw-black-400 hover:text-bw-silver transition-all ease-linear`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <Icon color={isActive || isHovered ? "#FAFAFA" : "#45484E"} />
        <span> {name}</span>
      </div>
    </Link>
  );
}
