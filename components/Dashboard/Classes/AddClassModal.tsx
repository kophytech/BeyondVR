import apiRoutes from "@/apiRoutes";
import AddNewButton from "@/components/Button/AddNewButton";
import BackButton from "@/components/Button/BackButton";
import CustomButton from "@/components/Button/Button";
import ImportButton from "@/components/Button/ImportButton";
import CustomInput from "@/components/Forms/Input";
import SchoolSelect from "@/components/Forms/SchoolSelect";
import { useAxios } from "@/contexts/AxiosContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddClassModal() {
  const { isAddingClass, toggleAddClass } = useDashboard();
  const [className, setClassName] = useState("");
  const [school, setSchool] = useState("");
  const queryClient = useQueryClient();

  const { useMutationWrapper } = useAxios();

  const { mutate: createClass } = useMutationWrapper({
    url: apiRoutes.ADMIN_CLASSES,
    data: {
      name: className,
      school,
    },
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(["classes"]);
      },
    },
  });

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!className || !school) return;
    createClass();
    toggleAddClass();
    console.log("clicked!");
  };

  return (
    <>

      <AddNewButton onClick={toggleAddClass} />
      <Dialog
        open={isAddingClass}
        handler={toggleAddClass}
        size={"xl"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleAddClass} />
          <h3 className="md:text-2xl font-light text-bw-black-200 md:ps-2">
            Add New Class
          </h3>
        </DialogHeader>

        <DialogBody>
          <div className="">
            <div className="">
              <ImportButton onClick={() => {}} />
            </div>
          </div>
          <form className="flex flex-col gap-3 p-5" onSubmit={handlSubmit}>
            <CustomInput
              type="text"
              value={className}
              name={"Name of class"}
              onchange={(e) => setClassName(e.target.value)}
            />
            <SchoolSelect
              onSelect={(selected) => setSchool(selected?.value || "")}
            />
            <div className="px-5">
              <CustomButton gray type="submit">
                Confirm
              </CustomButton>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
