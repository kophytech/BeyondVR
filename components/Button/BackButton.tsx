import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

interface Props {
  onClick?: () => void;
}

export default function BackButton({ onClick }: Props) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="bg-bw-black-200 p-2"
      onClick={onClick ? onClick : () => router.back()}
    >
      <ArrowLeftIcon className="w-5 h-5 text-white" />
    </Button>
  );
}
