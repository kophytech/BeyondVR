import { ChartUpIcon } from "@/assets/icons";
import { IconProps } from "@/interfaces/iconInterface";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  total: number;
  percentIncrease: string;
  Icon: React.FC<IconProps>;
  href: string;
}

export default function StatsCardLink({
  name,
  total,
  percentIncrease,
  Icon,
  href,
}: Props) {
  return (
    <Link
      href={href}
      style={{
        backgroundImage: "url('/CardBg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="p-5 w-full aspect-video rounded-xl text-bw-silver flex flex-col justify-between"
    >
      <div className="flex gap-3 items-center">
        <Icon color="#fafafa" />
        <p className="text-2xl capitalize">{name}</p>
      </div>
      <div className="font-normal text-5xl">{total.toLocaleString()}</div>
      <div></div>
      {/* <div className='flex justify-between items-center'>
        <p>{percentIncrease}%</p>
        <ChartUpIcon color='white' />
      </div> */}
    </Link>
  );
}
