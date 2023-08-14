import apiRoutes from "@/apiRoutes";
import AddNewButton from "@/components/Button/AddNewButton";
import BackButton from "@/components/Button/BackButton";
import CustomButton from "@/components/Button/Button";
import ImportButton from "@/components/Button/ImportButton";
import ImageInput from "@/components/Forms/ImageInput";
import CustomInput from "@/components/Forms/Input";
import SchoolSelect from "@/components/Forms/SchoolSelect";
import { useAxios } from "@/contexts/AxiosContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

export default function AddTeacherModal() {
  const { isAddingTeacher, toggleAddTeacher } = useDashboard();
  const { useMutationWrapper } = useAxios();

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const queryClient = useQueryClient();
  const {token} = useAuth()

  const { mutate: createTeacher } = useMutationWrapper({
    url: apiRoutes.ADMIN_TEACHER,
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      school,
    },
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(["teachers"]);
      },
    },
  });

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !school) return;
    createTeacher();
    toggleAddTeacher();
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
          var response = await axios.post(`https://beyond-vr.herokuapp.com/admin/teachers`, jsonData, {
            headers:{
              Authorization: token
            }
          })
          toggleAddTeacher();
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
      <AddNewButton onClick={toggleAddTeacher} />
      <Dialog
        open={isAddingTeacher}
        handler={toggleAddTeacher}
        size={"xl"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleAddTeacher} />
          <h3 className="text-2xl font-light text-bw-black-200 ps-2">
            Add New Teacher
          </h3>
        </DialogHeader>
        <DialogBody>
          <div className="flex justify-end">
            <div className="">
            <ImportButton
                  onClick={handleButtonClick}
                />
            </div>
            <input
              type="file"
              accept=".xlsx"
              onChange={() => handleFileUpload()}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <form className="flex flex-col gap-3 p-5" onSubmit={handlSubmit}>
            <ImageInput
              label="Profile picture"
              value={profilePicture}
              onChange={(e) =>
                e.target.files && setProfilePicture(e.target.files[0])
              }
            />
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
