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
import Spinner from "@/components/Spinner/Spinner";
import { useAxios } from "@/contexts/AxiosContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase"

export default function AddUnitModal() {
  const { isAddingCourse, toggleAddCourse } = useDashboard();
  const [courseImage, setCourseImage] = useState(null);
  const [imageLoad, setImageLoad] = useState(Boolean);
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  // const [courseCategory, setCourseCategory] = useState("");
  // const [school, setSchool] = useState("");
  // const [teacher, setTeacher] = useState("");

  const queryClient = useQueryClient();
  const { token } = useAuth();
  const router = useRouter();
  const { courseId } = router.query;

  // const { useMutationWrapper } = useAxios();
  // const { mutate: createCourse } = useMutationWrapper({
  //   url: apiRoutes.ADMIN_COURSE,
  //   data: {
  //     name: unitName,
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

  const createCourse = async (courseImg) => {
    try {
      console.log(courseImage)
      var response = await axios.post(
        "https://beyond-vr.herokuapp.com/synoptic/course-unit",
        { name: unitName, image: courseImg, description, courseID: courseId  },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Res Data", response.data?.data);
      toast.success(response?.data?.message);
      router.reload()
    } catch (error) {
      console.error(error); // Handle any error that occurs
      toast.error(error?.response?.data?.message);
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    // if (!unitName || !description || !courseCategory || !school || !teacher)
    //   return;
    uploadFile(courseImage);
  };

  const uploadFile = (file) => {
    console.log(file);
    setImageLoad(true);
    if (file == null) {
      return null;
    } else {
      const imageRef = ref(getStorage(), `images/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress) + "% ");
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          alert("Sorry, upload denied at the moment, Please try again later!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // setShow(true);
            toast.success(
              `Image uploaded 👍. Press Update to complete profile update!`
            );
            setImageLoad(false);
            setCourseImage(downloadURL);
            console.log(downloadURL);
            createCourse(downloadURL);
            toggleAddCourse();
          });
        }
      );
    }
  };

  const uploadPicture = () => {
    setCourseImage(e.target.files[0]);
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
            Add New Unit
          </h3>
        </DialogHeader>
        <DialogBody>
          <div className="flex justify-end">
            <div className="">
              <ImportButton onClick={() => {}} />
            </div>
          </div>
          <form className="flex flex-col gap-3 p-5" onSubmit={handlSubmit}>
            <CustomInput
              type="text"
              value={unitName}
              name={"Name of the unit"}
              onchange={(e) => setUnitName(e.target.value)}
            />
            <CustomInput
              type="text"
              value={description}
              name={"Description"}
              onchange={(e) => setDescription(e.target.value)}
            />
            {/* <CourseCategorySelect
              onSelect={(selected) => setCourseCategory(selected?.value || "")}
            /> */}
            {/* <SchoolSelect
              onSelect={(selected) => setSchool(selected?.value || "")}
            />
            <TeacherSelect
              onSelect={(selected) => setTeacher(selected?.value || "")}
            /> */}
            <div>
              <p>Select Unit Picture</p>
            </div>
            {imageLoad === true ? (
              <>
                <Spinner />
              </>
            ) : (
              <ImageInput
                label="Profile picture"
                value={courseImage}
                onChange={(e) =>
                  e.target.files &&
                  setCourseImage(e.target.files[0]) &&
                  uploadPicture(courseImage)
                }
              />
            )}
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
