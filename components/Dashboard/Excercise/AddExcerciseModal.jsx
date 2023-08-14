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
import { useRouter } from "next/router";
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
import { storage } from "../../../firebase";
import LevelCategorySelect from "@/components/Forms/LevelSelect";

export default function AddUnitModal() {
  const { isAddingCourse, toggleAddCourse } = useDashboard();
  const [excerciseImage, setexcerciseImage] = useState("");
  const [imageLoad, setImageLoad] = useState(Boolean);
  const [unitName, setUnitName] = useState("");
  const [tag_level, setTagLevel] = useState("");
  const [topics, setTopics] = useState("");
  const [description, setDescription] = useState("");

  // const [courseCategory, setCourseCategory] = useState("");
  // const [school, setSchool] = useState("");
  // const [teacher, setTeacher] = useState("");

  const queryClient = useQueryClient();
  const { token } = useAuth();
  const router = useRouter();
  const { courseUnitId } = router.query;
  console.log(courseUnitId);

  // const { useMutationWrapper } = useAxios();
  // const { mutate: createExcercise } = useMutationWrapper({
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

  const createExcercise = async (downloadURL) => {
    try {
        if (downloadURL || tag_level || topics) {
          var response = await axios.post(
            "https://beyond-vr.herokuapp.com/synoptic/exercise",
            {
              name: unitName,
              image: downloadURL,
              description,
              unitID: courseUnitId,
              tag_level,
              topics,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
        } else {
          toast.error("Please add image and other details");
        }
      console.log("Res Data", response?.data);
      toast.success(response.data.message);
      router.reload()
    } catch (error) {
      console.error(error); // Handle any error that occurs
      toggleAddCourse();
      toast.error(error?.response?.data?.message);
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    // if (!unitName || !description || !courseCategory || !school || !teacher)
    //   return;
    uploadFile(excerciseImage);
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
            setexcerciseImage(downloadURL);
            console.log(downloadURL);
            createExcercise(downloadURL);
            toggleAddCourse();
          });
        }
      );
    }
  };

  const uploadPicture = () => {
    setexcerciseImage(e.target.files[0]);
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
            Add New Excercise
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
              name={"Name of the excercise"}
              onchange={(e) => setUnitName(e.target.value)}
            />
            <CustomInput
              type="text"
              value={description}
              name={"Description"}
              onchange={(e) => setDescription(e.target.value)}
            />
            {/* <CustomInput
              type="text"
              value={tag_level}
              name={"Tag Level"}
              onchange={(e) => setTagLevel(e.target.value)}
            /> */}
            <LevelCategorySelect
              onSelect={(selected) => setTagLevel(selected?.value || "")}
            />
            <CustomInput
              type="text"
              value={topics}
              name={"Topics"}
              onchange={(e) => setTopics(e.target.value)}
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
              <p>Select excercise Picture</p>
            </div>
            {imageLoad === true ? (
              <>
                <Spinner />
              </>
            ) : (
              <ImageInput
                label="Profile picture"
                value={excerciseImage}
                onChange={(e) =>
                  e.target.files &&
                  setexcerciseImage(e.target.files[0]) &&
                  uploadPicture(excerciseImage)
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
