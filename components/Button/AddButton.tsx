import { PlusIcon } from "@/assets/icons";

interface Props {
  title: string;
  onClick: () => void;
}

export default function AddButton({ title, onClick }: Props) {
  return (
    <button className="bg-black rounded-md text-white py-2 px-4" onClick={onClick}>
      <div className="flex items-center gap-2 px-2">
        <PlusIcon color="white" />
        <span className="text-base w-max">{title}</span>
      </div>
    </button>
  );
}
