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
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

export default function AddStudentModal() {
  const { isAddingStudent, toggleAddStudent } = useDashboard();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [studentClass] = useState("645c237b1be3272ea57f1945");
  const queryClient = useQueryClient();
  const {token} = useAuth()

  const { useMutationWrapper } = useAxios();

  const { mutate: addStudent } = useMutationWrapper({
    url: apiRoutes.ADMIN_STUDENT,
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      class: studentClass,
      school,
    },
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
      },
    },
  });

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !school || !email || !studentClass) return;
    addStudent();
    toggleAddStudent();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onload = async(e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData); // Array of objects containing the converted values
          var response = await axios.post(`https://beyond-vr.herokuapp.com/admin/students`, jsonData, {
            headers:{
              Authorization: token
            }
          })
          toggleAddStudent();
          if(response) toast.success(response?.data?.message)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <>
      <AddNewButton onClick={toggleAddStudent} />
      <Dialog
        open={isAddingStudent}
        handler={toggleAddStudent}
        size={"xl"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleAddStudent} />
          <h3 className="text-2xl font-light text-bw-black-200 ps-2">
            Add New Student
          </h3>
        </DialogHeader>
        <DialogBody>
          <div className="flex justify-end">
            <div className="">
                <ImportButton
                  onClick={handleButtonClick}
                />
              {/* ) : (
                <CustomButton
                  onClick={() => {
                    handleButtonClick;
                  }}
                >
                  Done
                </CustomButton>
              )} */}
            </div>
            <input
              type="file"
              accept=".xlsx"
              onChange={() => handleFileUpload()}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <form
            className="flex flex-col gap-3 p-5"
            onSubmit={(e) => handlSubmit(e)}
          >
            <CustomInput
              type="text"
              value={firstName}
              name={"First Name"}
              onchange={(e) => setFirstName(e.target.value)}
            />
            <CustomInput
              type="text"
              value={lastName}
              name={"Last Name"}
              onchange={(e) => setLastName(e.target.value)}
            />
            <CustomInput
              type="email"
              value={email}
              name={"Email"}
              onchange={(e) => setEmail(e.target.value)}
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
