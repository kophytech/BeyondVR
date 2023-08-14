import BackButton from "@/components/Button/BackButton";
import CustomButton from "@/components/Button/Button";
import ExportButton from "@/components/Button/ExportButton";
import CustomInput from "@/components/Forms/Input";
import { useDashboard } from "@/contexts/DashboardContext";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";

export default function ExportModal({ handleExp }: any) {
  const { isExporting, toggleExport } = useDashboard();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [school, setSchool] = useState("");
  const [classtoExport, setClasstoExport] = useState("");
  const [teacher, setTeacher] = useState("");

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleExport();
  };

  return (
    <>
      <ExportButton onClick={toggleExport} />
      <Dialog
        open={isExporting}
        handler={toggleExport}
        size={"sm"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleExport} />
          <h3 className="text-2xl font-light text-bw-black-200 ps-2">
            Add New School
          </h3>
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-3 p-5" onSubmit={handlSubmit}>
            {/* <CustomInput
              type="date"
              value={fromDate}
              name={"Name"}
              onchange={(e) => setFromDate(e.target.value)}
            /> */}

            <div className="px-5">
              <CustomButton onClick={handleExp} gray type="submit">
                Confirm
              </CustomButton>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
