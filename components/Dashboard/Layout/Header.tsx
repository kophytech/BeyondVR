import { useState, useEffect } from "react";
import ProfilePlaceHolder from "@/assets/ProfilePlaceholder.png";
import { SearchIcon } from "@/assets/icons";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "@/components/Button/BackButton";
import Image from "next/image";
import Link from "next/link";
import ReactSelect from "react-select";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import avatar1 from "@/public/avatar.png";



interface Props {
  searchable: boolean;
  title: string | null;
  handleOpen: () => void;
  onSearch: (searchTerm: string) => void;
  filterValues?: string[];
  filterSelectionFunction?: (filterValue: string) => void;
  response?: null
}

export default function Main({
  title = null,
  handleOpen,
  searchable,
  onSearch,
  filterValues,
  filterSelectionFunction,

}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState("")
  const [ext, setExt] = useState("")
  const { token } = useAuth();

  useEffect(() => {
    const getId = async () => {
      try {
        const currentUrl = window.location.pathname;
        const startIndex = currentUrl.indexOf('/') + 1; // Add 2 to exclude the first slash

        // Find the index of the second occurrence of a slash
        const secondSlashIndex = currentUrl.indexOf('/', startIndex);
        let extractedString;

        if (secondSlashIndex !== -1) {
          // Extract the string between the first and second slashes
          extractedString = currentUrl.substring(startIndex, secondSlashIndex);
        } else {
          // If there is no second slash, extract the string from the first slash onwards
          extractedString = currentUrl.substring(startIndex);
        }
        setExt(extractedString)
        console.log(extractedString)
        var response = await axios.get(`https://beyond-vr.herokuapp.com/${extractedString}/get`, {
          headers: {
            Authorization: token,
          },
        });

        setProfile(response.data?.data?.profile_img);
        console.log(response)
      } catch (error) {
        // toast.error(error?.response?.data?.message);
        // Handle any error that occurs
      }
    };
    if (token) getId();
  });

  return (
    <header>
      <div className="flex justify-between items-center pb-8">
        <button className="md:hidden" onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {searchable ? (
          <div className="flex gap-5 md:w-full max-w-lg bg-bw-pantone py-4 px-8 rounded-md">
            <ReactSelect
              className="basic-single w-[60%]"
              classNamePrefix="select"
              isSearchable={false}
              placeholder="Filter"
              options={
                filterValues?.map((data) => ({ value: data, label: data })) ||
                []
              }
              onChange={(value: any) => {
                if (filterSelectionFunction === undefined) {
                  return;
                }

                filterSelectionFunction(value.value);
              }}
            />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              type={"text"}
              name={"searchQuery"}
              className="w-full bg-bw-pantone outline-none"
            />
            <SearchIcon />
          </div>
        ) : (
          <div></div>
        )}

        <Link href={`/${ext}/profile`}  className="w-14 h-14 rounded-full">
          {!profile?  <Image src={avatar1} alt="Profile" />:  <Image src={profile} alt="Profile" width={100} height={70} style={{borderRadius: "50%"}}/>}
        </Link>
      </div>
      {title ? (
        <div className="flex gap-4 items-center">
          <BackButton />
          <h1 className="font-light text-bw-black-200 md:text-4xl">{title}</h1>
        </div>
      ) : null}
    </header>
  );
}
