import { useAxios } from "@/contexts/AxiosContext";

const { useQueryWrapper } = useAxios();

export const useSchoolData = () =>
  useQueryWrapper(["schools"], "/admin/school");
