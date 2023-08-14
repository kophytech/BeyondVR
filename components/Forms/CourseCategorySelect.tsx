import apiRoutes from "@/apiRoutes";
import { useAxios } from "@/contexts/AxiosContext";
import { SelectProps } from "@/interfaces";
import { CategoryType } from "@/types";
import ReactSelect from "react-select";

export default function CourseCategorySelect({ onSelect }: SelectProps) {
  const { useQueryWrapper } = useAxios();
  const { data: categories }: any = useQueryWrapper(
    ["categories"],
    apiRoutes.ADMIN_COURSE_CATEGORIES
  );

  return (
    <ReactSelect
      className="basic-single"
      classNamePrefix="select"
      isSearchable={true}
      name="Category"
      placeholder="Category"
      options={
        categories?.map((category: CategoryType) => ({
          value: category._id,
          label: category.name,
        })) || []
      }
      onChange={onSelect}
    />
  );
}
