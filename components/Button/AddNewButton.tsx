import { PlusIcon } from "@/assets/icons";
import Button from "./Button";

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
    <Button type="button" 
    onClick={onClick} >
      <div className="flex items-center gap-2 px-2">
        <PlusIcon color="white" />
        <span className="text-sm md:text-base">Add New</span>
      </div>
    </Button>
  );
}
