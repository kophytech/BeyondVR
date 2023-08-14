import apiRoutes from "@/apiRoutes";
import { useAxios } from "@/contexts/AxiosContext";
import { SelectProps } from "@/interfaces";
import { TeacherType } from "@/types";
import ReactSelect from "react-select";

export default function TeacherSelect({ onSelect }: SelectProps) {
  const { useQueryWrapper } = useAxios();
  const { data: teachers }: any = useQueryWrapper(
    ["teachers"],
    apiRoutes.ADMIN_TEACHERS
  );

  return (
    <ReactSelect
      className="basic-single"
      classNamePrefix="select"
      isSearchable={true}
      name="Category"
      placeholder="Teacher"
      options={
        teachers?.map((teacher: TeacherType) => ({
          value: teacher.id,
          label: `${teacher.first_name} ${teacher.last_name}`,
        })) || []
      }
      onChange={onSelect}
    />
  );
}
