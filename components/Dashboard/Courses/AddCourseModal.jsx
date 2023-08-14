import apiRoutes from "@/apiRoutes";
import AddNewButton from "@/components/Button/AddNewButton";
import BackButton from "@/components/Button/BackButton";
import CustomButton from "@/components/Button/Button";
import ImportButton from "@/components/Button/ImportButton";
import CourseCategorySelect from "@/components/Forms/CourseCategorySelect";
import ImageInput from "@/components/Forms/ImageInput";
import CustomInput from "@/components/Forms/Input";
import SchoolSelect from "@/components/Forms/SchoolSelect";
import TeacherSelect from "@/components/Forms/TeacherSelect";
import { useAxios } from "@/contexts/AxiosContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function AddCourseModal() {
  const { isAddingCourse, toggleAddCourse } = useDashboard();
  const [courseImage, setCourseImage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [school, setSchool] = useState("");
  const [teacher, setTeacher] = useState("");
  const router = useRouter();

  const queryClient = useQueryClient();
  const { token } = useAuth();

  // const { useMutationWrapper } = useAxios();
  // const { mutate: createCourse } = useMutationWrapper({
  //   url: apiRoutes.ADMIN_COURSE,
  //   data: {
  //     name: courseName,
  //     description,
  //     category: courseCategory,
  //     school,
  //     teacher,
  //   },
  //   options: {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['courses']);
  //     },
  //   },
  // });

  const createCourse = async () => {
    try {
      var response = await axios.post(
        "https://beyond-vr.herokuapp.com/admin/course",
        { name: courseName, teacher, school, category: courseCategory, description },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Res Data", response.data?.data);
      toast.success(response.data.message);
      router.reload()
    } catch (error) {
      console.error(error); // Handle any error that occurs
      toast.error(error?.response?.data?.message);
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    // if (!courseName || !description || !courseCategory || !school || !teacher)
    //   return;
    createCourse();
    toggleAddCourse();
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    console.log("i'm working");
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData); // Array of objects containing the converted values
          var response = await axios.post(
            `https://beyond-vr.herokuapp.com/admin/courses`,
            jsonData,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          toggleAddCourse();
          if (response) toast.success(response?.data?.message);
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
      <AddNewButton onClick={toggleAddCourse} />
      <Dialog
        open={isAddingCourse}
        handler={toggleAddCourse}
        size={"xl"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleAddCourse} />
          <h3 className="text-2xl font-light text-bw-black-200 ps-2">
            Add New Course
          </h3>
        </DialogHeader>
        <DialogBody>
          <div className="flex justify-end">
            <div className="">
              <ImportButton onClick={handleButtonClick} />
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
            <CustomInput
              type="text"
              value={courseName}
              name={"Name of the course"}
              onchange={(e) => setCourseName(e.target.value)}
            />
            <CustomInput
              type="text"
              value={description}
              name={"Description"}
              onchange={(e) => setDescription(e.target.value)}
            />
            <CourseCategorySelect
              onSelect={(selected) => setCourseCategory(selected?.value || "")}
            />
            <SchoolSelect
              onSelect={(selected) => setSchool(selected?.value || "")}
            />
            <TeacherSelect
              onSelect={(selected) => setTeacher(selected?.value || "")}
            />
            <ImageInput
              label="Profile picture"
              value={courseImage}
              onChange={(e) =>
                e.target.files && setCourseImage(e.target.files[0])
              }
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
