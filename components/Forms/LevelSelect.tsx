import apiRoutes from "@/apiRoutes";
import { useAxios } from "@/contexts/AxiosContext";
import { SelectProps } from "@/interfaces";
import { CategoryType } from "@/types";
import ReactSelect from "react-select";

export default function LevelCategorySelect({ onSelect }: SelectProps) {
  const { useQueryWrapper } = useAxios();
  const { data: categories }: any = useQueryWrapper(
    ["categories"],
    apiRoutes.ADMIN_COURSE_CATEGORIES
  );

  const levels = ["intermediate", "beginner"]

  return (
    <ReactSelect
      className="basic-single"
      classNamePrefix="select"
      isSearchable={true}
      name="Tag Level"
      placeholder="Tag Level"
      options={
        levels?.map((category) => ({
          value: category,
          label: category,
        })) || []
      }
      onChange={onSelect}
    />
  );
}
