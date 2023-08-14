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

export default function AddUnitModal() {
  const { isAddingCourse, toggleAddCourse } = useDashboard();
  const [excerciseImage, setexcerciseImage] = useState(null);
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
  const { scenarioUnitId } = router.query;
  const [question, setQuestion] = useState("");
  const [questionNo, setQuestionNumber] = useState();
  const [videoURL, setVideoURL] = useState("");
  const [text1, setText1] = useState("");
  const [answer1, setAnswer1] = useState();
  const [text2, setText2] = useState("");
  const [answer2, setAnswer2] = useState();
  const [text3, setText3] = useState("");
  const [answer3, setAnswer3] = useState();
  console.log(scenarioUnitId);

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

  const createExcercise = async () => {
    try {
      console.log(scenarioUnitId);
      var response = await axios.post(
        "https://beyond-vr.herokuapp.com/synoptic/unit-question",
        {
          question_no: questionNo,
          question: question,
          video_url: videoURL,
          exerciseID: scenarioUnitId,
          options: [
            { text: text1, answer: answer1 === "true" ? true : false },
            { text: text2, answer: answer2 === "true" ? true : false },
            { text: text3, answer: answer3 === "true" ? true : false },
          ],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Res Data", response.data?.data);
      setQuestion("");
      setQuestionNumber("");
      setVideoURL("");
      setText1("");
      setAnswer1();
      setAnswer2();
      setAnswer3();
      setText2("");
      setText3("");
      toggleAddCourse();
      toast.success(response.data.message);
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
    // uploadFile(excerciseImage);
    createExcercise();
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

  const clearForm=()=>{
    setQuestion("");
    setQuestionNumber("");
    setVideoURL("");
    setText1("");
    setAnswer1();
    setAnswer2();
    setAnswer3();
    setText2("");
    setText3("");
  }

  return (
    <>
      <AddNewButton onClick={()=>{
        toggleAddCourse();
        clearForm()
      }} />
      <Dialog
        open={isAddingCourse}
        handler={toggleAddCourse}
        size={"xl"}
        className="p-5"
      >
        <DialogHeader className="pb-0">
          <BackButton onClick={toggleAddCourse} />
          <h3 className="text-2xl font-light text-bw-black-200 ps-2">
            Add New Question
          </h3>
        </DialogHeader>
        <DialogBody>
          {/* <div className="flex justify-end">
            <div className="">
              <ImportButton onClick={() => {}} />
            </div>
          </div> */}
          <form className="flex flex-col gap-3 p-5" onSubmit={handlSubmit}>
            <CustomInput
              type="text"
              value={questionNo}
              name={"Question Number"}
              onchange={(e) => setQuestionNumber(e.target.value)}
            />
            <CustomInput
              type="text"
              value={question}
              name={"Question"}
              onchange={(e) => setQuestion(e.target.value)}
            />
            <CustomInput
              type="text"
              value={videoURL}
              name={"Video Link"}
              onchange={(e) => setVideoURL(e.target.value)}
            />
            <CustomInput
              type="text"
              value={text1}
              name={"Option 1"}
              onchange={(e) => setText1(e.target.value)}
            />
            <CustomInput
              type="text"
              value={answer1}
              name={"Answer of Option 1 (T for True / F for false)"}
              onchange={(e) =>
                e.target.value === "T" || e.target.value === "t"
                  ? setAnswer1("true")
                  : setAnswer1("false")
              }
            />
            <CustomInput
              type="text"
              value={text2}
              name={"Option 2"}
              onchange={(e) => setText2(e.target.value)}
            />
            <CustomInput
              type="text"
              value={answer2}
              name={"Answer of Option 2 (T for True / F for false)"}
              onchange={(e) =>
                e.target.value === "T" || e.target.value === "t"
                  ? setAnswer2("true")
                  : setAnswer2("false")
              }
            />
            <CustomInput
              type="text"
              value={text3}
              name={"Option 3"}
              onchange={(e) => setText3(e.target.value)}
            />
            <CustomInput
              type="text"
              value={answer3}
              name={"Answer of Option 3 (T for True / F for false)"}
              onchange={(e) =>
                e.target.value === "T" || e.target.value === "t"
                  ? setAnswer3("true")
                  : setAnswer3("false")
              }
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

            {/* {imageLoad === true ? (
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
            )} */}
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
