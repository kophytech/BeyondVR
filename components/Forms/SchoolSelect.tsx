import apiRoutes from "@/apiRoutes";
import { useAxios } from "@/contexts/AxiosContext";
import { SelectProps } from "@/interfaces";
import { SchoolType } from "@/types";
import ReactSelect from "react-select";

export default function SchoolSelect({ onSelect }: SelectProps) {
  const { useQueryWrapper } = useAxios();
  const { data: schools }: any = useQueryWrapper(
    ["schools"],
    apiRoutes.ADMIN_SCHOOL
  );

  return (
    <ReactSelect
      className="basic-single"
      classNamePrefix="select"
      isSearchable={true}
      name="School"
      placeholder="School"
      options={
        schools?.map((school: SchoolType) => ({
          value: school.id,
          label: school.name,
        })) || []
      }
      onChange={onSelect}
    />
  );
}
